import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './auth';

// Get client IP address
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || '0.0.0.0';
}

// Get user agent
export function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || 'Unknown';
}

// Admin authentication middleware
export async function requireAdminAuth(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const admin = await AuthService.getAdminFromToken(token);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Add admin info to request headers for use in API routes
    const response = NextResponse.next();
    response.headers.set('x-admin-id', admin.id.toString());
    response.headers.set('x-admin-username', admin.username);
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

// Rate limiting middleware
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  const record = rateLimitMap.get(identifier);
  
  if (!record || record.lastReset < windowStart) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// CSRF protection middleware
export function validateCSRFToken(request: NextRequest): boolean {
  const csrfToken = request.headers.get('x-csrf-token');
  const sessionToken = request.cookies.get('csrf-token')?.value;
  
  return csrfToken === sessionToken;
}

// Input sanitization
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  
  return input;
}

// Validate request body
export function validateRequestBody(body: any, requiredFields: string[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!body || typeof body !== 'object') {
    errors.push('Request body must be a valid JSON object');
    return { isValid: false, errors };
  }
  
  for (const field of requiredFields) {
    if (!(field in body) || body[field] === undefined || body[field] === null || body[field] === '') {
      errors.push(`Field '${field}' is required`);
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// API response wrapper
export function createAPIResponse(
  data?: any,
  error?: string,
  status: number = 200
): NextResponse {
  const response = {
    success: status >= 200 && status < 300,
    ...(data && { data }),
    ...(error && { error }),
    timestamp: new Date().toISOString()
  };
  
  return NextResponse.json(response, { status });
}

// Log API request
export async function logAPIRequest(
  request: NextRequest,
  adminId?: number,
  action?: string,
  resourceType?: string,
  resourceId?: string
) {
  if (adminId && action && resourceType) {
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);
    
    await AuthService.logAdminAction(
      adminId,
      action,
      resourceType,
      resourceId,
      ipAddress,
      userAgent
    );
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

// Validate phone number format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
  return phoneRegex.test(phone);
}

// Validate amount
export function isValidAmount(amount: number): boolean {
  return typeof amount === 'number' && amount >= 1 && amount <= 1000000;
}

// Generate CSRF token
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

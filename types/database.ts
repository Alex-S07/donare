export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: number;
          username: string;
          email: string;
          password_hash: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: number;
          username: string;
          email: string;
          password_hash: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: number;
          username?: string;
          email?: string;
          password_hash?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };
      money_donations: {
        Row: {
          id: number;
          name: string;
          email: string;
          phone_number: string;
          amount: number;
          payment_status: boolean;
          razorpay_payment_id: string | null;
          razorpay_order_id: string;
          razorpay_signature: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          phone_number: string;
          amount: number;
          payment_status?: boolean;
          razorpay_payment_id?: string | null;
          razorpay_order_id: string;
          razorpay_signature?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          phone_number?: string;
          amount?: number;
          payment_status?: boolean;
          razorpay_payment_id?: string | null;
          razorpay_order_id?: string;
          razorpay_signature?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_audit_logs: {
        Row: {
          id: number;
          admin_id: number;
          action: string;
          resource_type: string;
          resource_id: string | null;
          ip_address: string;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          admin_id: number;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          ip_address: string;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          admin_id?: number;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          ip_address?: string;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// TypeScript interfaces for application use
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface MoneyDonation {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  amount: number;
  payment_status: boolean;
  razorpay_payment_id: string | null;
  razorpay_order_id: string;
  razorpay_signature: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLog {
  id: number;
  admin_id: number;
  action: string;
  resource_type: string;
  resource_id: string | null;
  ip_address: string;
  user_agent: string | null;
  created_at: string;
}

// Form data interfaces
export interface DonationFormData {
  name: string;
  email: string;
  phone: string;
  amount: number;
}

export interface PaymentOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  donor_details: DonationFormData;
}

export interface ReceiptData {
  id: number;
  name: string;
  email: string;
  amount: number;
  transaction_id: string;
  date: string;
  order_id: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  refresh_token?: string;
  admin?: {
    id: number;
    username: string;
    email: string;
  };
  error?: string;
}

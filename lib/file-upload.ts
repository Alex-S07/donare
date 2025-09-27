import { supabaseAdmin } from './supabase';
import { randomBytes } from 'crypto';

// File upload configuration
const MAX_FILE_SIZE = 100 * 1024; // 100KB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'application/pdf'
];

const BUCKET_NAME = 'receiver-documents';

export interface FileUploadResult {
  success: boolean;
  filePath?: string;
  fileUrl?: string;
  error?: string;
}

export interface FileMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  storagePath: string;
  uploadedAt: string;
}

export class FileUploadService {
  // Validate file before upload
  static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size must be less than ${MAX_FILE_SIZE / 1024}KB`
      };
    }

    // Check file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Only JPEG, PNG, WebP, and PDF files are allowed'
      };
    }

    // Check file name
    if (!file.name || file.name.length > 255) {
      return {
        valid: false,
        error: 'Invalid file name'
      };
    }

    return { valid: true };
  }

  // Generate secure file path
  static generateFilePath(receiverId: string, documentType: string, originalFileName: string): string {
    const fileExtension = originalFileName.split('.').pop()?.toLowerCase() || '';
    const timestamp = Date.now();
    const randomId = randomBytes(4).toString('hex');

    return `${receiverId}/${documentType}/${timestamp}_${randomId}.${fileExtension}`;
  }

  // Upload file to Supabase Storage
  static async uploadFile(
    file: File,
    receiverId: string,
    documentType: string
  ): Promise<FileUploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error
        };
      }

      // Generate file path
      const filePath = this.generateFilePath(receiverId, documentType, file.name);

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);

      // Upload to Supabase Storage
      const { data, error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .upload(filePath, fileBuffer, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Storage upload error:', error);
        return {
          success: false,
          error: 'Failed to upload file to storage'
        };
      }

      // Get public URL (for admin access)
      const { data: urlData } = supabaseAdmin.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return {
        success: true,
        filePath: data.path,
        fileUrl: urlData.publicUrl
      };

    } catch (error) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: 'File upload failed'
      };
    }
  }

  // Upload multiple files
  static async uploadMultipleFiles(
    files: Record<string, File>,
    receiverId: string
  ): Promise<Record<string, FileUploadResult>> {
    const results: Record<string, FileUploadResult> = {};

    for (const [documentType, file] of Object.entries(files)) {
      results[documentType] = await this.uploadFile(file, receiverId, documentType);
    }

    return results;
  }

  // Delete file from storage
  static async deleteFile(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error('Storage delete error:', error);
        return {
          success: false,
          error: 'Failed to delete file from storage'
        };
      }

      return { success: true };

    } catch (error) {
      console.error('File delete error:', error);
      return {
        success: false,
        error: 'File deletion failed'
      };
    }
  }

  // Get file URL with signed URL for secure access
  static async getSignedUrl(
    filePath: string,
    expiresIn: number = 3600 // 1 hour default
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        console.error('Signed URL error:', error);
        return {
          success: false,
          error: 'Failed to generate file URL'
        };
      }

      return {
        success: true,
        url: data.signedUrl
      };

    } catch (error) {
      console.error('Signed URL generation error:', error);
      return {
        success: false,
        error: 'URL generation failed'
      };
    }
  }

  // List files for a receiver
  static async listReceiverFiles(receiverId: string): Promise<{
    success: boolean;
    files?: Array<{
      name: string;
      path: string;
      size: number;
      lastModified: string;
    }>;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .list(receiverId, {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('File list error:', error);
        return {
          success: false,
          error: 'Failed to list files'
        };
      }

      const files = data?.map(file => ({
        name: file.name,
        path: `${receiverId}/${file.name}`,
        size: file.metadata?.size || 0,
        lastModified: file.updated_at || file.created_at
      })) || [];

      return {
        success: true,
        files
      };

    } catch (error) {
      console.error('File listing error:', error);
      return {
        success: false,
        error: 'File listing failed'
      };
    }
  }

  // Clean up orphaned files (files without corresponding database records)
  static async cleanupOrphanedFiles(): Promise<{ success: boolean; deletedCount?: number; error?: string }> {
    try {
      // Get all receiver IDs from database
      const { data: receivers, error: dbError } = await supabaseAdmin
        .from('donation_receivers')
        .select('id');

      if (dbError) {
        return {
          success: false,
          error: 'Failed to fetch receiver IDs'
        };
      }

      const validReceiverIds = new Set(receivers?.map(r => r.id) || []);

      // List all folders in storage
      const { data: folders, error: listError } = await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .list('', { limit: 1000 });

      if (listError) {
        return {
          success: false,
          error: 'Failed to list storage folders'
        };
      }

      // Find orphaned folders
      const orphanedFolders = folders?.filter(folder => 
        folder.name && !validReceiverIds.has(folder.name)
      ) || [];

      let deletedCount = 0;

      // Delete orphaned folders and their contents
      for (const folder of orphanedFolders) {
        const { data: files } = await supabaseAdmin.storage
          .from(BUCKET_NAME)
          .list(folder.name);

        if (files && files.length > 0) {
          const filePaths = files.map(file => `${folder.name}/${file.name}`);
          
          const { error: deleteError } = await supabaseAdmin.storage
            .from(BUCKET_NAME)
            .remove(filePaths);

          if (!deleteError) {
            deletedCount += filePaths.length;
          }
        }
      }

      return {
        success: true,
        deletedCount
      };

    } catch (error) {
      console.error('Cleanup error:', error);
      return {
        success: false,
        error: 'Cleanup failed'
      };
    }
  }

  // Generate file metadata for database storage
  static generateFileMetadata(
    file: File,
    storagePath: string
  ): FileMetadata {
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      storagePath,
      uploadedAt: new Date().toISOString()
    };
  }
}

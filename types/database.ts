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
      sender_otps: {
        Row: {
          id: string;
          email: string;
          otp_code: string;
          created_at: string;
          expires_at: string;
          used: boolean;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          otp_code: string;
          created_at?: string;
          expires_at: string;
          used?: boolean;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          otp_code?: string;
          created_at?: string;
          expires_at?: string;
          used?: boolean;
          ip_address?: string | null;
          user_agent?: string | null;
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
      donation_senders: {
        Row: {
          id: string;
          email: string;
          provider: 'google' | 'email';
          provider_id: string | null;
          email_verified: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          last_login: string | null;
          session_expires_at: string | null;
          full_name: string | null;
          phone_number: string | null;
          first_name: string | null;
          last_name: string | null;
          profile_picture_url: string | null;
          date_of_birth: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          country: string | null;
          pincode: string | null;
          preferences: any | null;
          last_activity_at: string | null;
          total_donations_count: number;
          total_donated_amount: number;
        };
        Insert: {
          id?: string;
          email: string;
          provider: 'google' | 'email';
          provider_id?: string | null;
          email_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          session_expires_at?: string | null;
          full_name?: string | null;
          phone_number?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          profile_picture_url?: string | null;
          date_of_birth?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          pincode?: string | null;
          preferences?: any | null;
          last_activity_at?: string | null;
          total_donations_count?: number;
          total_donated_amount?: number;
        };
        Update: {
          id?: string;
          email?: string;
          provider?: 'google' | 'email';
          provider_id?: string | null;
          email_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          session_expires_at?: string | null;
          full_name?: string | null;
          phone_number?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          profile_picture_url?: string | null;
          date_of_birth?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          pincode?: string | null;
          preferences?: any | null;
          last_activity_at?: string | null;
          total_donations_count?: number;
          total_donated_amount?: number;
        };
      };
      donation_receivers: {
        Row: {
          id: string;
          receiver_type: 'ngo' | 'individual';
          status: 'pending' | 'approved' | 'rejected';
          phone_number: string;
          password_hash: string | null;
          email: string | null;
          submitted_at: string;
          approved_at: string | null;
          approved_by_admin_id: number | null;
          rejection_reason: string | null;
          form_data: any;
          documents: any | null;
          created_at: string;
          updated_at: string;
          last_login: string | null;
          session_expires_at: string | null;
        };
        Insert: {
          id?: string;
          receiver_type: 'ngo' | 'individual';
          status?: 'pending' | 'approved' | 'rejected';
          phone_number: string;
          password_hash?: string | null;
          email?: string | null;
          submitted_at?: string;
          approved_at?: string | null;
          approved_by_admin_id?: number | null;
          rejection_reason?: string | null;
          form_data: any;
          documents?: any | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          session_expires_at?: string | null;
        };
        Update: {
          id?: string;
          receiver_type?: 'ngo' | 'individual';
          status?: 'pending' | 'approved' | 'rejected';
          phone_number?: string;
          password_hash?: string | null;
          email?: string | null;
          submitted_at?: string;
          approved_at?: string | null;
          approved_by_admin_id?: number | null;
          rejection_reason?: string | null;
          form_data?: any;
          documents?: any | null;
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
          session_expires_at?: string | null;
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

// New authentication interfaces
export interface DonationSender {
  id: string;
  email: string;
  provider: 'google' | 'email';
  provider_id: string | null;
  email_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  session_expires_at: string | null;
  full_name: string | null;
  phone_number: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
  preferences: any | null;
  last_activity_at: string | null;
  total_donations_count: number;
  total_donated_amount: number;
}

export interface DonationReceiver {
  id: string;
  receiver_type: 'ngo' | 'individual';
  status: 'pending' | 'approved' | 'rejected';
  phone_number: string;
  password_hash: string | null;
  email: string | null;
  submitted_at: string;
  approved_at: string | null;
  approved_by_admin_id: number | null;
  rejection_reason: string | null;
  form_data: any;
  documents: any | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  session_expires_at: string | null;
}

// Authentication request/response interfaces
export interface SenderAuthRequest {
  email: string;
  provider: 'google' | 'email';
  provider_id?: string;
  otp?: string;
}

export interface SenderAuthResponse {
  success: boolean;
  token?: string;
  sender?: {
    id: string;
    email: string;
    provider: string;
  };
  requires_otp?: boolean;
  error?: string;
}

export interface ReceiverLoginRequest {
  phone_number: string;
  password: string;
}

export interface ReceiverLoginResponse {
  success: boolean;
  token?: string;
  receiver?: {
    id: string;
    phone_number: string;
    receiver_type: string;
    status: string;
  };
  error?: string;
}

// Form data interfaces for receiver registration
export interface NGOFormData {
  organization_name: string;
  registration_certificate_number: string;
  license_number: string;
  tax_id: string;
  fcra_number?: string;
  bank_account_details: {
    account_number: string;
    ifsc_code: string;
    bank_name: string;
  };
  contact_number: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  institution_code?: string;
  license_approval_id?: string;
  board_of_trustees: Array<{
    name: string;
    government_id: string;
    designation: string;
  }>;
  authorized_signatory: {
    name: string;
    government_id: string;
    designation: string;
  };
}

export interface IndividualFormData {
  full_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  phone_number: string;
  email?: string;
  annual_income: number;
  family_size: number;
  occupation?: string;
}

export interface ReceiverRegistrationRequest {
  receiver_type: 'ngo' | 'individual';
  phone_number: string;
  email?: string;
  form_data: NGOFormData | IndividualFormData;
  documents: {
    [key: string]: {
      file_name: string;
      file_size: number;
      file_type: string;
      storage_path: string;
    };
  };
}

export interface ReceiverRegistrationResponse {
  success: boolean;
  receiver_id?: string;
  message?: string;
  error?: string;
}

// File upload interfaces
export interface DocumentUploadRequest {
  file: File;
  document_type: string;
  receiver_id?: string;
}

export interface DocumentUploadResponse {
  success: boolean;
  file_path?: string;
  file_url?: string;
  error?: string;
}

// Admin management interfaces
export interface ReceiverApprovalRequest {
  receiver_id: string;
  action: 'approve' | 'reject';
  rejection_reason?: string;
  generated_password?: string;
}

export interface ReceiverApprovalResponse {
  success: boolean;
  message?: string;
  login_credentials?: {
    phone_number: string;
    password: string;
  };
  error?: string;
}

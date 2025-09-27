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
      volunteers: {
        Row: {
          id: string;
          full_name: string;
          age: number;
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
          phone_number: string;
          email: string;
          current_occupation: string | null;
          work_experience: string | null;
          educational_background: string | null;
          commitment_duration: '1_month' | '6_months' | '1_year' | 'flexible';
          preferred_activities: string[] | null;
          availability_schedule: any | null;
          relevant_skills: string[] | null;
          areas_of_interest: string[] | null;
          previous_volunteer_experience: string | null;
          emergency_contact_name: string;
          emergency_contact_relationship: string;
          emergency_contact_phone: string;
          motivation_statement: string;
          certifications: string[] | null;
          documents: any | null;
          status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
          commitment_start_date: string | null;
          commitment_end_date: string | null;
          renewal_count: number;
          submitted_at: string;
          reviewed_at: string | null;
          reviewed_by_admin_id: number | null;
          approval_reason: string | null;
          rejection_reason: string | null;
          total_hours_volunteered: number;
          last_activity_at: string | null;
          performance_rating: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          age: number;
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
          phone_number: string;
          email: string;
          current_occupation?: string | null;
          work_experience?: string | null;
          educational_background?: string | null;
          commitment_duration: '1_month' | '6_months' | '1_year' | 'flexible';
          preferred_activities?: string[] | null;
          availability_schedule?: any | null;
          relevant_skills?: string[] | null;
          areas_of_interest?: string[] | null;
          previous_volunteer_experience?: string | null;
          emergency_contact_name: string;
          emergency_contact_relationship: string;
          emergency_contact_phone: string;
          motivation_statement: string;
          certifications?: string[] | null;
          documents?: any | null;
          status?: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
          commitment_start_date?: string | null;
          commitment_end_date?: string | null;
          renewal_count?: number;
          submitted_at?: string;
          reviewed_at?: string | null;
          reviewed_by_admin_id?: number | null;
          approval_reason?: string | null;
          rejection_reason?: string | null;
          total_hours_volunteered?: number;
          last_activity_at?: string | null;
          performance_rating?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          age?: number;
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
          phone_number?: string;
          email?: string;
          current_occupation?: string | null;
          work_experience?: string | null;
          educational_background?: string | null;
          commitment_duration?: '1_month' | '6_months' | '1_year' | 'flexible';
          preferred_activities?: string[] | null;
          availability_schedule?: any | null;
          relevant_skills?: string[] | null;
          areas_of_interest?: string[] | null;
          previous_volunteer_experience?: string | null;
          emergency_contact_name?: string;
          emergency_contact_relationship?: string;
          emergency_contact_phone?: string;
          motivation_statement?: string;
          certifications?: string[] | null;
          documents?: any | null;
          status?: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
          commitment_start_date?: string | null;
          commitment_end_date?: string | null;
          renewal_count?: number;
          submitted_at?: string;
          reviewed_at?: string | null;
          reviewed_by_admin_id?: number | null;
          approval_reason?: string | null;
          rejection_reason?: string | null;
          total_hours_volunteered?: number;
          last_activity_at?: string | null;
          performance_rating?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteer_activities: {
        Row: {
          id: string;
          volunteer_id: string;
          activity_type: string;
          activity_description: string;
          activity_date: string;
          hours_worked: number;
          location: string | null;
          donation_category: string | null;
          beneficiaries_served: number;
          impact_description: string | null;
          reviewed_by_admin_id: number | null;
          review_notes: string | null;
          performance_rating: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          volunteer_id: string;
          activity_type: string;
          activity_description: string;
          activity_date: string;
          hours_worked: number;
          location?: string | null;
          donation_category?: string | null;
          beneficiaries_served?: number;
          impact_description?: string | null;
          reviewed_by_admin_id?: number | null;
          review_notes?: string | null;
          performance_rating?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          volunteer_id?: string;
          activity_type?: string;
          activity_description?: string;
          activity_date?: string;
          hours_worked?: number;
          location?: string | null;
          donation_category?: string | null;
          beneficiaries_served?: number;
          impact_description?: string | null;
          reviewed_by_admin_id?: number | null;
          review_notes?: string | null;
          performance_rating?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      volunteer_achievements: {
        Row: {
          id: string;
          volunteer_id: string;
          achievement_type: string;
          achievement_title: string;
          achievement_description: string | null;
          criteria_met: any | null;
          awarded_at: string;
          awarded_by_admin_id: number | null;
          badge_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          volunteer_id: string;
          achievement_type: string;
          achievement_title: string;
          achievement_description?: string | null;
          criteria_met?: any | null;
          awarded_at?: string;
          awarded_by_admin_id?: number | null;
          badge_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          volunteer_id?: string;
          achievement_type?: string;
          achievement_title?: string;
          achievement_description?: string | null;
          criteria_met?: any | null;
          awarded_at?: string;
          awarded_by_admin_id?: number | null;
          badge_url?: string | null;
          created_at?: string;
        };
      };
      volunteer_testimonials: {
        Row: {
          id: string;
          volunteer_id: string;
          testimonial_text: string;
          rating: number;
          is_approved: boolean;
          approved_by_admin_id: number | null;
          approved_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          volunteer_id: string;
          testimonial_text: string;
          rating: number;
          is_approved?: boolean;
          approved_by_admin_id?: number | null;
          approved_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          volunteer_id?: string;
          testimonial_text?: string;
          rating?: number;
          is_approved?: boolean;
          approved_by_admin_id?: number | null;
          approved_at?: string | null;
          created_at?: string;
          updated_at?: string;
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

// ===== VOLUNTEER INTERFACES =====

export interface Volunteer {
  id: string;
  full_name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  phone_number: string;
  email: string;
  current_occupation: string | null;
  work_experience: string | null;
  educational_background: string | null;
  commitment_duration: '1_month' | '6_months' | '1_year' | 'flexible';
  preferred_activities: string[] | null;
  availability_schedule: any | null;
  relevant_skills: string[] | null;
  areas_of_interest: string[] | null;
  previous_volunteer_experience: string | null;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  motivation_statement: string;
  certifications: string[] | null;
  documents: any | null;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
  commitment_start_date: string | null;
  commitment_end_date: string | null;
  renewal_count: number;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by_admin_id: number | null;
  approval_reason: string | null;
  rejection_reason: string | null;
  total_hours_volunteered: number;
  last_activity_at: string | null;
  performance_rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface VolunteerActivity {
  id: string;
  volunteer_id: string;
  activity_type: string;
  activity_description: string;
  activity_date: string;
  hours_worked: number;
  location: string | null;
  donation_category: string | null;
  beneficiaries_served: number;
  impact_description: string | null;
  reviewed_by_admin_id: number | null;
  review_notes: string | null;
  performance_rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface VolunteerAchievement {
  id: string;
  volunteer_id: string;
  achievement_type: string;
  achievement_title: string;
  achievement_description: string | null;
  criteria_met: any | null;
  awarded_at: string;
  awarded_by_admin_id: number | null;
  badge_url: string | null;
  created_at: string;
}

export interface VolunteerTestimonial {
  id: string;
  volunteer_id: string;
  testimonial_text: string;
  rating: number;
  is_approved: boolean;
  approved_by_admin_id: number | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

// Volunteer application form data
export interface VolunteerApplicationData {
  // Personal Information
  full_name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  phone_number: string;
  email: string;
  
  // Professional Details
  current_occupation?: string;
  work_experience?: string;
  educational_background?: string;
  
  // Volunteer Preferences
  commitment_duration: '1_month' | '6_months' | '1_year' | 'flexible';
  preferred_activities: string[];
  availability_schedule: {
    [key: string]: {
      available: boolean;
      start_time?: string;
      end_time?: string;
    };
  };
  
  // Skills & Interests
  relevant_skills: string[];
  areas_of_interest: string[];
  previous_volunteer_experience?: string;
  
  // Emergency Contact
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  
  // Background Information
  motivation_statement: string;
  certifications: string[];
  
  // Supporting Documents
  documents: {
    [key: string]: {
      file_name: string;
      file_size: number;
      file_type: string;
      storage_path: string;
    };
  };
}

// Volunteer application request/response interfaces
export interface VolunteerApplicationRequest {
  application_data: VolunteerApplicationData;
}

export interface VolunteerApplicationResponse {
  success: boolean;
  volunteer_id?: string;
  message?: string;
  error?: string;
}

// Volunteer management interfaces
export interface VolunteerApprovalRequest {
  volunteer_id: string;
  action: 'approve' | 'reject';
  approval_reason?: string;
  rejection_reason?: string;
  commitment_start_date?: string;
  commitment_end_date?: string;
}

export interface VolunteerApprovalResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface VolunteerStatusUpdateRequest {
  volunteer_id: string;
  status: 'active' | 'inactive';
  reason?: string;
}

export interface VolunteerStatusUpdateResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Volunteer activity interfaces
export interface VolunteerActivityRequest {
  volunteer_id: string;
  activity_type: string;
  activity_description: string;
  activity_date: string;
  hours_worked: number;
  location?: string;
  donation_category?: string;
  beneficiaries_served?: number;
  impact_description?: string;
}

export interface VolunteerActivityResponse {
  success: boolean;
  activity_id?: string;
  message?: string;
  error?: string;
}

// Volunteer dashboard data
export interface VolunteerDashboardData {
  volunteer: Volunteer;
  recent_activities: VolunteerActivity[];
  achievements: VolunteerAchievement[];
  total_hours: number;
  commitment_progress: {
    start_date: string;
    end_date: string;
    days_remaining: number;
    percentage_complete: number;
  };
  upcoming_opportunities: any[]; // Will be defined based on available volunteer opportunities
  testimonials: VolunteerTestimonial[];
}

// Volunteer statistics for admin
export interface VolunteerStatistics {
  total_volunteers: number;
  active_volunteers: number;
  pending_applications: number;
  total_hours_volunteered: number;
  average_rating: number;
  volunteers_by_status: {
    pending: number;
    approved: number;
    active: number;
    inactive: number;
    rejected: number;
  };
  volunteers_by_commitment: {
    '1_month': number;
    '6_months': number;
    '1_year': number;
    flexible: number;
  };
  top_activities: Array<{
    activity_type: string;
    count: number;
    total_hours: number;
  }>;
}

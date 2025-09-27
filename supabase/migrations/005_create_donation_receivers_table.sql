-- Create donation_receivers table for users who want to receive donations
CREATE TABLE IF NOT EXISTS donation_receivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receiver_type VARCHAR(20) NOT NULL CHECK (receiver_type IN ('ngo', 'individual')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- Set after admin approval
    email VARCHAR(255), -- Optional, for notifications
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by_admin_id INTEGER REFERENCES admin_users(id),
    rejection_reason TEXT,
    form_data JSONB NOT NULL, -- Stores all submitted form fields
    documents JSONB, -- Stores file upload metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    session_expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donation_receivers_receiver_type ON donation_receivers(receiver_type);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_status ON donation_receivers(status);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_phone_number ON donation_receivers(phone_number);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_submitted_at ON donation_receivers(submitted_at);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_approved_at ON donation_receivers(approved_at);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_approved_by_admin_id ON donation_receivers(approved_by_admin_id);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_form_data ON donation_receivers USING GIN(form_data);
CREATE INDEX IF NOT EXISTS idx_donation_receivers_documents ON donation_receivers USING GIN(documents);

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_donation_receivers_updated_at 
    BEFORE UPDATE ON donation_receivers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add phone number validation constraint
ALTER TABLE donation_receivers 
ADD CONSTRAINT valid_receiver_phone CHECK (phone_number ~* '^[0-9+\-\s()]{10,15}$');

-- Add email validation constraint (optional field)
ALTER TABLE donation_receivers 
ADD CONSTRAINT valid_receiver_email CHECK (
    email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add RLS (Row Level Security) policies
ALTER TABLE donation_receivers ENABLE ROW LEVEL SECURITY;

-- Policy: Receivers can read their own record (after approval)
CREATE POLICY "Receivers can read own record" ON donation_receivers
    FOR SELECT USING (
        auth.uid()::text = id::text
    );

-- Policy: Receivers can update their own record (limited fields)
CREATE POLICY "Receivers can update own record" ON donation_receivers
    FOR UPDATE USING (
        auth.uid()::text = id::text
    );

-- Policy: Allow public insert for new applications
CREATE POLICY "Allow public insert for receivers" ON donation_receivers
    FOR INSERT WITH CHECK (true);

-- Policy: Admin users can read all receiver records
CREATE POLICY "Admin can read all receivers" ON donation_receivers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.email() 
            AND admin_users.is_active = true
        )
    );

-- Policy: Admin users can update receiver records
CREATE POLICY "Admin can update receivers" ON donation_receivers
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.email() 
            AND admin_users.is_active = true
        )
    );

-- Add comments for documentation
COMMENT ON TABLE donation_receivers IS 'Table storing donation receiver applications and accounts';
COMMENT ON COLUMN donation_receivers.id IS 'Unique UUID identifier for the receiver';
COMMENT ON COLUMN donation_receivers.receiver_type IS 'Type of receiver: ngo or individual';
COMMENT ON COLUMN donation_receivers.status IS 'Application status: pending, approved, or rejected';
COMMENT ON COLUMN donation_receivers.phone_number IS 'Phone number for login (unique)';
COMMENT ON COLUMN donation_receivers.password_hash IS 'Bcrypt hashed password (set after approval)';
COMMENT ON COLUMN donation_receivers.email IS 'Optional email for notifications';
COMMENT ON COLUMN donation_receivers.form_data IS 'JSON object containing all form submission data';
COMMENT ON COLUMN donation_receivers.documents IS 'JSON object containing uploaded document metadata';
COMMENT ON COLUMN donation_receivers.approved_by_admin_id IS 'Admin who approved the application';
COMMENT ON COLUMN donation_receivers.rejection_reason IS 'Reason for rejection (if applicable)';

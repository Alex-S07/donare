-- Create donation_senders table for users who want to donate items
CREATE TABLE IF NOT EXISTS donation_senders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    provider VARCHAR(20) NOT NULL CHECK (provider IN ('google', 'email')),
    provider_id VARCHAR(255), -- Google user ID or null for email auth
    email_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    session_expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donation_senders_email ON donation_senders(email);
CREATE INDEX IF NOT EXISTS idx_donation_senders_provider ON donation_senders(provider);
CREATE INDEX IF NOT EXISTS idx_donation_senders_provider_id ON donation_senders(provider_id);
CREATE INDEX IF NOT EXISTS idx_donation_senders_is_active ON donation_senders(is_active);
CREATE INDEX IF NOT EXISTS idx_donation_senders_created_at ON donation_senders(created_at);
CREATE INDEX IF NOT EXISTS idx_donation_senders_session_expires_at ON donation_senders(session_expires_at);

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_donation_senders_updated_at 
    BEFORE UPDATE ON donation_senders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add email validation constraint
ALTER TABLE donation_senders 
ADD CONSTRAINT valid_sender_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add RLS (Row Level Security) policies
ALTER TABLE donation_senders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own record
CREATE POLICY "Senders can read own record" ON donation_senders
    FOR SELECT USING (auth.uid()::text = id::text OR auth.email() = email);

-- Policy: Users can update their own record
CREATE POLICY "Senders can update own record" ON donation_senders
    FOR UPDATE USING (auth.uid()::text = id::text OR auth.email() = email);

-- Policy: Allow public insert for new registrations
CREATE POLICY "Allow public insert for senders" ON donation_senders
    FOR INSERT WITH CHECK (true);

-- Policy: Admin users can read all sender records
CREATE POLICY "Admin can read all senders" ON donation_senders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.email() 
            AND admin_users.is_active = true
        )
    );

-- Add comments for documentation
COMMENT ON TABLE donation_senders IS 'Table storing donation sender accounts (users who donate items)';
COMMENT ON COLUMN donation_senders.id IS 'Unique UUID identifier for the sender';
COMMENT ON COLUMN donation_senders.email IS 'Email address of the sender (unique)';
COMMENT ON COLUMN donation_senders.provider IS 'Authentication provider: google or email';
COMMENT ON COLUMN donation_senders.provider_id IS 'Provider-specific user ID (Google ID for OAuth)';
COMMENT ON COLUMN donation_senders.email_verified IS 'Whether email has been verified via OTP';
COMMENT ON COLUMN donation_senders.is_active IS 'Flag to enable/disable sender account';
COMMENT ON COLUMN donation_senders.last_login IS 'Timestamp of last successful login';
COMMENT ON COLUMN donation_senders.session_expires_at IS 'When the current session expires (15 minutes from login)';

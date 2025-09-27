-- Create OTP storage table for email authentication
CREATE TABLE IF NOT EXISTS sender_otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    ip_address INET,
    user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sender_otps_email ON sender_otps(email);
CREATE INDEX IF NOT EXISTS idx_sender_otps_otp_code ON sender_otps(otp_code);
CREATE INDEX IF NOT EXISTS idx_sender_otps_expires_at ON sender_otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_sender_otps_used ON sender_otps(used);

-- Create function to clean up expired OTPs
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
    DELETE FROM sender_otps 
    WHERE expires_at < CURRENT_TIMESTAMP 
    OR (used = TRUE AND created_at < CURRENT_TIMESTAMP - INTERVAL '1 hour');
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE sender_otps ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP table
CREATE POLICY "Users can only access their own OTPs" ON sender_otps
    FOR ALL USING (TRUE); -- Allow server-side access for now

-- Create trigger to automatically clean up old OTPs every hour
-- (Note: In production, you might want to use a cron job instead)
CREATE OR REPLACE FUNCTION auto_cleanup_otps()
RETURNS trigger AS $$
BEGIN
    -- Clean up expired OTPs on each insert
    PERFORM cleanup_expired_otps();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_cleanup_otps
    AFTER INSERT ON sender_otps
    FOR EACH STATEMENT
    EXECUTE FUNCTION auto_cleanup_otps();

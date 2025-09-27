-- Fix donation_senders schema alignment and add missing fields
-- This migration ensures the database schema matches the TypeScript types

-- First, check if the table exists and has the basic structure
DO $$
BEGIN
    -- Check if donation_senders table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'donation_senders') THEN
        RAISE EXCEPTION 'donation_senders table does not exist. Please run the initial migration first.';
    END IF;
END $$;

-- Add missing columns that might not exist
ALTER TABLE donation_senders 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(15),
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS state VARCHAR(100),
ADD COLUMN IF NOT EXISTS country VARCHAR(100),
ADD COLUMN IF NOT EXISTS pincode VARCHAR(10),
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS total_donations_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_donated_amount DECIMAL(10,2) DEFAULT 0.00;

-- Fix the last_login vs last_login_at mismatch
-- Add last_login_at column if it doesn't exist
ALTER TABLE donation_senders 
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;

-- Copy data from last_login to last_login_at if last_login_at is null
UPDATE donation_senders 
SET last_login_at = last_login 
WHERE last_login_at IS NULL AND last_login IS NOT NULL;

-- Add login_attempts column if it doesn't exist (used in admin panel)
ALTER TABLE donation_senders 
ADD COLUMN IF NOT EXISTS login_attempts INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donation_senders_full_name ON donation_senders(full_name);
CREATE INDEX IF NOT EXISTS idx_donation_senders_phone_number ON donation_senders(phone_number);
CREATE INDEX IF NOT EXISTS idx_donation_senders_city ON donation_senders(city);
CREATE INDEX IF NOT EXISTS idx_donation_senders_state ON donation_senders(state);
CREATE INDEX IF NOT EXISTS idx_donation_senders_last_activity ON donation_senders(last_activity_at);
CREATE INDEX IF NOT EXISTS idx_donation_senders_last_login_at ON donation_senders(last_login_at);
CREATE INDEX IF NOT EXISTS idx_donation_senders_login_attempts ON donation_senders(login_attempts);

-- Add constraints
ALTER TABLE donation_senders 
ADD CONSTRAINT chk_phone_number_format 
CHECK (phone_number IS NULL OR phone_number ~ '^[0-9+\-\s()]{10,15}$');

-- Add constraint for login_attempts
ALTER TABLE donation_senders 
ADD CONSTRAINT chk_login_attempts_non_negative 
CHECK (login_attempts >= 0);

-- Add constraint for total_donations_count
ALTER TABLE donation_senders 
ADD CONSTRAINT chk_total_donations_count_non_negative 
CHECK (total_donations_count >= 0);

-- Add constraint for total_donated_amount
ALTER TABLE donation_senders 
ADD CONSTRAINT chk_total_donated_amount_non_negative 
CHECK (total_donated_amount >= 0);

-- Update existing records to populate full_name from email if not set
UPDATE donation_senders 
SET full_name = SPLIT_PART(email, '@', 1)
WHERE full_name IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN donation_senders.full_name IS 'Complete name of the sender';
COMMENT ON COLUMN donation_senders.phone_number IS 'Mobile phone number of the sender';
COMMENT ON COLUMN donation_senders.first_name IS 'First name of the sender';
COMMENT ON COLUMN donation_senders.last_name IS 'Last name of the sender';
COMMENT ON COLUMN donation_senders.profile_picture_url IS 'URL to the sender profile picture';
COMMENT ON COLUMN donation_senders.date_of_birth IS 'Date of birth of the sender';
COMMENT ON COLUMN donation_senders.address IS 'Full address of the sender';
COMMENT ON COLUMN donation_senders.city IS 'City of the sender';
COMMENT ON COLUMN donation_senders.state IS 'State of the sender';
COMMENT ON COLUMN donation_senders.country IS 'Country of the sender';
COMMENT ON COLUMN donation_senders.pincode IS 'Postal code of the sender';
COMMENT ON COLUMN donation_senders.preferences IS 'User preferences and settings';
COMMENT ON COLUMN donation_senders.last_activity_at IS 'Last activity timestamp';
COMMENT ON COLUMN donation_senders.total_donations_count IS 'Total number of donations made';
COMMENT ON COLUMN donation_senders.total_donated_amount IS 'Total amount donated by the sender';
COMMENT ON COLUMN donation_senders.last_login_at IS 'Timestamp of last successful login (alias for last_login)';
COMMENT ON COLUMN donation_senders.login_attempts IS 'Number of failed login attempts';

-- Create a view for backward compatibility that includes both last_login and last_login_at
CREATE OR REPLACE VIEW donation_senders_with_login AS
SELECT 
    *,
    last_login_at as last_login_alias
FROM donation_senders;

-- Add RLS policies for new columns if they don't exist
-- Policy: Users can read their own record (updated)
DROP POLICY IF EXISTS "Senders can read own record" ON donation_senders;
CREATE POLICY "Senders can read own record" ON donation_senders
    FOR SELECT USING (auth.uid()::text = id::text OR auth.email() = email);

-- Policy: Users can update their own record (updated)
DROP POLICY IF EXISTS "Senders can update own record" ON donation_senders;
CREATE POLICY "Senders can update own record" ON donation_senders
    FOR UPDATE USING (auth.uid()::text = id::text OR auth.email() = email);

-- Policy: Admin users can read all sender records (updated)
DROP POLICY IF EXISTS "Admin can read all senders" ON donation_senders;
CREATE POLICY "Admin can read all senders" ON donation_senders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.email() 
            AND admin_users.is_active = true
        )
    );

-- Policy: Admin users can update all sender records
DROP POLICY IF EXISTS "Admin can update all senders" ON donation_senders;
CREATE POLICY "Admin can update all senders" ON donation_senders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.email() 
            AND admin_users.is_active = true
        )
    );

-- Verify the schema is correct
DO $$
DECLARE
    column_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO column_count
    FROM information_schema.columns 
    WHERE table_name = 'donation_senders' 
    AND table_schema = 'public';
    
    RAISE NOTICE 'donation_senders table now has % columns', column_count;
    
    -- Check for key columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'donation_senders' AND column_name = 'last_login_at') THEN
        RAISE WARNING 'last_login_at column is missing';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'donation_senders' AND column_name = 'full_name') THEN
        RAISE WARNING 'full_name column is missing';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'donation_senders' AND column_name = 'phone_number') THEN
        RAISE WARNING 'phone_number column is missing';
    END IF;
    
    RAISE NOTICE 'Schema verification completed successfully';
END $$;

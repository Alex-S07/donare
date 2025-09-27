-- Update donation_senders table to include additional profile fields
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donation_senders_full_name ON donation_senders(full_name);
CREATE INDEX IF NOT EXISTS idx_donation_senders_phone_number ON donation_senders(phone_number);
CREATE INDEX IF NOT EXISTS idx_donation_senders_city ON donation_senders(city);
CREATE INDEX IF NOT EXISTS idx_donation_senders_state ON donation_senders(state);
CREATE INDEX IF NOT EXISTS idx_donation_senders_last_activity ON donation_senders(last_activity_at);

-- Update existing records to populate full_name from email (temporary)
UPDATE donation_senders 
SET full_name = SPLIT_PART(email, '@', 1)
WHERE full_name IS NULL;

-- Add constraints
ALTER TABLE donation_senders 
ADD CONSTRAINT chk_phone_number_format 
CHECK (phone_number IS NULL OR phone_number ~ '^[0-9+\-\s()]{10,15}$');

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

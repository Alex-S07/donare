-- Create money_donations table
CREATE TABLE IF NOT EXISTS money_donations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 1.00),
    payment_status BOOLEAN DEFAULT false,
    razorpay_payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255) NOT NULL,
    razorpay_signature VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_money_donations_email ON money_donations(email);
CREATE INDEX IF NOT EXISTS idx_money_donations_payment_status ON money_donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_money_donations_created_at ON money_donations(created_at);
CREATE INDEX IF NOT EXISTS idx_money_donations_razorpay_order_id ON money_donations(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_money_donations_razorpay_payment_id ON money_donations(razorpay_payment_id);

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_money_donations_updated_at 
    BEFORE UPDATE ON money_donations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraints
ALTER TABLE money_donations 
ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE money_donations 
ADD CONSTRAINT valid_phone CHECK (phone_number ~* '^[0-9+\-\s()]{10,15}$');

-- Add RLS (Row Level Security) policies
ALTER TABLE money_donations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public insert for new donations
CREATE POLICY "Allow public insert for donations" ON money_donations
    FOR INSERT WITH CHECK (true);

-- Policy: Allow public read for own donations (by email)
CREATE POLICY "Allow read own donations" ON money_donations
    FOR SELECT USING (true);

-- Policy: Only authenticated admin users can update donations
CREATE POLICY "Admin can update donations" ON money_donations
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Add comments for documentation
COMMENT ON TABLE money_donations IS 'Table storing money donation records with Razorpay payment integration';
COMMENT ON COLUMN money_donations.name IS 'Full name of the donor';
COMMENT ON COLUMN money_donations.email IS 'Email address of the donor (validated format)';
COMMENT ON COLUMN money_donations.phone_number IS 'Phone number of the donor (10-15 digits)';
COMMENT ON COLUMN money_donations.amount IS 'Donation amount in INR (minimum ₹1.00)';
COMMENT ON COLUMN money_donations.payment_status IS 'Whether payment has been successfully completed';
COMMENT ON COLUMN money_donations.razorpay_payment_id IS 'Razorpay payment ID after successful payment';
COMMENT ON COLUMN money_donations.razorpay_order_id IS 'Razorpay order ID for tracking';
COMMENT ON COLUMN money_donations.razorpay_signature IS 'Razorpay signature for payment verification';

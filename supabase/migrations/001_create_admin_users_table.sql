-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- Create trigger to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123 - should be changed in production)
-- Password hash for 'admin123' with bcrypt rounds=12
INSERT INTO admin_users (username, email, password_hash) 
VALUES (
    'admin', 
    'admin@donare.org', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXIG.JjixyvW'
) ON CONFLICT (username) DO NOTHING;

-- Add RLS (Row Level Security) policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read admin_users
CREATE POLICY "Admin users can read admin_users" ON admin_users
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Only authenticated admin users can update their own record
CREATE POLICY "Admin users can update own record" ON admin_users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Add comments for documentation
COMMENT ON TABLE admin_users IS 'Table storing admin user accounts for the Donare platform';
COMMENT ON COLUMN admin_users.username IS 'Unique username for admin login';
COMMENT ON COLUMN admin_users.email IS 'Unique email address for admin account';
COMMENT ON COLUMN admin_users.password_hash IS 'Bcrypt hashed password (minimum 12 rounds)';
COMMENT ON COLUMN admin_users.is_active IS 'Flag to enable/disable admin account';
COMMENT ON COLUMN admin_users.last_login IS 'Timestamp of last successful login';

-- Create admin_audit_logs table for tracking admin activities
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(50),
    ip_address INET NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action ON admin_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_resource_type ON admin_audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_ip_address ON admin_audit_logs(ip_address);

-- Add RLS (Row Level Security) policies
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read audit logs
CREATE POLICY "Admin can read audit logs" ON admin_audit_logs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Only authenticated admin users can insert audit logs
CREATE POLICY "Admin can insert audit logs" ON admin_audit_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create function to automatically log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
    p_admin_id INTEGER,
    p_action VARCHAR(100),
    p_resource_type VARCHAR(50),
    p_resource_id VARCHAR(50) DEFAULT NULL,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO admin_audit_logs (
        admin_id, 
        action, 
        resource_type, 
        resource_id, 
        ip_address, 
        user_agent
    ) VALUES (
        p_admin_id, 
        p_action, 
        p_resource_type, 
        p_resource_id, 
        COALESCE(p_ip_address, '0.0.0.0'::inet), 
        p_user_agent
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comments for documentation
COMMENT ON TABLE admin_audit_logs IS 'Audit trail for all admin actions in the Donare platform';
COMMENT ON COLUMN admin_audit_logs.admin_id IS 'Reference to the admin user who performed the action';
COMMENT ON COLUMN admin_audit_logs.action IS 'Description of the action performed (e.g., LOGIN, VIEW_DONATIONS, UPDATE_USER)';
COMMENT ON COLUMN admin_audit_logs.resource_type IS 'Type of resource affected (e.g., USER, DONATION, ADMIN)';
COMMENT ON COLUMN admin_audit_logs.resource_id IS 'ID of the specific resource affected (optional)';
COMMENT ON COLUMN admin_audit_logs.ip_address IS 'IP address from which the action was performed';
COMMENT ON COLUMN admin_audit_logs.user_agent IS 'Browser user agent string';

-- Create view for admin dashboard statistics
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM money_donations WHERE payment_status = true) as total_successful_donations,
    (SELECT COALESCE(SUM(amount), 0) FROM money_donations WHERE payment_status = true) as total_amount_raised,
    (SELECT COUNT(*) FROM money_donations WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as donations_last_30_days,
    (SELECT COUNT(*) FROM money_donations WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as donations_last_7_days,
    (SELECT COUNT(*) FROM admin_users WHERE is_active = true) as active_admin_users,
    (SELECT COUNT(*) FROM admin_audit_logs WHERE created_at >= CURRENT_DATE) as admin_actions_today;

-- Grant access to the view
GRANT SELECT ON admin_dashboard_stats TO authenticated;

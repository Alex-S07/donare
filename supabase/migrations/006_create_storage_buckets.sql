-- Create storage bucket for receiver documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'receiver-documents',
    'receiver-documents',
    false,
    102400, -- 100KB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policies for receiver documents
CREATE POLICY "Authenticated users can upload receiver documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'receiver-documents' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view their own receiver documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'receiver-documents' 
        AND (
            auth.uid()::text = (storage.foldername(name))[1]
            OR EXISTS (
                SELECT 1 FROM admin_users 
                WHERE admin_users.email = auth.email() 
                AND admin_users.is_active = true
            )
        )
    );

CREATE POLICY "Users can update their own receiver documents" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'receiver-documents' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own receiver documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'receiver-documents' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS VOID AS $$
BEGIN
    -- Clear expired sender sessions
    UPDATE donation_senders 
    SET session_expires_at = NULL 
    WHERE session_expires_at < CURRENT_TIMESTAMP;
    
    -- Clear expired receiver sessions
    UPDATE donation_receivers 
    SET session_expires_at = NULL 
    WHERE session_expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to generate secure random password
CREATE OR REPLACE FUNCTION generate_random_password(length INTEGER DEFAULT 12)
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..length LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to validate Indian states
CREATE OR REPLACE FUNCTION is_valid_indian_state(state_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    valid_states TEXT[] := ARRAY[
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Delhi'
    ];
BEGIN
    RETURN state_name = ANY(valid_states);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create basic dashboard stats view (will be updated in later migrations)
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM money_donations WHERE payment_status = true) as total_successful_donations,
    (SELECT COALESCE(SUM(amount), 0) FROM money_donations WHERE payment_status = true) as total_amount_raised,
    (SELECT COUNT(*) FROM money_donations WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as donations_last_30_days,
    (SELECT COUNT(*) FROM money_donations WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as donations_last_7_days,
    (SELECT COUNT(*) FROM admin_users WHERE is_active = true) as active_admin_users,
    (SELECT COUNT(*) FROM admin_audit_logs WHERE created_at >= CURRENT_DATE) as admin_actions_today,
    (SELECT COUNT(*) FROM donation_senders WHERE is_active = true) as total_donation_senders,
    (SELECT COUNT(*) FROM donation_senders WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_senders_last_30_days;

-- Grant access to the updated view
GRANT SELECT ON admin_dashboard_stats TO authenticated;

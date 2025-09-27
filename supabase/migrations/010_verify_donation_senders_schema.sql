-- Verify donation_senders schema completeness
-- This migration checks if all required columns exist and reports the current schema

DO $$
DECLARE
    missing_columns TEXT[] := ARRAY[]::TEXT[];
    existing_columns TEXT[] := ARRAY[]::TEXT[];
    col_name TEXT;
    required_columns TEXT[] := ARRAY[
        'id', 'email', 'provider', 'provider_id', 'email_verified', 'is_active',
        'created_at', 'updated_at', 'last_login', 'last_login_at', 'session_expires_at',
        'full_name', 'phone_number', 'first_name', 'last_name', 'profile_picture_url',
        'date_of_birth', 'address', 'city', 'state', 'country', 'pincode',
        'preferences', 'last_activity_at', 'total_donations_count', 'total_donated_amount',
        'login_attempts'
    ];
BEGIN
    -- Check if table exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'donation_senders') THEN
        RAISE EXCEPTION 'donation_senders table does not exist!';
    END IF;
    
    -- Get existing columns
    SELECT ARRAY_AGG(column_name ORDER BY column_name) INTO existing_columns
    FROM information_schema.columns 
    WHERE table_name = 'donation_senders' 
    AND table_schema = 'public';
    
    -- Check for missing columns
    FOREACH col_name IN ARRAY required_columns
    LOOP
        IF NOT (col_name = ANY(existing_columns)) THEN
            missing_columns := array_append(missing_columns, col_name);
        END IF;
    END LOOP;
    
    -- Report results
    RAISE NOTICE '=== DONATION_SENDERS SCHEMA VERIFICATION ===';
    RAISE NOTICE 'Total columns found: %', array_length(existing_columns, 1);
    RAISE NOTICE 'Required columns: %', array_length(required_columns, 1);
    
    IF array_length(missing_columns, 1) > 0 THEN
        RAISE WARNING 'Missing columns: %', array_to_string(missing_columns, ', ');
    ELSE
        RAISE NOTICE 'All required columns are present!';
    END IF;
    
    -- List all existing columns
    RAISE NOTICE 'Existing columns: %', array_to_string(existing_columns, ', ');
    
    -- Check data types for key columns
    RAISE NOTICE '=== KEY COLUMN TYPES ===';
    
    -- Check id column
    SELECT data_type INTO col_name
    FROM information_schema.columns 
    WHERE table_name = 'donation_senders' AND column_name = 'id';
    RAISE NOTICE 'id: %', COALESCE(col_name, 'MISSING');
    
    -- Check email column
    SELECT data_type INTO col_name
    FROM information_schema.columns 
    WHERE table_name = 'donation_senders' AND column_name = 'email';
    RAISE NOTICE 'email: %', COALESCE(col_name, 'MISSING');
    
    -- Check provider column
    SELECT data_type INTO col_name
    FROM information_schema.columns 
    WHERE table_name = 'donation_senders' AND column_name = 'provider';
    RAISE NOTICE 'provider: %', COALESCE(col_name, 'MISSING');
    
    -- Check last_login vs last_login_at
    IF 'last_login' = ANY(existing_columns) THEN
        RAISE NOTICE 'last_login: EXISTS';
    ELSE
        RAISE WARNING 'last_login: MISSING';
    END IF;
    
    IF 'last_login_at' = ANY(existing_columns) THEN
        RAISE NOTICE 'last_login_at: EXISTS';
    ELSE
        RAISE WARNING 'last_login_at: MISSING';
    END IF;
    
    -- Check new profile columns
    IF 'full_name' = ANY(existing_columns) THEN
        RAISE NOTICE 'full_name: EXISTS';
    ELSE
        RAISE WARNING 'full_name: MISSING';
    END IF;
    
    IF 'phone_number' = ANY(existing_columns) THEN
        RAISE NOTICE 'phone_number: EXISTS';
    ELSE
        RAISE WARNING 'phone_number: MISSING';
    END IF;
    
    -- Check indexes
    RAISE NOTICE '=== INDEXES ===';
    PERFORM 1 FROM pg_indexes WHERE tablename = 'donation_senders' AND indexname = 'idx_donation_senders_email';
    IF FOUND THEN
        RAISE NOTICE 'Email index: EXISTS';
    ELSE
        RAISE WARNING 'Email index: MISSING';
    END IF;
    
    PERFORM 1 FROM pg_indexes WHERE tablename = 'donation_senders' AND indexname = 'idx_donation_senders_full_name';
    IF FOUND THEN
        RAISE NOTICE 'Full name index: EXISTS';
    ELSE
        RAISE WARNING 'Full name index: MISSING';
    END IF;
    
    -- Check constraints
    RAISE NOTICE '=== CONSTRAINTS ===';
    PERFORM 1 FROM information_schema.table_constraints 
    WHERE table_name = 'donation_senders' AND constraint_name = 'valid_sender_email';
    IF FOUND THEN
        RAISE NOTICE 'Email validation constraint: EXISTS';
    ELSE
        RAISE WARNING 'Email validation constraint: MISSING';
    END IF;
    
    PERFORM 1 FROM information_schema.table_constraints 
    WHERE table_name = 'donation_senders' AND constraint_name = 'chk_phone_number_format';
    IF FOUND THEN
        RAISE NOTICE 'Phone number format constraint: EXISTS';
    ELSE
        RAISE WARNING 'Phone number format constraint: MISSING';
    END IF;
    
    RAISE NOTICE '=== VERIFICATION COMPLETE ===';
    
    -- If there are missing columns, provide guidance
    IF array_length(missing_columns, 1) > 0 THEN
        RAISE NOTICE 'To fix missing columns, run migration 009_fix_donation_senders_schema_alignment.sql';
    END IF;
    
END $$;

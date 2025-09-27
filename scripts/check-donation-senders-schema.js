#!/usr/bin/env node

/**
 * Check Donation Senders Database Schema
 * This script checks the current state of the donation_senders table
 * and reports any missing columns or schema issues.
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('🔍 Checking donation_senders table schema...\n');

  try {
    // Get table information
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_name', 'donation_senders')
      .eq('table_schema', 'public')
      .order('ordinal_position');

    if (columnsError) {
      console.error('❌ Error fetching table schema:', columnsError.message);
      return;
    }

    if (!columns || columns.length === 0) {
      console.error('❌ donation_senders table not found!');
      console.log('Please run the initial migrations first.');
      return;
    }

    console.log('📊 Current Schema:');
    console.log('==================');
    console.log(`Total columns: ${columns.length}\n`);

    // Expected columns based on TypeScript types
    const expectedColumns = [
      'id', 'email', 'provider', 'provider_id', 'email_verified', 'is_active',
      'created_at', 'updated_at', 'last_login', 'last_login_at', 'session_expires_at',
      'full_name', 'phone_number', 'first_name', 'last_name', 'profile_picture_url',
      'date_of_birth', 'address', 'city', 'state', 'country', 'pincode',
      'preferences', 'last_activity_at', 'total_donations_count', 'total_donated_amount',
      'login_attempts'
    ];

    const existingColumns = columns.map(col => col.column_name);
    const missingColumns = expectedColumns.filter(col => !existingColumns.includes(col));
    const extraColumns = existingColumns.filter(col => !expectedColumns.includes(col));

    // Display all columns
    columns.forEach((col, index) => {
      const status = expectedColumns.includes(col.column_name) ? '✅' : '⚠️';
      console.log(`${status} ${(index + 1).toString().padStart(2)}. ${col.column_name.padEnd(25)} ${col.data_type.padEnd(15)} ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });

    console.log('\n📋 Schema Analysis:');
    console.log('===================');

    if (missingColumns.length > 0) {
      console.log('❌ Missing columns:');
      missingColumns.forEach(col => console.log(`   - ${col}`));
    } else {
      console.log('✅ All expected columns are present');
    }

    if (extraColumns.length > 0) {
      console.log('\n⚠️  Extra columns (not in TypeScript types):');
      extraColumns.forEach(col => console.log(`   - ${col}`));
    }

    // Check for specific issues
    console.log('\n🔍 Specific Issues:');
    console.log('===================');

    if (!existingColumns.includes('last_login_at') && existingColumns.includes('last_login')) {
      console.log('⚠️  Schema mismatch: Database has "last_login" but TypeScript expects "last_login_at"');
    }

    if (!existingColumns.includes('full_name')) {
      console.log('❌ Missing: full_name column (required for admin panel)');
    }

    if (!existingColumns.includes('phone_number')) {
      console.log('❌ Missing: phone_number column (required for admin panel)');
    }

    if (!existingColumns.includes('login_attempts')) {
      console.log('❌ Missing: login_attempts column (used in admin panel)');
    }

    // Check sample data
    console.log('\n📊 Sample Data:');
    console.log('===============');

    const { data: sampleData, error: sampleError } = await supabase
      .from('donation_senders')
      .select('id, email, provider, full_name, phone_number, created_at')
      .limit(3);

    if (sampleError) {
      console.log('❌ Error fetching sample data:', sampleError.message);
    } else if (sampleData && sampleData.length > 0) {
      console.log(`Found ${sampleData.length} sample records:`);
      sampleData.forEach((record, index) => {
        console.log(`\n${index + 1}. ID: ${record.id}`);
        console.log(`   Email: ${record.email}`);
        console.log(`   Provider: ${record.provider}`);
        console.log(`   Full Name: ${record.full_name || 'NULL'}`);
        console.log(`   Phone: ${record.phone_number || 'NULL'}`);
        console.log(`   Created: ${record.created_at}`);
      });
    } else {
      console.log('No records found in donation_senders table');
    }

    // Recommendations
    console.log('\n💡 Recommendations:');
    console.log('===================');

    if (missingColumns.length > 0) {
      console.log('1. Run migration 009_fix_donation_senders_schema_alignment.sql');
      console.log('2. This will add all missing columns and fix schema alignment');
    }

    if (existingColumns.includes('last_login') && !existingColumns.includes('last_login_at')) {
      console.log('3. The migration will also add last_login_at column for compatibility');
    }

    console.log('4. After running migrations, verify with migration 010_verify_donation_senders_schema.sql');

  } catch (error) {
    console.error('❌ Error checking schema:', error.message);
  }
}

// Run the check
checkSchema().then(() => {
  console.log('\n✅ Schema check completed');
  process.exit(0);
}).catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});

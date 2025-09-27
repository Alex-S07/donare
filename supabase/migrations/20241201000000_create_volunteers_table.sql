-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  full_name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 16 AND age <= 100),
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  phone_number VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- Professional Details
  current_occupation VARCHAR(255),
  work_experience TEXT,
  educational_background TEXT,
  
  -- Volunteer Preferences
  commitment_duration VARCHAR(20) NOT NULL CHECK (commitment_duration IN ('1_month', '6_months', '1_year', 'flexible')),
  preferred_activities TEXT[], -- Array of preferred volunteer activities
  availability_schedule JSONB, -- Flexible schedule data
  
  -- Skills & Interests
  relevant_skills TEXT[],
  areas_of_interest TEXT[],
  previous_volunteer_experience TEXT,
  
  -- Emergency Contact
  emergency_contact_name VARCHAR(255) NOT NULL,
  emergency_contact_relationship VARCHAR(100) NOT NULL,
  emergency_contact_phone VARCHAR(20) NOT NULL,
  
  -- Background Information
  motivation_statement TEXT NOT NULL,
  certifications TEXT[],
  
  -- Supporting Documents
  documents JSONB, -- Store file paths and metadata
  
  -- Status and Management
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'inactive')),
  commitment_start_date DATE,
  commitment_end_date DATE,
  renewal_count INTEGER DEFAULT 0,
  
  -- Admin Management
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by_admin_id INTEGER REFERENCES admin_users(id),
  approval_reason TEXT,
  rejection_reason TEXT,
  
  -- Activity Tracking
  total_hours_volunteered INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE,
  performance_rating DECIMAL(3,2) CHECK (performance_rating >= 0 AND performance_rating <= 5),
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT volunteers_email_unique UNIQUE (email),
  CONSTRAINT volunteers_phone_unique UNIQUE (phone_number),
  CONSTRAINT volunteers_commitment_dates_valid CHECK (
    commitment_start_date IS NULL OR 
    commitment_end_date IS NULL OR 
    commitment_start_date <= commitment_end_date
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON volunteers(status);
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON volunteers(email);
CREATE INDEX IF NOT EXISTS idx_volunteers_phone ON volunteers(phone_number);
CREATE INDEX IF NOT EXISTS idx_volunteers_submitted_at ON volunteers(submitted_at);
CREATE INDEX IF NOT EXISTS idx_volunteers_commitment_dates ON volunteers(commitment_start_date, commitment_end_date);

-- Create volunteer activities table for tracking volunteer work
CREATE TABLE IF NOT EXISTS volunteer_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  
  -- Activity Details
  activity_type VARCHAR(100) NOT NULL,
  activity_description TEXT NOT NULL,
  activity_date DATE NOT NULL,
  hours_worked DECIMAL(4,2) NOT NULL CHECK (hours_worked > 0),
  
  -- Location and Context
  location VARCHAR(255),
  donation_category VARCHAR(50), -- If related to specific donation category
  
  -- Impact Tracking
  beneficiaries_served INTEGER DEFAULT 0,
  impact_description TEXT,
  
  -- Admin Review
  reviewed_by_admin_id INTEGER REFERENCES admin_users(id),
  review_notes TEXT,
  performance_rating DECIMAL(3,2) CHECK (performance_rating >= 0 AND performance_rating <= 5),
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for volunteer activities
CREATE INDEX IF NOT EXISTS idx_volunteer_activities_volunteer_id ON volunteer_activities(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_activities_date ON volunteer_activities(activity_date);
CREATE INDEX IF NOT EXISTS idx_volunteer_activities_type ON volunteer_activities(activity_type);

-- Create volunteer achievements table for recognition system
CREATE TABLE IF NOT EXISTS volunteer_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  
  -- Achievement Details
  achievement_type VARCHAR(100) NOT NULL,
  achievement_title VARCHAR(255) NOT NULL,
  achievement_description TEXT,
  criteria_met JSONB, -- Store what criteria were met for this achievement
  
  -- Recognition
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  awarded_by_admin_id INTEGER REFERENCES admin_users(id),
  badge_url VARCHAR(500), -- URL to achievement badge image
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for volunteer achievements
CREATE INDEX IF NOT EXISTS idx_volunteer_achievements_volunteer_id ON volunteer_achievements(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_achievements_type ON volunteer_achievements(achievement_type);

-- Create volunteer testimonials table
CREATE TABLE IF NOT EXISTS volunteer_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
  
  -- Testimonial Content
  testimonial_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Approval
  is_approved BOOLEAN DEFAULT FALSE,
  approved_by_admin_id INTEGER REFERENCES admin_users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- System Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for volunteer testimonials
CREATE INDEX IF NOT EXISTS idx_volunteer_testimonials_volunteer_id ON volunteer_testimonials(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_testimonials_approved ON volunteer_testimonials(is_approved);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_volunteers_updated_at 
  BEFORE UPDATE ON volunteers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_activities_updated_at 
  BEFORE UPDATE ON volunteer_activities 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_testimonials_updated_at 
  BEFORE UPDATE ON volunteer_testimonials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_testimonials ENABLE ROW LEVEL SECURITY;

-- Policy for volunteers - users can only see their own data, admins can see all
CREATE POLICY "Users can view own volunteer data" ON volunteers
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Admins can view all volunteer data" ON volunteers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (current_setting('request.jwt.claims', true)::json->>'adminId')::integer
    )
  );

-- Policy for volunteer activities
CREATE POLICY "Users can view own volunteer activities" ON volunteer_activities
  FOR SELECT USING (
    volunteer_id IN (
      SELECT id FROM volunteers 
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Admins can manage all volunteer activities" ON volunteer_activities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (current_setting('request.jwt.claims', true)::json->>'adminId')::integer
    )
  );

-- Policy for volunteer achievements
CREATE POLICY "Users can view own volunteer achievements" ON volunteer_achievements
  FOR SELECT USING (
    volunteer_id IN (
      SELECT id FROM volunteers 
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Admins can manage all volunteer achievements" ON volunteer_achievements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (current_setting('request.jwt.claims', true)::json->>'adminId')::integer
    )
  );

-- Policy for volunteer testimonials
CREATE POLICY "Users can view approved testimonials" ON volunteer_testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can create own testimonials" ON volunteer_testimonials
  FOR INSERT WITH CHECK (
    volunteer_id IN (
      SELECT id FROM volunteers 
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

CREATE POLICY "Admins can manage all testimonials" ON volunteer_testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (current_setting('request.jwt.claims', true)::json->>'adminId')::integer
    )
  );

-- Create profile role enum
CREATE TYPE profile_role AS ENUM ('admin', 'instructor', 'student');

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    emergency_contact VARCHAR(20),
    role profile_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL,
    CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add comment to role column
COMMENT ON COLUMN profiles.role IS 'ユーザーの役割（管理者、インストラクター、生徒）';

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role = 'admin'::profile_role
    );
END;
$$;

-- -- Create RLS policies for profiles
-- CREATE POLICY "Profiles access policy" ON profiles
--     FOR ALL USING (
--         -- 自分自身のプロファイル、または管理者の場合はアクセス可能
--         auth.uid() = user_id 
--         OR 
--         is_admin()
--     );

-- Create updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
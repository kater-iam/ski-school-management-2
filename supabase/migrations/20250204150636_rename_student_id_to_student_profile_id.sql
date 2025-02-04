-- Drop existing foreign key constraint and index
ALTER TABLE reservations DROP CONSTRAINT reservations_student_id_fkey;
DROP INDEX IF EXISTS idx_reservations_student_id;

-- Rename the column
ALTER TABLE reservations RENAME COLUMN student_id TO student_profile_id;

-- Add new foreign key constraint and index
ALTER TABLE reservations 
    ADD CONSTRAINT reservations_student_profile_id_fkey 
    FOREIGN KEY (student_profile_id) 
    REFERENCES profiles(id) ON DELETE CASCADE;

CREATE INDEX idx_reservations_student_profile_id ON reservations(student_profile_id);

-- Update function to use new column name
CREATE OR REPLACE FUNCTION check_student_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM profiles
        WHERE id = NEW.student_profile_id
        AND role = 'student'
    ) THEN
        RAISE EXCEPTION 'student_profile_id must reference a profile with student role';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

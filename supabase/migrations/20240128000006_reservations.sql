-- Create enum type
CREATE TYPE reservation_status AS ENUM ('申し込み', '申し込み承認', '受講済', 'キャンセル');

-- Create function to generate reservation number
CREATE OR REPLACE FUNCTION generate_reservation_number()
RETURNS TRIGGER AS $$
DECLARE
    year_month TEXT;
    sequence_number INT;
BEGIN
    -- Get current year and month in YYYYMM format
    year_month := TO_CHAR(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Tokyo', 'YYYYMM');
    
    -- Get the next sequence number for this month
    WITH RECURSIVE seq AS (
        SELECT 1 as num
        UNION ALL
        SELECT num + 1
        FROM seq
        WHERE num < 9999
    ),
    used_numbers AS (
        SELECT SUBSTRING(reservation_number, 8)::integer as num
        FROM reservations
        WHERE reservation_number LIKE year_month || '-%'
    )
    SELECT MIN(seq.num) INTO sequence_number
    FROM seq
    LEFT JOIN used_numbers ON seq.num = used_numbers.num
    WHERE used_numbers.num IS NULL
    LIMIT 1;

    -- Format: YYYYMM-XXXX (e.g., 202402-0001)
    NEW.reservation_number := year_month || '-' || LPAD(sequence_number::text, 4, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create reservations table
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_schedule_id UUID NOT NULL REFERENCES lesson_schedules(id) ON DELETE CASCADE,
    student_profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reservation_number VARCHAR(255) NOT NULL UNIQUE,
    status reservation_status NOT NULL DEFAULT '申し込み',
    instructor_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL
);

-- Create trigger for reservation number generation
CREATE TRIGGER set_reservation_number
    BEFORE INSERT ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION generate_reservation_number();

-- Add column comments
COMMENT ON TABLE reservations IS 'レッスン予約';
COMMENT ON COLUMN reservations.id IS '予約ID';
COMMENT ON COLUMN reservations.lesson_schedule_id IS 'レッスンスケジュールID（lesson_schedulesテーブルの外部キー）';
COMMENT ON COLUMN reservations.student_profile_id IS '生徒のプロファイルID（profilesテーブルの外部キー）';
COMMENT ON COLUMN reservations.reservation_number IS '予約番号';
COMMENT ON COLUMN reservations.status IS '予約ステータス';
COMMENT ON COLUMN reservations.instructor_comment IS 'インストラクターのコメント';
COMMENT ON COLUMN reservations.created_at IS '作成日時';
COMMENT ON COLUMN reservations.updated_at IS '更新日時';

-- Create indexes
CREATE INDEX idx_reservations_lesson_schedule_id ON reservations(lesson_schedule_id);
CREATE INDEX idx_reservations_student_profile_id ON reservations(student_profile_id);

-- Create trigger for updating updated_at
CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to check student role
CREATE OR REPLACE FUNCTION check_student_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM profiles p
        WHERE p.id = NEW.student_profile_id
        AND p.role = 'student'
    ) THEN
        RAISE EXCEPTION 'student_profile_id must reference a profile with student role';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to check student role
CREATE TRIGGER check_student_role_trigger
    BEFORE INSERT OR UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION check_student_role();

-- Enable RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for reservations
CREATE POLICY "管理者はすべての操作が可能" ON reservations
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "インストラクターは担当レッスンの予約を閲覧・更新可能" ON reservations
    FOR SELECT
    TO authenticated
    USING (
        is_instructor() AND 
        lesson_schedule_id IN (
            SELECT id FROM lesson_schedules 
            WHERE instructor_id = auth.uid()
        )
    );

CREATE POLICY "インストラクターは担当レッスンの予約を更新可能" ON reservations
    FOR UPDATE
    TO authenticated
    USING (
        is_instructor() AND 
        lesson_schedule_id IN (
            SELECT id FROM lesson_schedules 
            WHERE instructor_id = auth.uid()
        )
    )
    WITH CHECK (
        is_instructor() AND 
        lesson_schedule_id IN (
            SELECT id FROM lesson_schedules 
            WHERE instructor_id = auth.uid()
        )
    );

CREATE POLICY "受講者は自身の予約の操作が可能" ON reservations
    FOR ALL
    TO authenticated
    USING (
        is_student() AND 
        student_profile_id IN (
            SELECT id FROM profiles 
            WHERE user_id = auth.uid()
        )
    )
    WITH CHECK (
        is_student() AND 
        student_profile_id IN (
            SELECT id FROM profiles 
            WHERE user_id = auth.uid()
        )
    ); 
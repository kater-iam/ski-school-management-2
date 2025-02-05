-- Create instructor_schedules table
CREATE TABLE instructor_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL
);

-- Add comments to instructor_schedules columns
COMMENT ON COLUMN instructor_schedules.instructor_id IS 'インストラクターID（profilesテーブルの外部キー）';
COMMENT ON COLUMN instructor_schedules.date IS '勤務日';
COMMENT ON COLUMN instructor_schedules.start_time IS '勤務開始時間';
COMMENT ON COLUMN instructor_schedules.end_time IS '勤務終了時間';

-- Create indexes for instructor_schedules
CREATE INDEX idx_instructor_schedules_instructor_id ON instructor_schedules(instructor_id);
CREATE INDEX idx_instructor_schedules_date ON instructor_schedules(date);

-- Create updated_at trigger for instructor_schedules
CREATE TRIGGER update_instructor_schedules_updated_at
    BEFORE UPDATE ON instructor_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
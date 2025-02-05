-- Create lesson schedule status enum
CREATE TYPE lesson_schedule_status AS ENUM ('open', 'closed');

-- Create lesson_schedules table
CREATE TABLE lesson_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status lesson_schedule_status NOT NULL DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL
);

-- Add comments to lesson_schedules columns
COMMENT ON COLUMN lesson_schedules.lesson_id IS 'レッスンID（lessonsテーブルの外部キー）';
COMMENT ON COLUMN lesson_schedules.instructor_id IS 'インストラクターID（profilesテーブルの外部キー）';
COMMENT ON COLUMN lesson_schedules.start_time IS '開始日時';
COMMENT ON COLUMN lesson_schedules.end_time IS '終了日時';
COMMENT ON COLUMN lesson_schedules.status IS 'ステータス（open, closed）';

-- Create indexes for lesson_schedules
CREATE INDEX idx_lesson_schedules_lesson_id ON lesson_schedules(lesson_id);
CREATE INDEX idx_lesson_schedules_instructor_id ON lesson_schedules(instructor_id);
CREATE INDEX idx_lesson_schedules_start_time ON lesson_schedules(start_time);

-- Create updated_at trigger for lesson_schedules
CREATE TRIGGER update_lesson_schedules_updated_at
    BEFORE UPDATE ON lesson_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
-- Create lesson_schedules table
CREATE TABLE lesson_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL,
    instructor_id UUID NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open',
    current_participants INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_schedules_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT fk_schedules_instructor FOREIGN KEY (instructor_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT check_status CHECK (status IN ('open', 'closed', 'cancelled')),
    CONSTRAINT check_time CHECK (end_time > start_time)
);

-- Add column comments for lesson_schedules
COMMENT ON COLUMN lesson_schedules.id IS 'スケジュールID';
COMMENT ON COLUMN lesson_schedules.lesson_id IS 'レッスンID (FK)';
COMMENT ON COLUMN lesson_schedules.instructor_id IS 'インストラクターID (FK)';
COMMENT ON COLUMN lesson_schedules.start_time IS '開始日時';
COMMENT ON COLUMN lesson_schedules.end_time IS '終了日時';
COMMENT ON COLUMN lesson_schedules.status IS '状態（open/closed/cancelled）';
COMMENT ON COLUMN lesson_schedules.current_participants IS '現在の参加者数';
COMMENT ON COLUMN lesson_schedules.created_at IS '作成日時';
COMMENT ON COLUMN lesson_schedules.updated_at IS '更新日時';

-- Enable RLS on lesson_schedules
ALTER TABLE lesson_schedules ENABLE ROW LEVEL SECURITY;

-- Create lesson_schedules indexes
CREATE INDEX idx_schedules_dates ON lesson_schedules(start_time, end_time);
CREATE INDEX idx_schedules_instructor ON lesson_schedules(instructor_id);
CREATE INDEX idx_schedules_lesson ON lesson_schedules(lesson_id);

-- Create RLS policies for lesson_schedules
CREATE POLICY "Anyone can view lesson schedules" ON lesson_schedules
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage lesson schedules" ON lesson_schedules
    FOR ALL USING (auth.role() = 'admin');

-- Create reservations table
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID NOT NULL,
    user_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT '申し込み',
    instructor_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_reservations_schedule FOREIGN KEY (schedule_id) REFERENCES lesson_schedules(id) ON DELETE CASCADE,
    CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT check_status CHECK (status IN ('申し込み', '申し込み承認', '受講済', 'キャンセル'))
);

-- Add column comments for reservations
COMMENT ON COLUMN reservations.id IS '予約ID';
COMMENT ON COLUMN reservations.schedule_id IS 'スケジュールID (FK)';
COMMENT ON COLUMN reservations.user_id IS 'ユーザーID (FK)';
COMMENT ON COLUMN reservations.status IS '状態（申し込み/申し込み承認/受講済/キャンセル）';
COMMENT ON COLUMN reservations.instructor_comment IS 'インストラクターからのアドバイス';
COMMENT ON COLUMN reservations.created_at IS '作成日時';
COMMENT ON COLUMN reservations.updated_at IS '更新日時';

-- Enable RLS on reservations
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create reservations indexes
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_schedule ON reservations(schedule_id);

-- Create RLS policies for reservations
CREATE POLICY "Users can view their own reservations" ON reservations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create reservations" ON reservations
    FOR INSERT WITH CHECK (auth.role() IN ('student', 'admin'));

CREATE POLICY "Users can update their own reservations" ON reservations
    FOR UPDATE USING (auth.uid() = user_id);

-- Create instructor_schedules table
CREATE TABLE instructor_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    instructor_id UUID NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_instructor_schedules_user FOREIGN KEY (instructor_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT check_time CHECK (end_time > start_time)
);

-- Add column comments for instructor_schedules
COMMENT ON COLUMN instructor_schedules.id IS 'スケジュールID';
COMMENT ON COLUMN instructor_schedules.instructor_id IS 'インストラクターID (FK)';
COMMENT ON COLUMN instructor_schedules.date IS '勤務可能日';
COMMENT ON COLUMN instructor_schedules.start_time IS '開始時間';
COMMENT ON COLUMN instructor_schedules.end_time IS '終了時間';
COMMENT ON COLUMN instructor_schedules.created_at IS '作成日時';
COMMENT ON COLUMN instructor_schedules.updated_at IS '更新日時';

-- Enable RLS on instructor_schedules
ALTER TABLE instructor_schedules ENABLE ROW LEVEL SECURITY;

-- Create instructor_schedules indexes
CREATE INDEX idx_instructor_dates ON instructor_schedules(instructor_id, date);

-- Create RLS policies for instructor_schedules
CREATE POLICY "Instructors can view their own schedules" ON instructor_schedules
    FOR SELECT USING (auth.uid() = instructor_id OR auth.role() = 'admin');

CREATE POLICY "Only admins can manage instructor schedules" ON instructor_schedules
    FOR ALL USING (auth.role() = 'admin');

-- Create updated_at triggers
CREATE TRIGGER update_lesson_schedules_updated_at
    BEFORE UPDATE ON lesson_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instructor_schedules_updated_at
    BEFORE UPDATE ON instructor_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
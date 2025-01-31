-- Create reservation status enum
CREATE TYPE reservation_status AS ENUM ('申し込み', '申し込み承認', '受講済', 'キャンセル');

-- Create reservations table
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_schedule_id UUID REFERENCES lesson_schedules(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    reservation_number VARCHAR(20) NOT NULL,
    status reservation_status NOT NULL DEFAULT '申し込み',
    instructor_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add comments to reservations columns
COMMENT ON COLUMN reservations.lesson_schedule_id IS 'レッスンスケジュールID（lesson_schedulesテーブルの外部キー）';
COMMENT ON COLUMN reservations.user_id IS 'ユーザーID（auth.usersテーブルの外部キー）';
COMMENT ON COLUMN reservations.reservation_number IS '予約番号';
COMMENT ON COLUMN reservations.status IS 'ステータス（申し込み、申し込み承認、受講済、キャンセル）';
COMMENT ON COLUMN reservations.instructor_comment IS 'インストラクターのコメント';

-- Create indexes for reservations
CREATE INDEX idx_reservations_lesson_schedule_id ON reservations(lesson_schedule_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_reservation_number ON reservations(reservation_number);

-- Create updated_at trigger for reservations
CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
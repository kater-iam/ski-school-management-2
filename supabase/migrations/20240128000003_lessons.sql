-- Create lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL,
    price INTEGER NOT NULL,
    max_participants INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (current_timestamp AT TIME ZONE 'JST' AT TIME ZONE 'Asia/Tokyo') NOT NULL
);

-- Add comments to lessons columns
COMMENT ON COLUMN lessons.name IS 'レッスン名';
COMMENT ON COLUMN lessons.description IS 'レッスンの説明';
COMMENT ON COLUMN lessons.duration IS 'レッスン時間（分）';
COMMENT ON COLUMN lessons.price IS 'レッスン料金';
COMMENT ON COLUMN lessons.max_participants IS '最大参加人数';

-- Create updated_at trigger for lessons
CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for lessons
CREATE POLICY "誰でも閲覧可能" ON lessons
    FOR SELECT
    USING (true);

CREATE POLICY "管理者はすべての操作が可能" ON lessons
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin()); 
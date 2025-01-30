-- Create lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    level VARCHAR(20) NOT NULL,
    duration INTEGER NOT NULL,
    max_participants INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add column comments for lessons
COMMENT ON COLUMN lessons.id IS 'レッスンID';
COMMENT ON COLUMN lessons.name IS 'レッスン名';
COMMENT ON COLUMN lessons.description IS 'レッスン説明';
COMMENT ON COLUMN lessons.level IS 'レベル（初級/中級/上級）';
COMMENT ON COLUMN lessons.duration IS '所要時間（分）';
COMMENT ON COLUMN lessons.max_participants IS '最大参加人数';
COMMENT ON COLUMN lessons.created_at IS '作成日時';
COMMENT ON COLUMN lessons.updated_at IS '更新日時';

-- Enable RLS on lessons
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for lessons
CREATE POLICY "Anyone can view lessons" ON lessons
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage lessons" ON lessons
    FOR ALL USING (auth.role() = 'admin');

-- Create updated_at triggers
CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
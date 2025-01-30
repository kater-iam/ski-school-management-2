-- Create lesson_levels table
CREATE TABLE lesson_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    comment_templates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add column comments for lesson_levels
COMMENT ON COLUMN lesson_levels.id IS 'レベルID';
COMMENT ON COLUMN lesson_levels.name IS 'レベル名（初級、中級、上級など）';
COMMENT ON COLUMN lesson_levels.description IS 'レベル説明';
COMMENT ON COLUMN lesson_levels.comment_templates IS 'コメントテンプレート配列（例：["姿勢が良くなってきました", "ターンの切り替えがスムーズです"]）';
COMMENT ON COLUMN lesson_levels.created_at IS '作成日時';
COMMENT ON COLUMN lesson_levels.updated_at IS '更新日時';

-- Enable RLS on lesson_levels
ALTER TABLE lesson_levels ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for lesson_levels
CREATE POLICY "Anyone can view lesson levels" ON lesson_levels
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage lesson levels" ON lesson_levels
    FOR ALL USING (auth.role() = 'admin');

-- Create lessons table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    max_participants INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_lessons_level FOREIGN KEY (level_id) REFERENCES lesson_levels(id) ON DELETE CASCADE
);

-- Add column comments for lessons
COMMENT ON COLUMN lessons.id IS 'レッスンID';
COMMENT ON COLUMN lessons.level_id IS 'レベルID (FK)';
COMMENT ON COLUMN lessons.name IS 'レッスン名';
COMMENT ON COLUMN lessons.description IS 'レッスン説明';
COMMENT ON COLUMN lessons.duration IS '所要時間（分）';
COMMENT ON COLUMN lessons.max_participants IS '最大参加人数';
COMMENT ON COLUMN lessons.created_at IS '作成日時';
COMMENT ON COLUMN lessons.updated_at IS '更新日時';

-- Enable RLS on lessons
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create lessons indexes
CREATE INDEX idx_lessons_level ON lessons(level_id);

-- Create RLS policies for lessons
CREATE POLICY "Anyone can view lessons" ON lessons
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage lessons" ON lessons
    FOR ALL USING (auth.role() = 'admin');

-- Create updated_at triggers
CREATE TRIGGER update_lesson_levels_updated_at
    BEFORE UPDATE ON lesson_levels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
-- Create lesson_levels table
CREATE TABLE lesson_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

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
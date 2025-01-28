-- Create user_levels table
CREATE TABLE user_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    level_id UUID NOT NULL,
    achieved_date DATE NOT NULL,
    instructor_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_user_levels_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_levels_level FOREIGN KEY (level_id) REFERENCES lesson_levels(id) ON DELETE CASCADE
);

-- Enable RLS on user_levels
ALTER TABLE user_levels ENABLE ROW LEVEL SECURITY;

-- Create user_levels indexes
CREATE INDEX idx_user_levels ON user_levels(user_id, level_id);

-- Create RLS policies for user_levels
CREATE POLICY "Users can view their own levels" ON user_levels
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Instructors can view their students levels" ON user_levels
    FOR SELECT USING (
        auth.role() = 'instructor' AND 
        EXISTS (
            SELECT 1 FROM lesson_schedules ls
            WHERE ls.instructor_id = auth.uid()
            AND ls.lesson_id IN (
                SELECT l.id FROM lessons l
                WHERE l.level_id = user_levels.level_id
            )
        )
    );

CREATE POLICY "Only admins can manage user levels" ON user_levels
    FOR ALL USING (auth.role() = 'admin');

-- Create updated_at trigger
CREATE TRIGGER update_user_levels_updated_at
    BEFORE UPDATE ON user_levels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 
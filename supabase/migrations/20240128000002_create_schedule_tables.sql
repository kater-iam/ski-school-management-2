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
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT fk_reservations_schedule FOREIGN KEY (schedule_id) REFERENCES lesson_schedules(id) ON DELETE CASCADE,
    CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT check_status CHECK (status IN ('confirmed', 'cancelled'))
);

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
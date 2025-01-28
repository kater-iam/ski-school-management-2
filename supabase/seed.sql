-- Start transaction
BEGIN;

-- Import test users
COPY auth.users(id, email, role) FROM '/supabase/seed-data/users.csv' WITH (FORMAT csv, HEADER true);

-- Import profiles
COPY profiles(id, user_id, first_name, last_name, phone, emergency_contact) FROM '/supabase/seed-data/profiles.csv' WITH (FORMAT csv, HEADER true);

-- Import lesson levels
COPY lesson_levels(id, name, description) FROM '/supabase/seed-data/lesson_levels.csv' WITH (FORMAT csv, HEADER true);

-- Import lessons
COPY lessons(id, level_id, name, description, duration, max_participants) FROM '/supabase/seed-data/lessons.csv' WITH (FORMAT csv, HEADER true);

-- Import lesson schedules
COPY lesson_schedules(id, lesson_id, instructor_id, start_time, end_time, status) FROM '/supabase/seed-data/lesson_schedules.csv' WITH (FORMAT csv, HEADER true);

-- Import reservations
COPY reservations(id, schedule_id, user_id, status) FROM '/supabase/seed-data/reservations.csv' WITH (FORMAT csv, HEADER true);

-- Commit transaction
COMMIT; 
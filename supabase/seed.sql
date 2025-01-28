-- Start transaction
BEGIN;

-- Import test users
\copy auth.users(id, email, role) FROM 'seed-data/users.csv' WITH (FORMAT csv, HEADER true);

-- Import profiles
\copy profiles(id, user_id, first_name, last_name, phone, emergency_contact) FROM 'seed-data/profiles.csv' WITH (FORMAT csv, HEADER true);

-- Import lesson levels
\copy lesson_levels(id, name, description) FROM 'seed-data/lesson_levels.csv' WITH (FORMAT csv, HEADER true);

-- Import lessons
\copy lessons(id, level_id, name, description, duration, max_participants) FROM 'seed-data/lessons.csv' WITH (FORMAT csv, HEADER true);

-- Import lesson schedules
\copy lesson_schedules(id, lesson_id, instructor_id, start_time, end_time, status) FROM 'seed-data/lesson_schedules.csv' WITH (FORMAT csv, HEADER true);

-- Import reservations
\copy reservations(id, schedule_id, user_id, status) FROM 'seed-data/reservations.csv' WITH (FORMAT csv, HEADER true);

-- Commit transaction
COMMIT; 
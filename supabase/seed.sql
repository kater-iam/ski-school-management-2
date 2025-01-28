-- Start transaction
BEGIN;

-- Import test users
COPY auth.users (id, email, role)
FROM '/seed-data/users.csv'
WITH (FORMAT csv, HEADER true);

-- Import profiles
COPY profiles (id, user_id, first_name, last_name, phone, emergency_contact)
FROM '/seed-data/profiles.csv'
WITH (FORMAT csv, HEADER true);

-- Import lesson levels
COPY lesson_levels (id, name, description)
FROM '/seed-data/lesson_levels.csv'
WITH (FORMAT csv, HEADER true);

-- Import lessons
COPY lessons (id, level_id, name, description, duration, max_participants)
FROM '/seed-data/lessons.csv'
WITH (FORMAT csv, HEADER true);

-- Commit transaction
COMMIT; 
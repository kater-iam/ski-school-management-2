-- Disable triggers temporarily
ALTER TABLE auth.users DISABLE TRIGGER ALL;
ALTER TABLE profiles DISABLE TRIGGER ALL;
ALTER TABLE lesson_levels DISABLE TRIGGER ALL;
ALTER TABLE lessons DISABLE TRIGGER ALL;

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

-- Re-enable triggers
ALTER TABLE auth.users ENABLE TRIGGER ALL;
ALTER TABLE profiles ENABLE TRIGGER ALL;
ALTER TABLE lesson_levels ENABLE TRIGGER ALL;
ALTER TABLE lessons ENABLE TRIGGER ALL; 
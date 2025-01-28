-- Start transaction
BEGIN;


INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a96ea053-60dd-4c85-a099-a403b3533f55',
    'authenticated',
    'authenticated',
    'admin@kater.jp',
    crypt('password123', gen_salt('bf')),
    current_timestamp,
    '',
    current_timestamp,
    '',
    current_timestamp,
    '',
    '',
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
    '{}'::jsonb,
    current_timestamp,
    current_timestamp
);

-- Import test users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440000', 'authenticated', 'authenticated', 'admin@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440001', 'authenticated', 'authenticated', 'instructor1@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440002', 'authenticated', 'authenticated', 'instructor2@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440003', 'authenticated', 'authenticated', 'student1@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440004', 'authenticated', 'authenticated', 'student2@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440005', 'authenticated', 'authenticated', 'student3@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp);

-- Import profiles
INSERT INTO profiles (id, user_id, first_name, last_name, phone, emergency_contact) VALUES
('880e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', '管理者', '太郎', '090-1111-1111', '090-1111-1112'),
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '山田', '一郎', '090-2222-2221', '090-2222-2222'),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '鈴木', '二郎', '090-3333-3331', '090-3333-3332'),
('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '佐藤', '花子', '090-4444-4441', '090-4444-4442'),
('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '田中', '幸子', '090-5555-5551', '090-5555-5552'),
('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '高橋', '三郎', '090-6666-6661', '090-6666-6662');

-- Import lesson levels
INSERT INTO lesson_levels (id, name, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', '初級', 'スキーの基本を学ぶ初心者向けレベルです。プルークボーゲンやパラレルターンの基礎を習得します。'),
('550e8400-e29b-41d4-a716-446655440001', '中級', '基本的なパラレルターンができる方向けのレベルです。カービングターンやスピードコントロールを習得します。'),
('550e8400-e29b-41d4-a716-446655440002', '上級', 'パラレルターンが安定している方向けの上級者レベルです。不整地やモーグルなどの技術を習得します。');

-- Import lessons
INSERT INTO lessons (id, level_id, name, description, duration, max_participants) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '初心者スキー教室', 'スキーの基本姿勢から始める初心者向けレッスンです。プルークボーゲンまでを目指します。', 120, 6),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '初級パラレルターン', 'プルークボーゲンからパラレルターンへの移行を目指すレッスンです。', 120, 6),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'カービングターン基礎', 'パラレルターンの技術をベースにカービングターンの基礎を学びます。', 120, 4),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'スピードコントロール', '様々な斜面でのスピードコントロール技術を習得します。', 120, 4),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '不整地レッスン', '不整地やコブ斜面での滑走技術を習得します。', 120, 3),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'フリーライディング', 'バックカントリーやパウダースノーでの滑走技術を学びます。', 180, 3);

-- Import lesson schedules
INSERT INTO lesson_schedules (id, lesson_id, instructor_id, start_time, end_time, status) VALUES
('990e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440001', '2024-02-01 10:00:00+00', '2024-02-01 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '2024-02-01 13:00:00+00', '2024-02-01 15:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '2024-02-02 10:00:00+00', '2024-02-02 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', '2024-02-02 13:00:00+00', '2024-02-02 15:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440001', '2024-02-03 10:00:00+00', '2024-02-03 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440002', '2024-02-03 13:00:00+00', '2024-02-03 16:00:00+00', 'open');

-- Import reservations
INSERT INTO reservations (id, schedule_id, user_id, status) VALUES
('aa0e8400-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440003', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440004', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440004', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440005', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440005', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440006', '990e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440003', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440007', '990e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440004', 'confirmed');

-- Import user levels
INSERT INTO user_levels (id, user_id, level_id, achieved_date, instructor_comment) VALUES
('bb0e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '2024-01-15', 'プルークボーゲンが安定してきました。次はパラレルターンに挑戦しましょう。'),
('bb0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', '2024-01-20', 'パラレルターンの基本が身についています。カービングの練習を始めましょう。'),
('bb0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '2024-01-25', '不整地での滑走も安定しています。より高度な技術にチャレンジしていきましょう。');

-- Commit transaction
COMMIT; 
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
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440021', 'authenticated', 'authenticated', 'instructor3@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440022', 'authenticated', 'authenticated', 'instructor4@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440003', 'authenticated', 'authenticated', 'student1@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440004', 'authenticated', 'authenticated', 'student2@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440005', 'authenticated', 'authenticated', 'student3@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440006', 'authenticated', 'authenticated', 'student4@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440007', 'authenticated', 'authenticated', 'student5@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440008', 'authenticated', 'authenticated', 'student6@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440009', 'authenticated', 'authenticated', 'student7@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('00000000-0000-0000-0000-000000000000', '770e8400-e29b-41d4-a716-446655440010', 'authenticated', 'authenticated', 'student8@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp);

-- Import profiles
INSERT INTO profiles (id, user_id, first_name, last_name, phone, emergency_contact) VALUES
('880e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440000', '管理者', '太郎', '090-1111-1111', '090-1111-1112'),
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '山田', '一郎', '090-2222-2221', '090-2222-2222'),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '鈴木', '二郎', '090-3333-3331', '090-3333-3332'),
('880e8400-e29b-41d4-a716-446655440021', '770e8400-e29b-41d4-a716-446655440021', '中村', '優子', '090-2222-3331', '090-2222-3332'),
('880e8400-e29b-41d4-a716-446655440022', '770e8400-e29b-41d4-a716-446655440022', '小林', '健一', '090-3333-4441', '090-3333-4442'),
('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '佐藤', '花子', '090-4444-4441', '090-4444-4442'),
('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '田中', '幸子', '090-5555-5551', '090-5555-5552'),
('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '高橋', '三郎', '090-6666-6661', '090-6666-6662'),
('880e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440006', '渡辺', '美咲', '090-7777-7771', '090-7777-7772'),
('880e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440007', '伊藤', '健太', '090-8888-8881', '090-8888-8882'),
('880e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440008', '加藤', '裕子', '090-9999-9991', '090-9999-9992'),
('880e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440009', '山本', '大輔', '090-1234-5671', '090-1234-5672'),
('880e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440010', '吉田', '真由美', '090-2345-6781', '090-2345-6782');

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

-- Import lesson schedules (2月の予定を追加)
INSERT INTO lesson_schedules (id, lesson_id, instructor_id, start_time, end_time, status) VALUES
-- 2月第1週
('990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440001', '2024-02-01 10:00:00+00', '2024-02-01 12:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', '2024-02-01 13:00:00+00', '2024-02-01 15:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440021', '2024-02-02 10:00:00+00', '2024-02-02 12:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440022', '2024-02-02 13:00:00+00', '2024-02-02 15:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440001', '2024-02-03 10:00:00+00', '2024-02-03 12:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440002', '2024-02-03 13:00:00+00', '2024-02-03 16:00:00+00', 'closed'),
-- 2月第2週
('990e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440021', '2024-02-08 10:00:00+00', '2024-02-08 12:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440022', '2024-02-08 13:00:00+00', '2024-02-08 15:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '2024-02-09 10:00:00+00', '2024-02-09 12:00:00+00', 'closed'),
('990e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', '2024-02-09 13:00:00+00', '2024-02-09 15:00:00+00', 'closed'),
-- 2月第3週（現在）
('990e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440001', '2024-02-15 10:00:00+00', '2024-02-15 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', '2024-02-15 13:00:00+00', '2024-02-15 15:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440021', '2024-02-16 10:00:00+00', '2024-02-16 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440022', '2024-02-16 13:00:00+00', '2024-02-16 15:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440001', '2024-02-17 10:00:00+00', '2024-02-17 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440016', '660e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440002', '2024-02-17 13:00:00+00', '2024-02-17 16:00:00+00', 'open'),
-- 2月第4週
('990e8400-e29b-41d4-a716-446655440017', '660e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440021', '2024-02-22 10:00:00+00', '2024-02-22 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440018', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440022', '2024-02-22 13:00:00+00', '2024-02-22 15:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440019', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', '2024-02-23 10:00:00+00', '2024-02-23 12:00:00+00', 'open'),
('990e8400-e29b-41d4-a716-446655440020', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002', '2024-02-23 13:00:00+00', '2024-02-23 15:00:00+00', 'open');

-- Import reservations
INSERT INTO reservations (id, schedule_id, user_id, status) VALUES
-- 2月第1週（完了）
('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440004', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440005', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440006', 'confirmed'),
-- 2月第2週（完了）
('aa0e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440007', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440006', '990e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440008', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440007', '990e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440009', 'cancelled'),
('aa0e8400-e29b-41d4-a716-446655440008', '990e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440010', 'confirmed'),
-- 2月第3週（現在）
('aa0e8400-e29b-41d4-a716-446655440009', '990e8400-e29b-41d4-a716-446655440011', '770e8400-e29b-41d4-a716-446655440003', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440010', '990e8400-e29b-41d4-a716-446655440011', '770e8400-e29b-41d4-a716-446655440004', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440011', '990e8400-e29b-41d4-a716-446655440012', '770e8400-e29b-41d4-a716-446655440005', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440012', '990e8400-e29b-41d4-a716-446655440013', '770e8400-e29b-41d4-a716-446655440006', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440013', '990e8400-e29b-41d4-a716-446655440014', '770e8400-e29b-41d4-a716-446655440007', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440014', '990e8400-e29b-41d4-a716-446655440015', '770e8400-e29b-41d4-a716-446655440008', 'confirmed'),
-- 2月第4週（予約受付中）
('aa0e8400-e29b-41d4-a716-446655440015', '990e8400-e29b-41d4-a716-446655440017', '770e8400-e29b-41d4-a716-446655440009', 'confirmed'),
('aa0e8400-e29b-41d4-a716-446655440016', '990e8400-e29b-41d4-a716-446655440018', '770e8400-e29b-41d4-a716-446655440010', 'confirmed');

-- Import user levels
INSERT INTO user_levels (id, user_id, level_id, achieved_date, instructor_comment) VALUES
('bb0e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '2024-01-15', 'プルークボーゲンが安定してきました。次はパラレルターンに挑戦しましょう。'),
('bb0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', '2024-01-20', 'パラレルターンの基本が身についています。カービングの練習を始めましょう。'),
('bb0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '2024-01-25', '不整地での滑走も安定しています。より高度な技術にチャレンジしていきましょう。'),
('bb0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', '2024-02-01', 'スキーの基本姿勢が身についてきました。'),
('bb0e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440001', '2024-02-05', 'カービングターンの基礎が理解できています。'),
('bb0e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', '2024-02-08', 'プルークボーゲンの練習を継続しましょう。');

-- Commit transaction
COMMIT; 
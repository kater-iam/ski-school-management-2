-- Start transaction
BEGIN;


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
('00000000-0000-0000-0000-000000000000', 'a96ea053-60dd-4c85-a099-a403b3533f55','authenticated', 'authenticated', 'admin@kater.jp', crypt('password123', gen_salt('bf')),    current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp), 
('670e8400-e29b-41d4-a716-446655440001', '670e8400-e29b-41d4-a716-446655440001', 'authenticated', 'authenticated', 'admin@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb, '{"role":"admin"}'::jsonb, current_timestamp, current_timestamp),
('880e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'authenticated', 'authenticated', 'instructor1@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('880e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'authenticated', 'authenticated', 'instructor2@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('880e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', 'authenticated', 'authenticated', 'instructor3@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('880e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', 'authenticated', 'authenticated', 'instructor4@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"instructor"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'authenticated', 'authenticated', 'student1@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', 'authenticated', 'authenticated', 'student2@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'authenticated', 'authenticated', 'student3@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', 'authenticated', 'authenticated', 'student4@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', 'authenticated', 'authenticated', 'student5@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440006', 'authenticated', 'authenticated', 'student6@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440007', 'authenticated', 'authenticated', 'student7@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440008', 'authenticated', 'authenticated', 'student8@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440009', 'authenticated', 'authenticated', 'student9@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp),
('770e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440010', 'authenticated', 'authenticated', 'student10@example.com', crypt('password123', gen_salt('bf')), current_timestamp, '', current_timestamp, '', current_timestamp, '', '', current_timestamp, current_timestamp, '{"provider":"email","providers":["email"],"role":"student"}'::jsonb, '{}'::jsonb, current_timestamp, current_timestamp);
      
-- Import profiles
INSERT INTO profiles (id, user_id, first_name, last_name, phone, emergency_contact, role)
VALUES
    ('880e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'インストラクター', '1', '090-2222-2221', '090-2222-2222', 'instructor'),
    ('880e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'インストラクター', '2', '090-2222-2223', '090-2222-2224', 'instructor'),
    ('880e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', 'インストラクター', '3', '090-2222-2225', '090-2222-2226', 'instructor'),
    ('880e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440004', 'インストラクター', '4', '090-2222-2227', '090-2222-2228', 'instructor'),
    ('770e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '生徒', '1', '090-1111-1111', '090-1111-1112', 'student'),
    ('770e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '生徒', '2', '090-1111-1113', '090-1111-1114', 'student'),
    ('770e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '生徒', '3', '090-1111-1115', '090-1111-1116', 'student'),
    ('770e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '生徒', '4', '090-1111-1117', '090-1111-1118', 'student'),
    ('770e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '生徒', '5', '090-1111-1119', '090-1111-1120', 'student'),
    ('770e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440006', '生徒', '6', '090-1111-1121', '090-1111-1122', 'student'),
    ('770e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440007', '生徒', '7', '090-1111-1123', '090-1111-1124', 'student'),
    ('770e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440008', '生徒', '8', '090-1111-1125', '090-1111-1126', 'student'),
    ('770e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440009', '生徒', '9', '090-1111-1127', '090-1111-1128', 'student'),
    ('770e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440010', '生徒', '10', '090-1111-1129', '090-1111-1130', 'student');


-- Import lessons
INSERT INTO lessons (id, name, description, duration, price, max_participants)
VALUES
    ('660e8400-e29b-41d4-a716-446655440000', 'スキー初心者レッスン', 'スキーの基本を学ぶ初心者向けレッスン', 120, 10000, 5),
    ('660e8400-e29b-41d4-a716-446655440001', 'スキー中級者レッスン', '中級者向けのスキーテクニックレッスン', 120, 12000, 5),
    ('660e8400-e29b-41d4-a716-446655440002', 'スキー上級者レッスン', '上級者向けの高度なスキーテクニックレッスン', 120, 15000, 4),
    ('660e8400-e29b-41d4-a716-446655440003', 'スノーボード初心者レッスン', 'スノーボードの基本を学ぶ初心者向けレッスン', 120, 10000, 5),
    ('660e8400-e29b-41d4-a716-446655440004', 'スノーボード中級者レッスン', '中級者向けのスノーボードテクニックレッスン', 120, 12000, 5),
    ('660e8400-e29b-41d4-a716-446655440005', 'スノーボード上級者レッスン', '上級者向けの高度なスノーボードテクニックレッスン', 120, 15000, 4);

-- Import lesson schedules and reservations for 2024-2035 winter seasons
DO $$
DECLARE
    lesson_id UUID;
    instructor_id UUID;
    current_lesson_date DATE;
    schedule_id UUID;
    counter INT := 1;
    year INT;
    month INT;
    day INT;
    student_user_id UUID;
    student_id UUID;
BEGIN
    -- 2024年から2035年までのループ
    FOR year IN 2024..2035 LOOP
        -- 12月から3月までのループ
        FOR month IN 12..12 LOOP
            current_lesson_date := make_date(year, month, 1);
            WHILE current_lesson_date < make_date(year + 1, 1, 1) LOOP
                -- 各日2コマのレッスンを作成
                -- 土日は4コマ、平日は1-2コマに調整
                FOR time_slot IN 0..(
                    CASE EXTRACT(DOW FROM current_lesson_date)
                        WHEN 0 THEN 3  -- 日曜日は4コマ
                        WHEN 6 THEN 3  -- 土曜日は4コマ
                        ELSE CASE WHEN random() < 0.3 THEN 0 ELSE 1 END  -- 平日は30%で1コマ、70%で2コマ
                    END
                ) LOOP
                    -- レッスンIDとインストラクターIDを設定
                    lesson_id := (
                        CASE (counter % 6)
                            WHEN 0 THEN '660e8400-e29b-41d4-a716-446655440000'
                            WHEN 1 THEN '660e8400-e29b-41d4-a716-446655440001'
                            WHEN 2 THEN '660e8400-e29b-41d4-a716-446655440002'
                            WHEN 3 THEN '660e8400-e29b-41d4-a716-446655440003'
                            WHEN 4 THEN '660e8400-e29b-41d4-a716-446655440004'
                            ELSE '660e8400-e29b-41d4-a716-446655440005'
                        END
                    )::UUID;
                    
                    instructor_id := (
                        CASE (counter % 4)
                            WHEN 0 THEN '880e8400-e29b-41d4-a716-446655440001'
                            WHEN 1 THEN '880e8400-e29b-41d4-a716-446655440002'
                            WHEN 2 THEN '880e8400-e29b-41d4-a716-446655440003'
                            ELSE '880e8400-e29b-41d4-a716-446655440004'
                        END
                    )::UUID;

                    -- レッスンスケジュールを挿入
                    INSERT INTO lesson_schedules (
                        id,
                        lesson_id,
                        instructor_id,
                        start_time,
                        end_time,
                        status
                    ) VALUES (
                        uuid_generate_v4(),
                        lesson_id,
                        instructor_id,
                        current_lesson_date + 
                        CASE 
                            WHEN time_slot = 0 THEN INTERVAL '10 hours'
                            WHEN time_slot = 1 THEN INTERVAL '13 hours'
                            WHEN time_slot = 2 THEN INTERVAL '15 hours'
                            ELSE INTERVAL '17 hours'
                        END,
                        current_lesson_date + 
                        CASE 
                            WHEN time_slot = 0 THEN INTERVAL '12 hours'
                            WHEN time_slot = 1 THEN INTERVAL '15 hours'
                            WHEN time_slot = 2 THEN INTERVAL '17 hours'
                            ELSE INTERVAL '19 hours'
                        END,
                        CASE 
                            WHEN current_lesson_date < CURRENT_DATE THEN 'closed'::lesson_schedule_status
                            ELSE 'open'::lesson_schedule_status
                        END
                    ) RETURNING id INTO schedule_id;

                    -- 予約データを作成（過去と未来で異なる確率とステータスを設定）
                    IF random() < (
                        CASE 
                            WHEN current_lesson_date < CURRENT_DATE THEN
                                -- 過去の予約の確率
                                CASE EXTRACT(DOW FROM current_lesson_date)
                                    WHEN 0 THEN 0.9  -- 日曜日は90%
                                    WHEN 6 THEN 0.8  -- 土曜日は80%
                                    WHEN 5 THEN 0.6  -- 金曜日は60%
                                    ELSE 0.3         -- その他平日は30%
                                END
                            ELSE
                                -- 未来の予約の確率（過去より少なめ）
                                CASE EXTRACT(DOW FROM current_lesson_date)
                                    WHEN 0 THEN 0.7  -- 日曜日は70%
                                    WHEN 6 THEN 0.6  -- 土曜日は60%
                                    WHEN 5 THEN 0.4  -- 金曜日は40%
                                    ELSE 0.2         -- その他平日は20%
                                END
                        END
                    ) THEN
                        -- ランダムな生徒を選択（土日は複数予約を許可）
                        FOR i IN 1..CASE 
                            WHEN EXTRACT(DOW FROM current_lesson_date) IN (0, 6) AND random() < 0.4 THEN 
                                CASE WHEN random() < 0.3 THEN 3  -- 30%の確率で3件の予約
                                     ELSE 2                      -- 70%の確率で2件の予約
                                END
                            ELSE 1
                        END LOOP
                            -- ランダムな生徒を選択（特定の生徒は頻繁に予約する傾向を持たせる）
                            SELECT id INTO student_user_id 
                            FROM profiles 
                            WHERE role = 'student' 
                            ORDER BY 
                                CASE 
                                    WHEN id IN ('770e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002') 
                                    AND random() < 0.4 THEN 0  -- 40%の確率で特定の生徒を優先
                                    ELSE random() 
                                END 
                            LIMIT 1;

                            -- student_idは同じプロフィールのIDを使用
                            SELECT student_user_id INTO student_id;

                            -- 予約ステータスを設定（過去と未来で異なるステータスを設定）
                            INSERT INTO reservations (
                                id,
                                lesson_schedule_id,
                                user_id,
                                student_profile_id,
                                status,
                                instructor_comment
                            ) VALUES (
                                uuid_generate_v4(),
                                schedule_id,
                                student_user_id,
                                student_id,
                                CASE 
                                    WHEN current_lesson_date < CURRENT_DATE THEN
                                        -- 過去の予約のステータス
                                        CASE 
                                            WHEN random() < 0.8 THEN '受講済'  -- 80%
                                            WHEN random() < 0.5 THEN 'キャンセル'  -- 10%
                                            ELSE '申し込み承認'  -- 10%
                                        END
                                    ELSE
                                        -- 未来の予約のステータス
                                        CASE 
                                            WHEN random() < 0.7 THEN '申し込み承認'  -- 70%
                                            WHEN random() < 0.8 THEN '申し込み'  -- 20%
                                            ELSE 'キャンセル'  -- 10%
                                        END
                                END::reservation_status,
                                CASE 
                                    WHEN current_lesson_date < CURRENT_DATE THEN
                                        -- 過去の予約のコメント
                                        CASE 
                                            WHEN random() < 0.2 THEN 'とても上達しています。次回はより難しい斜面に挑戦しましょう。基本的な姿勢が安定してきており、ターンの切り替えもスムーズです。'
                                            WHEN random() < 0.4 THEN '基本動作が安定してきました。引き続き練習を重ねましょう。特に内倒の意識を持って滑ることで、よりスムーズなターンができるようになるでしょう。'
                                            WHEN random() < 0.6 THEN 'ターンの切り替えがスムーズになってきました。次回は、より急な斜面でのスピードコントロールを練習していきましょう。'
                                            WHEN random() < 0.8 THEN 'スピードコントロールが上手くなってきています。ポジションの取り方も良くなってきました。次回は、不整地での滑りにも挑戦してみましょう。'
                                            ELSE '今日は天候が良く、絶好のレッスン日和でした。基本的な技術は着実に身についてきています。次回は、より実践的な総合滑降にチャレンジしてみましょう。'
                                        END
                                    ELSE
                                        NULL  -- 未来の予約にはコメントなし
                                END
                            );
                        END LOOP;
                    END IF;

                    -- インストラクタースケジュールを挿入
                    INSERT INTO instructor_schedules (
                        id,
                        instructor_id,
                        date,
                        start_time,
                        end_time
                    ) VALUES (
                        uuid_generate_v4(),
                        instructor_id,
                        current_lesson_date,
                        '09:00',
                        '19:00'  -- 終業時間を19:00に延長（土日の遅いコマに対応）
                    );

                    counter := counter + 1;
                END LOOP;
                current_lesson_date := current_lesson_date + INTERVAL '1 day';
            END LOOP;
        END LOOP;

        -- 1月から3月までのループ
        FOR month IN 1..3 LOOP
            current_lesson_date := make_date(year + 1, month, 1);
            WHILE current_lesson_date < make_date(year + 1, month + 1, 1) LOOP
                -- 各日2コマのレッスンを作成
                -- 土日は4コマ、平日は1-2コマに調整
                FOR time_slot IN 0..(
                    CASE EXTRACT(DOW FROM current_lesson_date)
                        WHEN 0 THEN 3  -- 日曜日は4コマ
                        WHEN 6 THEN 3  -- 土曜日は4コマ
                        ELSE CASE WHEN random() < 0.3 THEN 0 ELSE 1 END  -- 平日は30%で1コマ、70%で2コマ
                    END
                ) LOOP
                    -- レッスンIDとインストラクターIDを設定
                    lesson_id := (
                        CASE (counter % 6)
                            WHEN 0 THEN '660e8400-e29b-41d4-a716-446655440000'
                            WHEN 1 THEN '660e8400-e29b-41d4-a716-446655440001'
                            WHEN 2 THEN '660e8400-e29b-41d4-a716-446655440002'
                            WHEN 3 THEN '660e8400-e29b-41d4-a716-446655440003'
                            WHEN 4 THEN '660e8400-e29b-41d4-a716-446655440004'
                            ELSE '660e8400-e29b-41d4-a716-446655440005'
                        END
                    )::UUID;
                    
                    instructor_id := (
                        CASE (counter % 4)
                            WHEN 0 THEN '880e8400-e29b-41d4-a716-446655440001'
                            WHEN 1 THEN '880e8400-e29b-41d4-a716-446655440002'
                            WHEN 2 THEN '880e8400-e29b-41d4-a716-446655440003'
                            ELSE '880e8400-e29b-41d4-a716-446655440004'
                        END
                    )::UUID;

                    -- レッスンスケジュールを挿入
                    INSERT INTO lesson_schedules (
                        id,
                        lesson_id,
                        instructor_id,
                        start_time,
                        end_time,
                        status
                    ) VALUES (
                        uuid_generate_v4(),
                        lesson_id,
                        instructor_id,
                        current_lesson_date + 
                        CASE 
                            WHEN time_slot = 0 THEN INTERVAL '10 hours'
                            WHEN time_slot = 1 THEN INTERVAL '13 hours'
                            WHEN time_slot = 2 THEN INTERVAL '15 hours'
                            ELSE INTERVAL '17 hours'
                        END,
                        current_lesson_date + 
                        CASE 
                            WHEN time_slot = 0 THEN INTERVAL '12 hours'
                            WHEN time_slot = 1 THEN INTERVAL '15 hours'
                            WHEN time_slot = 2 THEN INTERVAL '17 hours'
                            ELSE INTERVAL '19 hours'
                        END,
                        CASE 
                            WHEN current_lesson_date < CURRENT_DATE THEN 'closed'::lesson_schedule_status
                            ELSE 'open'::lesson_schedule_status
                        END
                    ) RETURNING id INTO schedule_id;

                    -- 予約データを作成（過去と未来で異なる確率とステータスを設定）
                    IF random() < (
                        CASE 
                            WHEN current_lesson_date < CURRENT_DATE THEN
                                -- 過去の予約の確率
                                CASE EXTRACT(DOW FROM current_lesson_date)
                                    WHEN 0 THEN 0.9  -- 日曜日は90%
                                    WHEN 6 THEN 0.8  -- 土曜日は80%
                                    WHEN 5 THEN 0.6  -- 金曜日は60%
                                    ELSE 0.3         -- その他平日は30%
                                END
                            ELSE
                                -- 未来の予約の確率（過去より少なめ）
                                CASE EXTRACT(DOW FROM current_lesson_date)
                                    WHEN 0 THEN 0.7  -- 日曜日は70%
                                    WHEN 6 THEN 0.6  -- 土曜日は60%
                                    WHEN 5 THEN 0.4  -- 金曜日は40%
                                    ELSE 0.2         -- その他平日は20%
                                END
                        END
                    ) THEN
                        -- ランダムな生徒を選択（土日は複数予約を許可）
                        FOR i IN 1..CASE 
                            WHEN EXTRACT(DOW FROM current_lesson_date) IN (0, 6) AND random() < 0.4 THEN 
                                CASE WHEN random() < 0.3 THEN 3  -- 30%の確率で3件の予約
                                     ELSE 2                      -- 70%の確率で2件の予約
                                END
                            ELSE 1
                        END LOOP
                            -- ランダムな生徒を選択（特定の生徒は頻繁に予約する傾向を持たせる）
                            SELECT id INTO student_user_id 
                            FROM profiles 
                            WHERE role = 'student' 
                            ORDER BY 
                                CASE 
                                    WHEN id IN ('770e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002') 
                                    AND random() < 0.4 THEN 0  -- 40%の確率で特定の生徒を優先
                                    ELSE random() 
                                END 
                            LIMIT 1;

                            -- student_idは同じプロフィールのIDを使用
                            SELECT student_user_id INTO student_id;

                            -- 予約ステータスを設定（過去と未来で異なるステータスを設定）
                            INSERT INTO reservations (
                                id,
                                lesson_schedule_id,
                                user_id,
                                student_profile_id,
                                status,
                                instructor_comment
                            ) VALUES (
                                uuid_generate_v4(),
                                schedule_id,
                                student_user_id,
                                student_id,
                                CASE 
                                    WHEN current_lesson_date < CURRENT_DATE THEN
                                        -- 過去の予約のステータス
                                        CASE 
                                            WHEN random() < 0.8 THEN '受講済'  -- 80%
                                            WHEN random() < 0.5 THEN 'キャンセル'  -- 10%
                                            ELSE '申し込み承認'  -- 10%
                                        END
                                    ELSE
                                        -- 未来の予約のステータス
                                        CASE 
                                            WHEN random() < 0.7 THEN '申し込み承認'  -- 70%
                                            WHEN random() < 0.8 THEN '申し込み'  -- 20%
                                            ELSE 'キャンセル'  -- 10%
                                        END
                                END::reservation_status,
                                CASE 
                                    WHEN current_lesson_date < CURRENT_DATE THEN
                                        -- 過去の予約のコメント
                                        CASE 
                                            WHEN random() < 0.2 THEN 'とても上達しています。次回はより難しい斜面に挑戦しましょう。基本的な姿勢が安定してきており、ターンの切り替えもスムーズです。'
                                            WHEN random() < 0.4 THEN '基本動作が安定してきました。引き続き練習を重ねましょう。特に内倒の意識を持って滑ることで、よりスムーズなターンができるようになるでしょう。'
                                            WHEN random() < 0.6 THEN 'ターンの切り替えがスムーズになってきました。次回は、より急な斜面でのスピードコントロールを練習していきましょう。'
                                            WHEN random() < 0.8 THEN 'スピードコントロールが上手くなってきています。ポジションの取り方も良くなってきました。次回は、不整地での滑りにも挑戦してみましょう。'
                                            ELSE '今日は天候が良く、絶好のレッスン日和でした。基本的な技術は着実に身についてきています。次回は、より実践的な総合滑降にチャレンジしてみましょう。'
                                        END
                                    ELSE
                                        NULL  -- 未来の予約にはコメントなし
                                END
                            );
                        END LOOP;
                    END IF;

                    -- インストラクタースケジュールを挿入
                    INSERT INTO instructor_schedules (
                        id,
                        instructor_id,
                        date,
                        start_time,
                        end_time
                    ) VALUES (
                        uuid_generate_v4(),
                        instructor_id,
                        current_lesson_date,
                        '09:00',
                        '19:00'  -- 終業時間を19:00に延長（土日の遅いコマに対応）
                    );

                    counter := counter + 1;
                END LOOP;
                current_lesson_date := current_lesson_date + INTERVAL '1 day';
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

COMMIT; 
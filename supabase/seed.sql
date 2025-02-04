-- Start transaction
BEGIN;

-- Import users
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES
    ('770e8400-e29b-41d4-a716-446655440001', 'student1@example.com', '{"name": "生徒1"}'),
    ('770e8400-e29b-41d4-a716-446655440002', 'student2@example.com', '{"name": "生徒2"}'),
    ('770e8400-e29b-41d4-a716-446655440003', 'student3@example.com', '{"name": "生徒3"}'),
    ('770e8400-e29b-41d4-a716-446655440004', 'student4@example.com', '{"name": "生徒4"}'),
    ('770e8400-e29b-41d4-a716-446655440005', 'student5@example.com', '{"name": "生徒5"}'),
    ('770e8400-e29b-41d4-a716-446655440006', 'student6@example.com', '{"name": "生徒6"}'),
    ('770e8400-e29b-41d4-a716-446655440007', 'student7@example.com', '{"name": "生徒7"}'),
    ('770e8400-e29b-41d4-a716-446655440008', 'student8@example.com', '{"name": "生徒8"}'),
    ('770e8400-e29b-41d4-a716-446655440009', 'student9@example.com', '{"name": "生徒9"}'),
    ('770e8400-e29b-41d4-a716-446655440010', 'student10@example.com', '{"name": "生徒10"}'),
    ('880e8400-e29b-41d4-a716-446655440001', 'instructor1@example.com', '{"name": "インストラクター1"}'),
    ('880e8400-e29b-41d4-a716-446655440002', 'instructor2@example.com', '{"name": "インストラクター2"}'),
    ('880e8400-e29b-41d4-a716-446655440021', 'instructor3@example.com', '{"name": "インストラクター3"}'),
    ('880e8400-e29b-41d4-a716-446655440022', 'instructor4@example.com', '{"name": "インストラクター4"}');

-- Import profiles
INSERT INTO profiles (id, user_id, first_name, last_name, phone, emergency_contact, role)
VALUES
    ('770e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', '生徒', '1', '090-1111-1111', '090-1111-1112', 'student'),
    ('770e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '生徒', '2', '090-1111-1113', '090-1111-1114', 'student'),
    ('770e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', '生徒', '3', '090-1111-1115', '090-1111-1116', 'student'),
    ('770e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440004', '生徒', '4', '090-1111-1117', '090-1111-1118', 'student'),
    ('770e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440005', '生徒', '5', '090-1111-1119', '090-1111-1120', 'student'),
    ('770e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440006', '生徒', '6', '090-1111-1121', '090-1111-1122', 'student'),
    ('770e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440007', '生徒', '7', '090-1111-1123', '090-1111-1124', 'student'),
    ('770e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440008', '生徒', '8', '090-1111-1125', '090-1111-1126', 'student'),
    ('770e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440009', '生徒', '9', '090-1111-1127', '090-1111-1128', 'student'),
    ('770e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440010', '生徒', '10', '090-1111-1129', '090-1111-1130', 'student'),
    ('880e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'インストラクター', '1', '090-2222-2221', '090-2222-2222', 'instructor'),
    ('880e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'インストラクター', '2', '090-2222-2223', '090-2222-2224', 'instructor'),
    ('880e8400-e29b-41d4-a716-446655440021', '880e8400-e29b-41d4-a716-446655440021', 'インストラクター', '3', '090-2222-2225', '090-2222-2226', 'instructor'),
    ('880e8400-e29b-41d4-a716-446655440022', '880e8400-e29b-41d4-a716-446655440022', 'インストラクター', '4', '090-2222-2227', '090-2222-2228', 'instructor');

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
                FOR time_slot IN 0..1 LOOP
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
                            WHEN 2 THEN '880e8400-e29b-41d4-a716-446655440021'
                            ELSE '880e8400-e29b-41d4-a716-446655440022'
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
                        CASE WHEN time_slot = 0 THEN INTERVAL '10 hours' ELSE INTERVAL '13 hours' END,
                        current_lesson_date + 
                        CASE WHEN time_slot = 0 THEN INTERVAL '12 hours' ELSE INTERVAL '15 hours' END,
                        CASE 
                            WHEN current_lesson_date < CURRENT_DATE THEN 'closed'::lesson_schedule_status
                            ELSE 'open'::lesson_schedule_status
                        END
                    ) RETURNING id INTO schedule_id;

                    -- 過去の日付の場合は予約データも作成（50%の確率で予約あり）
                    IF current_lesson_date < CURRENT_DATE AND random() < 0.5 THEN
                        -- ランダムな生徒を選択
                        SELECT id INTO student_user_id FROM profiles WHERE role = 'student' ORDER BY random() LIMIT 1;
                        SELECT id INTO student_id FROM profiles WHERE role = 'student' ORDER BY random() LIMIT 1;

                        INSERT INTO reservations (
                            id,
                            lesson_schedule_id,
                            user_id,
                            student_id,
                            status,
                            instructor_comment
                        ) VALUES (
                            uuid_generate_v4(),
                            schedule_id,
                            student_user_id,
                            student_id,
                            '受講済'::reservation_status,
                            CASE (counter % 4)
                                WHEN 0 THEN 'とても上達しています。次回はより難しい斜面に挑戦しましょう。'
                                WHEN 1 THEN '基本動作が安定してきました。引き続き練習を重ねましょう。'
                                WHEN 2 THEN 'ターンの切り替えがスムーズになってきました。'
                                ELSE 'スピードコントロールが上手くなってきています。'
                            END
                        );
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
                        '17:00'
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
                FOR time_slot IN 0..1 LOOP
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
                            WHEN 2 THEN '880e8400-e29b-41d4-a716-446655440021'
                            ELSE '880e8400-e29b-41d4-a716-446655440022'
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
                        CASE WHEN time_slot = 0 THEN INTERVAL '10 hours' ELSE INTERVAL '13 hours' END,
                        current_lesson_date + 
                        CASE WHEN time_slot = 0 THEN INTERVAL '12 hours' ELSE INTERVAL '15 hours' END,
                        CASE 
                            WHEN current_lesson_date < CURRENT_DATE THEN 'closed'::lesson_schedule_status
                            ELSE 'open'::lesson_schedule_status
                        END
                    ) RETURNING id INTO schedule_id;

                    -- 過去の日付の場合は予約データも作成（50%の確率で予約あり）
                    IF current_lesson_date < CURRENT_DATE AND random() < 0.5 THEN
                        -- ランダムな生徒を選択
                        SELECT id INTO student_user_id FROM profiles WHERE role = 'student' ORDER BY random() LIMIT 1;
                        SELECT id INTO student_id FROM profiles WHERE role = 'student' ORDER BY random() LIMIT 1;

                        INSERT INTO reservations (
                            id,
                            lesson_schedule_id,
                            user_id,
                            student_id,
                            status,
                            instructor_comment
                        ) VALUES (
                            uuid_generate_v4(),
                            schedule_id,
                            student_user_id,
                            student_id,
                            '受講済'::reservation_status,
                            CASE (counter % 4)
                                WHEN 0 THEN 'とても上達しています。次回はより難しい斜面に挑戦しましょう。'
                                WHEN 1 THEN '基本動作が安定してきました。引き続き練習を重ねましょう。'
                                WHEN 2 THEN 'ターンの切り替えがスムーズになってきました。'
                                ELSE 'スピードコントロールが上手くなってきています。'
                            END
                        );
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
                        '17:00'
                    );

                    counter := counter + 1;
                END LOOP;
                current_lesson_date := current_lesson_date + INTERVAL '1 day';
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

COMMIT; 
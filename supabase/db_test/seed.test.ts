import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
)

describe('シードデータのテスト', () => {
  describe('ユーザー関連', () => {
    test('プロフィールを通じてユーザー数が正しいこと', async () => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
      expect(profiles?.length).toBe(6)
    })

    test('プロフィール情報が正しく作成されていること', async () => {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('id')

      expect(profiles?.length).toBe(6)
      
      if (profiles) {
        // 管理者のプロフィール
        expect(profiles[0]).toMatchObject({
          first_name: '管理者',
          last_name: '太郎',
          phone: '090-1111-1111',
          emergency_contact: '090-1111-1112'
        })

        // インストラクターのプロフィール
        expect(profiles[1]).toMatchObject({
          first_name: '山田',
          last_name: '一郎',
          phone: '090-2222-2221',
          emergency_contact: '090-2222-2222'
        })

        // 生徒のプロフィール
        expect(profiles[3]).toMatchObject({
          first_name: '佐藤',
          last_name: '花子',
          phone: '090-4444-4441',
          emergency_contact: '090-4444-4442'
        })
      }
    })
  })

  describe('レッスン関連', () => {
    test('レッスンレベルが正しく作成されていること', async () => {
      const { data: levels } = await supabase
        .from('lesson_levels')
        .select('*')
        .order('id')

      expect(levels?.length).toBe(3)
      
      if (levels) {
        expect(levels[0].name).toBe('初級')
        expect(levels[1].name).toBe('中級')
        expect(levels[2].name).toBe('上級')
      }
    })

    test('レッスンが正しく作成されていること', async () => {
      const { data: lessons } = await supabase
        .from('lessons')
        .select('*, lesson_levels(*)')
        .order('id')

      expect(lessons?.length).toBe(6)
      
      if (lessons) {
        // 初級レッスン
        expect(lessons[0]).toMatchObject({
          name: '初心者スキー教室',
          duration: 120,
          max_participants: 6
        })

        // 中級レッスン
        expect(lessons[2]).toMatchObject({
          name: 'カービングターン基礎',
          duration: 120,
          max_participants: 4
        })

        // 上級レッスン
        expect(lessons[4]).toMatchObject({
          name: '不整地レッスン',
          duration: 120,
          max_participants: 3
        })
      }
    })
  })

  describe('スケジュールと予約', () => {
    test('レッスンスケジュールが正しく作成されていること', async () => {
      const { data: schedules } = await supabase
        .from('lesson_schedules')
        .select('*, lessons(*)')
        .order('id')

      expect(schedules?.length).toBe(6)
      
      if (schedules) {
        expect(schedules[0]).toMatchObject({
          instructor_id: '770e8400-e29b-41d4-a716-446655440001',
          status: 'open'
        })
        expect(new Date(schedules[0].start_time)).toBeInstanceOf(Date)
        expect(new Date(schedules[0].end_time)).toBeInstanceOf(Date)
      }
    })

    test('予約が正しく作成されていること', async () => {
      const { data: reservations } = await supabase
        .from('reservations')
        .select('*, lesson_schedules(*)')
        .order('id')

      expect(reservations?.length).toBe(8)
      
      if (reservations) {
        expect(reservations).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              status: 'confirmed'
            })
          ])
        )
      }
    })
  })

  describe('ユーザーレベル', () => {
    test('ユーザーレベルが正しく作成されていること', async () => {
      const { data: userLevels } = await supabase
        .from('user_levels')
        .select('*, lesson_levels(*)')
        .order('id')

      expect(userLevels?.length).toBe(3)
      
      if (userLevels) {
        // 初級ユーザー
        expect(userLevels[0]).toMatchObject({
          user_id: '770e8400-e29b-41d4-a716-446655440003'
        })
        expect(userLevels[0].lesson_levels).toMatchObject({
          name: '初級'
        })

        // 中級ユーザー
        expect(userLevels[1]).toMatchObject({
          user_id: '770e8400-e29b-41d4-a716-446655440004'
        })
        expect(userLevels[1].lesson_levels).toMatchObject({
          name: '中級'
        })

        // 上級ユーザー
        expect(userLevels[2]).toMatchObject({
          user_id: '770e8400-e29b-41d4-a716-446655440005'
        })
        expect(userLevels[2].lesson_levels).toMatchObject({
          name: '上級'
        })
      }
    })
  })
}) 
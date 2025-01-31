// 管理者のプロファイル操作に関するテスト

import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
)

describe('管理者のプロファイル操作', () => {
  const adminId = '770e8400-e29b-41d4-a716-446655440000'
  const studentId = '770e8400-e29b-41d4-a716-446655440003'
  const newUserId = '770e8400-e29b-41d4-a716-446655440006' // 既存のユーザーID

  // 管理者としてのクライアント
  const adminClient = createClient<Database>(
    process.env.SUPABASE_URL || 'http://localhost:54321',
    process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.OXBO4nlx4ghG8yYALA3stXTMGKMxHk_M1T5eE-qjwb4',
    {
      auth: {
        persistSession: false
      }
    }
  )

  beforeEach(async () => {
    await adminClient.auth.signInWithPassword({
      email: 'admin@example.com',
      password: 'password123'
    })
  })

  test('管理者は新しいプロファイルを作成できること', async () => {
    const newProfile = {
      user_id: newUserId,
      first_name: 'テスト',
      last_name: '生徒',
      phone: '090-9999-9999',
      emergency_contact: '090-9999-9998',
      role: 'student'
    }

    const { data, error } = await adminClient
      .from('profiles')
      .insert(newProfile)
      .select()

    expect(error).toBeNull()
    expect(data?.[0]).toMatchObject(newProfile)

    // テストデータのクリーンアップ
    await supabase
      .from('profiles')
      .delete()
      .eq('user_id', newProfile.user_id)
  })

  test('管理者は他のユーザーのプロファイルを更新できること', async () => {
    const originalPhone = '090-4444-4441' // 元の電話番号を保存
    const updateData = {
      phone: '090-8888-8888'
    }

    const { data, error } = await adminClient
      .from('profiles')
      .update(updateData)
      .eq('user_id', studentId)
      .select()

    expect(error).toBeNull()
    expect(data?.[0].phone).toBe(updateData.phone)

    // 元の状態に戻す
    await supabase
      .from('profiles')
      .update({ phone: originalPhone })
      .eq('user_id', studentId)
  })

  test('管理者は他のユーザーのプロファイルを削除できること', async () => {
    // 削除用のテストプロファイルを作成
    const testProfile = {
      user_id: newUserId,
      first_name: '削除',
      last_name: 'テスト',
      phone: '090-7777-7777',
      emergency_contact: '090-7777-7776',
      role: 'student'
    }

    await supabase
      .from('profiles')
      .insert(testProfile)

    // 管理者として削除を実行
    const { error } = await adminClient
      .from('profiles')
      .delete()
      .eq('user_id', testProfile.user_id)

    expect(error).toBeNull()

    // 削除されたことを確認
    const { data: checkData } = await supabase
      .from('profiles')
      .select()
      .eq('user_id', testProfile.user_id)

    expect(checkData).toHaveLength(0)
  })
}) 

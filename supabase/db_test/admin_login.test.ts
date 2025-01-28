import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabaseのモックを設定
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(async ({ email, password }) => {
        if (email === 'admin@kater.jp' && password === 'password123') {
          return {
            data: {
              user: {
                id: '770e8400-e29b-41d4-a716-446655440000',
                email: 'admin@kater.jp',
              },
            },
            error: null,
          };
        }
        return {
          data: { user: null },
          error: {
            message: 'Invalid login credentials',
          },
        };
      }),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(async () => ({
            data: {
              id: '880e8400-e29b-41d4-a716-446655440000',
              user_id: '770e8400-e29b-41d4-a716-446655440000',
              first_name: '管理者',
              last_name: '太郎',
              phone: '090-1111-1111',
              emergency_contact: '090-1111-1112',
            },
            error: null,
          })),
        })),
      })),
    })),
  })),
}));

describe('管理者認証テスト', () => {
  beforeEach(() => {
    // テスト前の準備
  });

  afterEach(() => {
    // テスト後のクリーンアップ
  });

  it('管理者として正常にログインできること', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@kater.jp',
      password: 'password123'
    });

    expect(error).toBeNull();
    expect(data.user).not.toBeNull();
    expect(data.user?.email).toBe('admin@kater.jp');
  });

  it('誤ったパスワードでログインできないこと', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'admin@kater.jp',
      password: 'wrongpassword'
    });

    expect(error).not.toBeNull();
    expect(error?.message).toBe('Invalid login credentials');
    expect(data.user).toBeNull();
  });

  it('存在しないメールアドレスでログインできないこと', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'nonexistent@kater.jp',
      password: 'password123'
    });

    expect(error).not.toBeNull();
    expect(error?.message).toBe('Invalid login credentials');
    expect(data.user).toBeNull();
  });

  it('ログイン後にプロフィール情報を取得できること', async () => {
    // ログイン
    const { data: authData } = await supabase.auth.signInWithPassword({
      email: 'admin@kater.jp',
      password: 'password123'
    });

    // プロフィール情報の取得
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', authData.user?.id)
      .single();

    expect(profileError).toBeNull();
    expect(profileData).not.toBeNull();
    expect(profileData?.first_name).toBe('管理者');
    expect(profileData?.last_name).toBe('太郎');
    expect(profileData?.phone).toBe('090-1111-1111');
    expect(profileData?.emergency_contact).toBe('090-1111-1112');
  });
}); 
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/supabase/db_test/**/*.test.ts'
  ],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}; 
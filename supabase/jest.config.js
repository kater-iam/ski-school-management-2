module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/db_test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
} 
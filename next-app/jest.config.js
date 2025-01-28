module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/db_test/**/*.test.ts',
    '<rootDir>/db_test/**/*.test.tsx',
  ],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}; 

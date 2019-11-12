module.exports = {
  testMatch: ['<rootDir>/frontend/**/*.tests.ts?(x)'],
  moduleNameMapper: {
    '@api': '<rootDir>/frontend/api',
    '@salad-ui/(.*)': '<rootDir>/../components/packages/$1/src',
  },
};

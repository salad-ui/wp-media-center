module.exports = {
  testMatch: ['<rootDir>/app/**/*.tests.ts?(x)'],
  moduleNameMapper: {
    '@salad-ui/(.*)': '<rootDir>/../components/packages/$1/src',
  },
};

module.exports = {
  extends: ['@jameslnewell/eslint-config/react'],
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
  },
  overrides: [
    {
      files: ['*.tests.ts', '*.tests.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
      },
    },
  ],
};

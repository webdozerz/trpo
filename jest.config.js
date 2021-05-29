module.exports = {
  preset: '@nuxt/test-utils',
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};

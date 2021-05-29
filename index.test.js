import { setupTest, createPage } from '@nuxt/test-utils';

describe('browser type', () => {
  beforeEach(() => {
    jest.setTimeout(120000);
  });

  setupTest({
    fixture: 'fixtures/basic',
    browserOptions: {
      type: 'chromium',
    },
  });

  test('should be error if invalid browser type', () => {
    expect(createPage()).rejects.toEqual(new Error('Invalid browser \'foo\''));
  }, 120000);
});

import { setupTest, createPage } from '@nuxt/test-utils';

describe('browser type', () => {
  beforeEach((done) => {
    jest.setTimeout(200000);
    done();
  });

  setupTest({
    fixture: 'fixtures/basic',
    browserOptions: {
      type: 'chromium',
    },
  });

  test('should be error if invalid browser type', () => {
    expect(createPage()).rejects.toEqual(new Error('Invalid browser \'foo\''));
  }, 200000);
});

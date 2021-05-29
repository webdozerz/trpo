import { setupTest, createPage } from '@nuxt/test-utils';

describe('browser', () => {
  setupTest({
    fixture: 'fixtures/basic',
    browser: true,
    browserOptions: {
      type: 'chromium',
    },
  });

  test('should render page', async () => {
    const page = await createPage('/');
    const body = await page.innerHTML('body');
    expect(body).toContain('Works!');
  }, 100000);
});

describe('browser type', () => {
  beforeEach(() => {
    jest.setTimeout(100000);
  });

  setupTest({
    fixture: 'fixtures/basic',
    browserOptions: {
      type: 'chromium',
    },
  });

  test('should be error if invalid browser type', () => {
    expect(createPage()).rejects.toEqual(new Error('Invalid browser \'foo\''));
  });
});

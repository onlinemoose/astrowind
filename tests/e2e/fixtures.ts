import { test as base, Page } from '@playwright/test';

/**
 * Fixtures for common test utilities
 */
export const test = base.extend({
  /**
   * Utility to verify page loads without errors
   */
  pageLoadCheck: async ({ page }, use) => {
    await use(async (url: string) => {
      await page.goto(url);
      // Check for console errors
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      return errors;
    });
  },
});

export { expect } from '@playwright/test';

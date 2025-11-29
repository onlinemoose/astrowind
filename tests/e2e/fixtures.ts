import { test as base } from '@playwright/test';

/**
 * Re-export test and expect for use in test files
 */
export const test = base;

export { expect } from '@playwright/test';

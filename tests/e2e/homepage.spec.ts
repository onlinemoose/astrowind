import { test, expect } from './fixtures';

test.describe('Homepage', () => {
  test('should load homepage without errors', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*HomePage|AstroWind.*/);
  });

  test('should have visible header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('#header');
    await expect(header).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    await expect(nav).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('should render hero section', async ({ page }) => {
    await page.goto('/');
    // Look for common hero section patterns
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });
});

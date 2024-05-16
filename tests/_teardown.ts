import { test as teardown } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

teardown('do teardown and logout', async ({ page }) => {
  console.log('logging out');

  await page.goto('/');
  await page.context().clearCookies();
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());

  // persist auth logout to storage
  await page.context().storageState({ path: STORAGE_STATE });

  console.log('COMPLETED logging out');
});
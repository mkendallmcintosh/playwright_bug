import { test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('login to state sequencing', async ({ page }) => {
  console.log('logging in...');

  await page.goto('/');

  await page.waitForLoadState('networkidle');

  // save state for other tests
  await page.context().storageState({ path: STORAGE_STATE });
});
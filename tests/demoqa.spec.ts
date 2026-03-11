import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://demoqa.com/', {timeout: 2000});
  // timeout = navigation timeout
  

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/demositeee/);
});
test('has title1', async ({ page }) => {
  await page.goto('https://demoqa.com/', {timeout: 2000});
  // timeout = navigation timeout
  

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/demositeee/);
});
test('has title2', async ({ page }) => {
  await page.goto('https://demoqa.com/', {timeout: 2000});
  // timeout = navigation timeout
  

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/demositeee/);
});
test('has title3', async ({ page }) => {
  await page.goto('https://demoqa.com/', {timeout: 2000});
  // timeout = navigation timeout
  

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/demositeee/);
});
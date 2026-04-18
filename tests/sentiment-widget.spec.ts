import { test, expect } from '@playwright/test';

test.describe('Mini Sentiment Widget — E2E Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Clear localStorage so each test starts with a clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('page loads and shows the app title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /mini sentiment widget/i })
    ).toBeVisible();
  });

  test('Submit button is disabled on initial load', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeDisabled();
  });

  test('Submit button remains disabled when only a rating is selected', async ({ page }) => {
    // Click rating chip "4"
    await page.getByRole('button', { name: '4' }).click();
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeDisabled();
  });

  test('Submit button remains disabled when only a comment is entered', async ({ page }) => {
    await page.getByRole('textbox').fill('Some comment');
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeDisabled();
  });

  test('Submit button becomes enabled when both a rating and a comment are provided', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('textbox').fill('This is a test comment');
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeEnabled();
  });

  test('clicking a rating chip selects it and clicking again deselects it', async ({ page }) => {
    const chip = page.getByRole('button', { name: '2' });

    // Select
    await chip.click();
    // After selecting, submit is still disabled (no comment)
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeDisabled();

    // Deselect by clicking again
    await chip.click();
    // Still disabled (now no rating)
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeDisabled();
  });

  test('submitting shows a confirmation alert', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('textbox').fill('Fantastic!');

    let capturedMessage = '';
    page.once('dialog', async (dialog) => {
      capturedMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole('button', { name: /submit/i }).click();
    expect(capturedMessage).toBe('Thank you for your feedback.');
  });

  test('after submitting, the SummaryPanel appears with correct stats', async ({ page }) => {
    // Accept the alert so the page is not blocked
    page.on('dialog', (dialog) => dialog.accept());

    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('textbox').fill('Really enjoyed it');
    await page.getByRole('button', { name: /submit/i }).click();

    // SummaryPanel should now be visible
    await expect(
      page.getByRole('heading', { name: /summary/i })
    ).toBeVisible();
    await expect(page.getByText(/total submissions:\s*1/i)).toBeVisible();
    await expect(page.getByText(/average rating:\s*4/i)).toBeVisible();
  });

  test('submitted comment appears in the SummaryPanel', async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept());

    const uniqueComment = `E2E comment ${Date.now()}`;
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('textbox').fill(uniqueComment);
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText(uniqueComment)).toBeVisible();
  });

  test('theme toggle button switches label between Dark Mode and Light Mode', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /dark mode/i });
    await expect(toggleBtn).toBeVisible();

    await toggleBtn.click();
    await expect(
      page.getByRole('button', { name: /light mode/i })
    ).toBeVisible();
  });
});

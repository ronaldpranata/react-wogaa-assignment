import { test, expect } from '@playwright/test';

test.describe('TaskMaster Pro E2E Flow', () => {
  test('should allow user to add, toggle, and delete a task', async ({ page }) => {
    // 1. Visit the app
    await page.goto('/');
    
    // Check header
    await expect(page.getByRole('heading', { name: 'TaskMaster Pro' })).toBeVisible();

    const uniqueTaskName = `E2E Test Task ${Date.now()}`;

    // 2. Add a task
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill(uniqueTaskName);
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Verify it appears in the list
    const taskItem = page.locator('span').filter({ hasText: uniqueTaskName });
    await expect(taskItem).toBeVisible();

    // 3. Toggle the task (Checkbox)
    // Scoping to the specific task card
    const taskRow = page.locator('[class*="taskCard"]', { has: taskItem });
    const checkbox = taskRow.locator('input[type="checkbox"]');
    
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // 4. Delete the task
    const deleteButton = taskRow.getByRole('button', { name: 'Delete' });
    await deleteButton.click();

    // Verify it was removed globally
    await expect(taskItem).not.toBeVisible();
  });
});

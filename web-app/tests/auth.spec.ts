import { test, expect } from '@playwright/test';

test('should allow user to interact with the login fields', async ({ page }) => {
    // 1. ARRANGE: Navigate to the local development server
    await page.goto('http://localhost:3000');

    // 2. ACT: Locate the elements using test ids and simulate user interactions
    await page.getByTestId('username-input').fill('playwright_teste');
    await page.getByTestId('password-input').fill('secure_password_123');
    await page.getByTestId('login-button').click();

    // 3. ASSERT: Validate that the input values persist appropriately or match outcomes
    await expect(page.getByTestId('username-input')).toHaveValue('playwright_tester');
});

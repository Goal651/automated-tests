import { test, expect } from '@playwright/test';

test.describe('Login Flow Tests', () => {
    // Set timeout for all tests in this describe block
    test.describe.configure({ timeout: 45000 }); // 45 seconds

    test.beforeEach(async ({ page }) => {
        // Navigation with custom timeout
        await page.goto('http://localhost:3000', {
            timeout: 15000, // 15 seconds
            waitUntil: 'networkidle' // Wait for network to be idle
        });
    });

    test.describe('Login Page', () => {
        test('should display login page correctly', async ({ page }) => {
            // Individual test timeout
            test.setTimeout(30000); // Override for this test only

            await expect(page.getByTestId('login-title')).toHaveText('Sign In', {
                timeout: 5000 // Wait 5 seconds for text to appear
            });

            await expect(page.getByTestId('username-input')).toBeVisible({
                timeout: 3000
            });

            await expect(page.getByTestId('password-input')).toBeVisible({
                timeout: 3000
            });

            await expect(page.getByTestId('login-button')).toBeVisible({
                timeout: 3000
            });
        });

        test('should show error for empty fields', async ({ page }) => {
            // Click login without filling fields
            await page.getByTestId('login-button').click({
                timeout: 5000,
                force: true // Click even if not visible
            });

            // Wait for error with custom timeout
            await expect(page.getByTestId('error-message')).toHaveText(
                'Please enter both username and password',
                { timeout: 3000 }
            );
        });

        test('should login successfully with valid credentials', async ({ page }) => {
            // Fill with retry mechanism
            await page.getByTestId('username-input').fill('testuser', {
                timeout: 5000,
                force: true
            });

            await expect(page.getByTestId('username-input')).toHaveValue('testuser', {
                timeout: 2000
            });

            await page.getByTestId('password-input').fill('password123', {
                timeout: 5000
            });

            await expect(page.getByTestId('password-input')).toHaveValue('password123', {
                timeout: 2000
            });

            // Click and wait for navigation with timeout
            await Promise.all([
                page.waitForURL('**/dashboard', { timeout: 10000 }),
                page.getByTestId('login-button').click({ timeout: 5000 })
            ]);

            // Verify dashboard with timeout
            await expect(page.getByTestId('dashboard-title')).toHaveText('Dashboard', {
                timeout: 5000
            });
        });
    });

    test.describe('Dashboard Page', () => {
        // Set timeout for dashboard tests
        test.describe.configure({ timeout: 30000 });

        test.beforeEach(async ({ page }) => {
            // Login with timeout
            await page.getByTestId('username-input').fill('testuser');
            await page.getByTestId('password-input').fill('password123');

            await Promise.all([
                page.waitForURL('**/dashboard', { timeout: 10000 }),
                page.getByTestId('login-button').click()
            ]);
        });

        test('should show dashboard with user info', async ({ page }) => {
            await expect(page.getByTestId('dashboard-title')).toBeVisible({
                timeout: 5000
            });

            await expect(page.getByTestId('welcome-card')).toBeVisible({
                timeout: 3000
            });

            await expect(page.getByTestId('welcome-text')).toContainText('testuser', {
                timeout: 3000
            });

            await expect(page.getByTestId('logout-button')).toBeVisible({
                timeout: 3000
            });
        });

        test('should logout successfully', async ({ page }) => {
            await page.getByTestId('logout-button').click({
                timeout: 5000
            });

            // Wait for redirect with timeout
            await page.waitForURL('http://localhost:3000/', {
                timeout: 10000,
                waitUntil: 'networkidle'
            });

            await expect(page.getByTestId('login-title')).toBeVisible({
                timeout: 5000
            });
        });
    });

    test.describe('Navigation Protection', () => {
        test('should redirect to login if not authenticated', async ({ page }) => {
            // Clear localStorage before navigating
            await page.evaluate(() => localStorage.clear());

            // Navigate with custom timeout and wait until network idle
            await page.goto('http://localhost:3000/dashboard', {
                timeout: 20000,
                waitUntil: 'networkidle'
            });

            // Should redirect to login
            await page.waitForURL('http://localhost:3000/', {
                timeout: 15000,
                waitUntil: 'networkidle'
            });

            await expect(page.getByTestId('login-title')).toBeVisible({
                timeout: 5000
            });
        });
    });
});
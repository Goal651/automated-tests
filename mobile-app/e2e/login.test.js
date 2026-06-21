const { device, element, by, expect } = require('detox');

describe('Login Flow Tests', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    // Reload app to clean state before each test
    await device.reloadReactNative();
  });

  describe('Login Screen', () => {
    it('should display login screen', async () => {
      await expect(element(by.id('login-screen'))).toBeVisible();
      await expect(element(by.id('login-title'))).toHaveText('Login');
    });

    it('should show error for empty fields', async () => {
      await element(by.id('login-button')).tap();
      await expect(element(by.text('Error'))).toBeVisible();
      await expect(element(by.text('Please enter both email and password'))).toBeVisible();
      await element(by.text('OK')).tap();
    });

    it('should login successfully with valid credentials', async () => {
      // Type email
      await element(by.id('email-input')).typeText('test@example.com');
      await expect(element(by.id('email-input'))).toHaveText('test@example.com');
      
      // Type password
      await element(by.id('password-input')).typeText('password123');
      await expect(element(by.id('password-input'))).toHaveText('password123');
      
      // Tap login button
      await element(by.id('login-button')).tap();
      
      // Verify dashboard is shown
      await expect(element(by.id('dashboard-screen'))).toBeVisible();
      await expect(element(by.id('dashboard-title'))).toHaveText('Dashboard');
      await expect(element(by.id('welcome-text'))).toHaveText('Welcome back! 👋');
    });
  });

  describe('Dashboard Screen', () => {
    beforeEach(async () => {
      // Login first
      await element(by.id('email-input')).typeText('test@example.com');
      await element(by.id('password-input')).typeText('password123');
      await element(by.id('login-button')).tap();
      await expect(element(by.id('dashboard-screen'))).toBeVisible();
    });

    it('should show dashboard with user info', async () => {
      await expect(element(by.id('dashboard-title'))).toBeVisible();
      await expect(element(by.id('welcome-text'))).toBeVisible();
      await expect(element(by.id('logout-button'))).toBeVisible();
    });

    it('should logout successfully', async () => {
      await element(by.id('logout-button')).tap();
      
      // Should return to login screen
      await expect(element(by.id('login-screen'))).toBeVisible();
      await expect(element(by.id('login-title'))).toHaveText('Login');
    });
  });

  afterAll(async () => {
    await device.terminateApp();
  });
});
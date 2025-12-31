import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage and display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to /nl
    await expect(page).toHaveURL('/nl');
    
    // Check hero title
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /ontdek het programma/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /schrijf je direct in/i })).toBeVisible();
  });

  test('should display waitlist form', async ({ page }) => {
    await page.goto('/nl');
    
    // Scroll to waitlist form
    await page.getByRole('link', { name: /schrijf je direct in/i }).click();
    
    // Check form fields
    await expect(page.getByLabel(/naam/i)).toBeVisible();
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/opmerking/i)).toBeVisible();
    await expect(page.getByRole('checkbox')).toBeVisible();
  });

  test('should submit waitlist form successfully', async ({ page }) => {
    await page.goto('/nl');
    
    // Scroll to waitlist form
    await page.getByRole('link', { name: /schrijf je direct in/i }).click();
    
    // Fill form
    await page.getByLabel(/naam/i).fill('Test User');
    await page.getByLabel(/e-mail/i).fill('test@example.com');
    await page.getByLabel(/opmerking/i).fill('Test message');
    await page.getByRole('checkbox').check();
    
    // Submit form
    await page.getByRole('button', { name: /inschrijven/i }).click();
    
    // Check success message
    await expect(page.getByText(/je staat op de wachtlijst/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/nl');
    
    // Scroll to waitlist form
    await page.getByRole('link', { name: /schrijf je direct in/i }).click();
    
    // Submit empty form
    await page.getByRole('button', { name: /inschrijven/i }).click();
    
    // Check validation errors
    await expect(page.getByText(/naam is verplicht/i)).toBeVisible();
    await expect(page.getByText(/e-mail is verplicht/i)).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/nl');
    
    // Navigate to programma
    await page.getByRole('link', { name: /programma/i }).click();
    await expect(page).toHaveURL('/nl/programma');
    
    // Navigate to over ons
    await page.getByRole('link', { name: /over ons/i }).click();
    await expect(page).toHaveURL('/nl/over-ons');
    
    // Navigate to contact
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL('/nl/contact');
  });

  test('should switch language', async ({ page }) => {
    await page.goto('/nl');
    
    // Switch to English
    await page.getByRole('combobox').selectOption('en');
    await expect(page).toHaveURL('/en');
    
    // Switch back to Dutch
    await page.getByRole('combobox').selectOption('nl');
    await expect(page).toHaveURL('/nl');
  });
});

test.describe('Mobile', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/nl');
    
    // Check mobile menu
    await expect(page.getByRole('button', { name: /toggle menu/i })).toBeVisible();
    
    // Open mobile menu
    await page.getByRole('button', { name: /toggle menu/i }).click();
    
    // Check mobile navigation
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /programma/i })).toBeVisible();
  });
});


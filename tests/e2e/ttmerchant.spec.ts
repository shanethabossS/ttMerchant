import { test, expect } from '@playwright/test';

test('submit intake and verify lead appears in admin queue', async ({ page, request }) => {
  const stamp = Date.now();
  const email = `merchant.${stamp}@example.com`;
  const business = `Intake QA ${stamp}`;

  const nextBtn = () => page.getByRole('button', { name: 'Next', exact: true }).first();

  await page.goto('/start');

  await page.getByLabel('Full Name').fill('QA Merchant');
  await page.getByLabel('Business Name').fill(business);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Phone').fill('18681234567');
  await page.getByLabel('WhatsApp').fill('18681234567');
  await page.getByLabel('Password').fill('StrongPass123!');
  await nextBtn().click();

  await page.getByText('Online Storefront', { exact: true }).click();
  await nextBtn().click();

  await page.getByLabel('Business Category').fill('Retail');
  await page.getByLabel('Service Area').fill('Port of Spain');
  await page.getByLabel('Address').fill('1 Queen Street');
  await page.getByLabel('Opening Hours').fill('Mon-Fri 8am-5pm');
  await page.getByLabel('Preferred Contact (phone/email/whatsapp)').fill('whatsapp');
  await page.getByLabel('Business Description').fill('QA submission for intake flow validation.');
  await nextBtn().click();

  await nextBtn().click();
  await nextBtn().click();

  await page.getByRole('button', { name: /submit application/i }).click();
  await expect(page.getByText(/application submitted/i)).toBeVisible();

  const leadsRes = await request.get('/api/intake/leads');
  expect(leadsRes.ok()).toBeTruthy();
  const payload = await leadsRes.json();
  expect(JSON.stringify(payload)).toContain(business);
});

import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('I open the login page', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
});

Then('I should be redirected to the dashboard', async function () {
  const isDashboardVisible = await loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true); // Playwright's assertion
  await browser.close();
});

Then('I should see an error message', async function () {
  const errorMessage = await page.textContent('.errornote');
  expect(errorMessage).toContain('Please enter the correct username and password'); // Directly in the assertion
  await browser.close();
});

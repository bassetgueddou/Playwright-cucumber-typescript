import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://192.168.1.95:9091/admin/login/?next=/admin/');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('input[type="submit"]');
  }

  

  async isDashboardVisible(): Promise<boolean> {
    return await this.page.isVisible('#header');
  }
}

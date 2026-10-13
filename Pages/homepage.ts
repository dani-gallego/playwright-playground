
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './components/basepage';

export class HomePage extends BasePage {
  private readonly automobileTab: Locator;
  private readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    super(page);

    this.automobileTab = page.locator('#nav_automobile:visible');
    this.acceptCookiesButton = page.locator(
      'button#acceptAll:visible'
    );
  }

  async openHomePage(): Promise<void> {
    await this.navigate('https://sampleapp.tricentis.com/');
  }

  async acceptCookies(): Promise<void> {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }

  async selectVehicleTab(vehicleId: string): Promise<void> {
    await this.click(`#nav_${vehicleId}:visible`);
  }

  async waitForHomePage(): Promise<void> {
    await expect(this.automobileTab).toBeVisible();
  }

  async getHomePageTitle(): Promise<string> {
    return this.getPageTitle();
  }
}

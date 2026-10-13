
import {
  Page,
  Locator,
  expect,
} from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly defaultTimeout = 10000;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // Locator helpers
  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // Click actions
  async click(selector: string): Promise<void> {
    await this.getLocator(selector).click({
      timeout: this.defaultTimeout,
    });
  }

  async doubleClick(selector: string): Promise<void> {
    await this.getLocator(selector).dblclick();
  }

  // Text fields
  async fill(
    selector: string,
    value: string
  ): Promise<void> {
    await this.getLocator(selector).fill(value);
  }

  async clear(selector: string): Promise<void> {
    await this.getLocator(selector).clear();
  }

  async getText(selector: string): Promise<string> {
    return await this.getLocator(selector).innerText();
  }

  async getInputValue(selector: string): Promise<string> {
    return await this.getLocator(selector).inputValue();
  }

  // Dropdowns
  async selectOption(
    selector: string,
    value: string
  ): Promise<void> {
    await this.getLocator(selector).selectOption(value);
  }

  // Checkboxes and radio buttons
  async check(selector: string): Promise<void> {
    await this.getLocator(selector).check();
  }

  async uncheck(selector: string): Promise<void> {
    await this.getLocator(selector).uncheck();
  }

  // Element states
  async isVisible(selector: string): Promise<boolean> {
    return await this.getLocator(selector).isVisible();
  }

  async isEnabled(selector: string): Promise<boolean> {
    return await this.getLocator(selector).isEnabled();
  }

  async waitForLocator(target: string | Locator, timeout = this.defaultTimeout): Promise<void> {
  const locator = typeof target === 'string' ? this.getLocator(target) : target;
  await locator.waitFor({ state: 'visible', timeout });
}


  async waitForVisible(selector: string): Promise<void> {
    await this.getLocator(selector).waitFor({
      state: 'visible',
      timeout: this.defaultTimeout,
    });
  }

  // Assertions
  async expectVisible(selector: string): Promise<void> {
    await expect(this.getLocator(selector))
      .toBeVisible();
  }

  async expectText(
    selector: string,
    expectedText: string
  ): Promise<void> {
    await expect(this.getLocator(selector))
      .toHaveText(expectedText);
  }

  async expectUrl(expectedUrl: string): Promise<void> {
    await expect(this.page)
      .toHaveURL(expectedUrl);
  }

  // Browser utilities
  async takeScreenshot(path: string): Promise<void> {
    await this.page.screenshot({
      path,
      fullPage: true,
    });
  }

  // Dynamically handle the top menu button
  protected getVisibleButton(id: string): Locator {
    return this.page.locator(`#${id}:visible`);
  }
}

import { Page, Locator } from '@playwright/test';

export class NavigationButton {
  constructor(protected readonly page: Page) {}

  /**
   * Dynamically locates a visible button by ID.
   */
  protected getVisibleButton(id: string): Locator {
    return this.page.locator(`#${id}:visible`);
  }

  /**
   * Clicks a navigation button by ID.
   */
  async clickNextButton(buttonId: string): Promise<void> {
    await this.getVisibleButton(buttonId).click();
  }

  /**
   * Clicks a Previous button by ID.
   */
  async clickPreviousButton(buttonId: string): Promise<void> {
    await this.getVisibleButton(buttonId).click();
  }

  /**
   * Clicks a search button by ID.
   */

  async searchBar(buttonId : string ) : Promise <void>{
    await this.getVisibleButton(buttonId).click();
  }
}
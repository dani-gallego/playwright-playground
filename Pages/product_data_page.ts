
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './components/basepage';
import {
  Option,
  ProductDataInput,
} from '../BusinessMethods/product_data_methods';
import {
  selectAndVerify,
  typeAndVerify,
  waitForOptions,
} from './components/helper';
import { NavigationButton } from './components/navigation_buttons';

export class ProductDataPage extends BasePage {
  readonly startDateField: Locator;
  readonly insuranceSumField: Locator;
  readonly meritRatingField: Locator;
  readonly damageInsuranceField: Locator;
  readonly optionalProductInput: Record<Option, Locator>;
  readonly optionalProductLabel: Record<Option, Locator>;
  readonly courtesyCarField: Locator;

  private readonly navigationButton: NavigationButton;

  constructor(page: Page) {
    super(page);

    this.navigationButton = new NavigationButton(page);

    this.startDateField = page.getByRole('textbox', {
      name: 'MM/DD/YYYY',
    });
    this.insuranceSumField = page.locator('#insurancesum:visible');
    this.meritRatingField = page.locator('#meritrating:visible');
    this.damageInsuranceField = page.locator('#damageinsurance:visible');
    this.courtesyCarField = page.locator('#courtesycar:visible');

    this.optionalProductInput = {
      [Option.EUROPROTECTION]: page.locator('#EuroProtection'),
      [Option.LEGALDEFENSE]: page.locator('#LegalDefenseInsurance'),
    };

    this.optionalProductLabel = {
      [Option.EUROPROTECTION]: page.locator(
        'label:has(#EuroProtection)'
      ),
      [Option.LEGALDEFENSE]: page.locator(
        'label:has(#LegalDefenseInsurance)'
      ),
    };
  }

  async fillForm(data: ProductDataInput): Promise<void> {
    await expect(this.startDateField).toBeVisible();

    await typeAndVerify(this.startDateField, data.startdate);

    await selectAndVerify(this.insuranceSumField, data.insurancesum);
    await selectAndVerify(this.meritRatingField, data.meritrating);
    await selectAndVerify(
      this.damageInsuranceField,
      data.damageinsurance
    );
    await selectAndVerify(this.courtesyCarField, data.courtesycar);

    for (const option of data.optionalproduct) {
      const input = this.optionalProductInput[option];
      const label = this.optionalProductLabel[option];

      if (!(await input.isChecked())) {
        await label.click();
      }

      await expect(input).toBeChecked();
    }
  }

  async clickNextButton(buttonId: string): Promise<void> {
    await this.navigationButton.clickNextButton(buttonId);
  }

  async waitForPageToLoad(): Promise<void> {
    await expect(this.startDateField).toBeVisible();

    await waitForOptions(this.insuranceSumField);
    await waitForOptions(this.meritRatingField);
    await waitForOptions(this.damageInsuranceField);
    await waitForOptions(this.courtesyCarField);
  }
}
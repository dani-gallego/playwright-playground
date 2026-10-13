import { Page, Locator, expect } from '@playwright/test';
import { vehicleDataInput } from '../BusinessMethods/vehicle_data_methods';
import { BasePage } from './components/basepage';
import { NavigationButton } from './components/navigation_buttons';
import {
  fillAndVerify,
  typeAndVerify,
  selectAndVerify,
  waitForOptions,
} from './components/helper';

export class VehicleDataPage extends BasePage {
  readonly makeField: Locator;
  readonly enginePerfField: Locator;
  readonly dateOfManufactureField: Locator;
  readonly noOfSeatField: Locator;
  readonly fuelField: Locator;
  readonly listPriceField: Locator;
  readonly plateNumberField: Locator;
  readonly annualMileageField: Locator;
  private readonly navigationButton: NavigationButton;

  constructor(page: Page) {
    super(page);

    this.navigationButton = new NavigationButton(page);

    this.makeField = page.locator('#make:visible');
    this.enginePerfField = page.locator('#engineperformance:visible');
    this.dateOfManufactureField = page.locator('#dateofmanufacture:visible');
    this.noOfSeatField = page.locator('#numberofseats:visible');
    this.fuelField = page.locator('#fuel:visible');
    this.listPriceField = page.locator('#listprice:visible');
    this.plateNumberField = page.locator('#licenseplatenumber:visible');
    this.annualMileageField = page.locator('#annualmileage:visible');
  }

  async waitForPageToLoad(): Promise<void> {
    await expect(this.makeField).toBeVisible();
    await waitForOptions(this.makeField);
  }

  /**
   * Fills out the Vehicle Data form, verifying each value sticks
   */
  async fillForm(data: vehicleDataInput): Promise<void> {
    await this.waitForPageToLoad();

    await this.page.waitForTimeout(5000);

    await selectAndVerify(this.makeField, data.make);
    await fillAndVerify(this.enginePerfField, data.engineperformance);
    await typeAndVerify(this.dateOfManufactureField, data.dateofmanufacture);
    await selectAndVerify(this.noOfSeatField, data.numberofseats);
    await selectAndVerify(this.fuelField, data.fuel);
    await fillAndVerify(this.listPriceField, data.listprice);
    await fillAndVerify(this.plateNumberField, data.licenseplatenumber);
    await fillAndVerify(this.annualMileageField, data.annualmileage);
  }

  async clickNextButton(buttonId: string): Promise<void> {
    await this.navigationButton.clickNextButton(buttonId);
  }
}
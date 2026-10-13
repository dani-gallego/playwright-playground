import { expect, test } from '@playwright/test';
import { HomePage } from '../Pages/homepage';
import { VehicleDataPage } from '../Pages/vehicle_data_page';
import { InsurantDataPage } from '../Pages/insurant_data_page';
import { TestDataLoader } from '../Utility/TestDataLoader';
import { expectZeroInvalid, expectCounterZero } from '../Pages/components/data_counter';
import { ProductDataPage } from '../Pages/product_data_page';

const vehicle = TestDataLoader.loadVehicleData()[0];
const insurant = TestDataLoader.loadInsurantData()[0];
const product = TestDataLoader.loadProductData()[0];

test('should complete automobile workflow using the first CSV row', async ({ page }) => {
  const homePage = new HomePage(page);
  const vehiclePage = new VehicleDataPage(page);
  const insurantPage = new InsurantDataPage(page);
  const scope = page.locator('section.idealsteps-step:visible');
  const productPage = new ProductDataPage(page)

  await homePage.openHomePage();
  await homePage.selectVehicleTab('automobile');

  await vehiclePage.waitForPageToLoad();
  await test.step('Fill vehicle data from CSV', async () => {
    await vehiclePage.fillForm(vehicle);
    await page.keyboard.press('Tab'); // move focus off the last field so it validates
  });

  await test.step('Validate: 0 invalid fields', async () => {
    await expectZeroInvalid(scope);
  });

  await test.step('Counter is 0', async () => {
    await expectCounterZero(page, '#entervehicledata');
  });

  await test.step('Next: Insurant Data', async () => {
    await vehiclePage.clickNextButton('nextenterinsurantdata');
  });

  await insurantPage.waitForPageToLoad();
  await test.step('Fill insurant data from CSV', async () => {
    await insurantPage.fillForm(insurant);
    await page.keyboard.press('Tab'); // move focus off the last field so it validates
  });

  await test.step('Validate: 0 invalid fields', async () => {
    await expectZeroInvalid(scope);
  });

  await test.step('Counter is 0', async () => {
    await expectCounterZero(page, '#enterinsurantdata');
  });

  await test.step('Next: Product Data', async () => {
    await vehiclePage.clickNextButton('nextenterproductdata');
  });

  await productPage.waitForPageToLoad()
  await test.step('Fill product data from CSV', async () => {
    await productPage.fillForm(product);
  });

    await test.step('Validate: 0 invalid fields', async () => {
    await expectZeroInvalid(scope);
  });

  await test.step('Counter is 0', async () => {
    await expectCounterZero(page, '#enterinsurantdata');
  });

  // Continue with Price Option, and Quote pages.
});
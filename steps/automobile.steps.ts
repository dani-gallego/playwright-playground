import { expect } from '@playwright/test';
import { Given, When, Then, STEP_ORDER, StepName } from './fixtures';


Given('the user is on the automobile insurance form', async ({ homePage, vehiclePage }) => {
  await homePage.openHomePage();
  await homePage.selectVehicleTab('automobile');
  await vehiclePage.waitForPageToLoad();
});

Given('the user has valid vehicle, insurant and product details', async () => {
  // Data is loaded from the first CSV row in fixtures.ts; fail early if a file is empty.
  const { TestDataLoader } = await import('../Utility/TestDataLoader');
  expect(TestDataLoader.loadVehicleData()[0]).toBeDefined();
  expect(TestDataLoader.loadInsurantData()[0]).toBeDefined();
  expect(TestDataLoader.loadProductData()[0]).toBeDefined();
});

Given('the user has completed all steps before the {string} step', async ({ wizard }, step: string) => {
  await wizard.completeBefore(step as StepName);
});

When('the user enters valid details on the {string} step', async ({ wizard }, step: string) => {
  await wizard.fill(step as StepName);
});

When('the user submits the vehicle, insurant and product steps in order', async ({ wizard }) => {
  for (const step of STEP_ORDER) {
    await wizard.waitFor(step);
    await wizard.fill(step);
    if (step !== 'product') await wizard.next(step);
  }
});

Then('no validation errors are shown on the {string} step', async ({ wizard }, step: string) => {
  await wizard.assertNoErrors(step as StepName);
});

Then('no validation errors are shown on any step', async ({ wizard }) => {
  await wizard.assertNoErrors('product'); // visible section + product counter
  await wizard.assertCounterZero('vehicle');
  await wizard.assertCounterZero('insurant');
});
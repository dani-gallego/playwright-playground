import { test as base, createBdd } from 'playwright-bdd';
import { HomePage } from '../Pages/homepage';
import { VehicleDataPage } from '../Pages/vehicle_data_page';
import { InsurantDataPage } from '../Pages/insurant_data_page';
import { ProductDataPage } from '../Pages/product_data_page';
import { TestDataLoader } from '../Utility/TestDataLoader';
import { expectZeroInvalid, expectCounterZero } from '../Pages/components/data_counter';


export type StepName = 'vehicle' | 'insurant' | 'product';
export const STEP_ORDER: StepName[] = ['vehicle', 'insurant', 'product'];

const vehicle = TestDataLoader.loadVehicleData()[0];
const insurant = TestDataLoader.loadInsurantData()[0];
const product = TestDataLoader.loadProductData()[0];

type Fixtures = {
  homePage: HomePage;
  vehiclePage: VehicleDataPage;
  wizard: {
    waitFor(step: StepName): Promise<void>;
    fill(step: StepName): Promise<void>;
    next(from: StepName): Promise<void>;
    completeBefore(step: StepName): Promise<void>;
    assertNoErrors(step: StepName): Promise<void>;
    assertCounterZero(step: StepName): Promise<void>;
  };
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  vehiclePage: async ({ page }, use) => use(new VehicleDataPage(page)),

  wizard: async ({ page, vehiclePage }, use) => {
    const insurantPage = new InsurantDataPage(page);
    const productPage = new ProductDataPage(page);
    const scope = page.locator('section.idealsteps-step:visible');

    const wizard: Fixtures['wizard'] = {
      async waitFor(step) {
        if (step === 'vehicle') await vehiclePage.waitForPageToLoad();
        if (step === 'insurant') await insurantPage.waitForPageToLoad();
        if (step === 'product') await productPage.waitForPageToLoad();
      },
      async fill(step) {
        if (step === 'vehicle') await vehiclePage.fillForm(vehicle);
        if (step === 'insurant') await insurantPage.fillForm(insurant);
        if (step === 'product') await productPage.fillForm(product);
        await page.keyboard.press('Tab'); // move focus off the last field so it validates
      },
      async next(from) {
        const nextId = from === 'vehicle' ? 'nextenterinsurantdata' : 'nextenterproductdata';
        await vehiclePage.clickNextButton(nextId);
      },

      /**
       * 
       * completeBefore(step):
        STEP_ORDER.indexOf(step) is the step’s position, e.g. 2 for product.
        .slice(0, 2) takes the steps before it: ['vehicle', 'insurant'].
        For each one it waits for the page, fills it, and clicks Next.
        At the end it waits for the target page to load, so the scenario starts there.
        It calls wizard.waitFor etc. (not this) because wizard is the object being defined.
       */
      
      async completeBefore(step) {
        for (const s of STEP_ORDER.slice(0, STEP_ORDER.indexOf(step))) {
          await wizard.waitFor(s);
          await wizard.fill(s);
          await wizard.next(s);
        }
        await wizard.waitFor(step);
      },
      async assertNoErrors(step) {
        await expectZeroInvalid(scope);
        await wizard.assertCounterZero(step);
      },
      async assertCounterZero(step) {
        await expectCounterZero(page, `#enter${step}data`);
      },
    };
    await use(wizard);
  },
});

export const { Given, When, Then } = createBdd(test);
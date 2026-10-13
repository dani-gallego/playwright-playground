import { Page, Locator, expect } from '@playwright/test';

/** Tab counter must be 0, e.g. '#entervehicledata'. */
export async function expectCounterZero(page: Page, tabSelector: string) {
  await expect(page.locator(tabSelector)).toContainText('0');
}

/** Stricter: matches exactly 0 (so 10, 20, etc. fail). */
export async function expectCounterExactlyZero(page: Page, tabSelector: string) {
  await expect(page.locator(tabSelector).locator('.counter')).toHaveText('0');
}

/** Lists fields that are not valid, useful for debugging a failure. */
export async function getInvalidFields(scope: Locator): Promise<string[]> {
  const fields = await scope.locator('.field.idealforms-field:not(.valid)').all();
  return Promise.all(
    fields.map(async (f, i) => {
      const control = f.locator('select, input, textarea').first();
      return (
        (await control.getAttribute('name')) ??
        (await control.getAttribute('id')) ??
        (await f.locator('label.main').innerText()).trim() ??
        `field #${i}`
      );
    }),
  );
}

/** Fails with the names of any fields not marked valid. */
export async function expectZeroInvalid(scope: Locator) {
  const names = await getInvalidFields(scope);
  expect(
    names,
    `Expected 0 invalid fields but found ${names.length}: ${names.join(', ')}`,
  ).toHaveLength(0);
}
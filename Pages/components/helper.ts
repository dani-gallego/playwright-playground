import { Locator, expect } from '@playwright/test';

export interface FieldOptions {
  /** Max time (ms) to wait for the value to stick. */
  timeout?: number;
  /** Press Tab after entering the value to blur the field and commit it. */
  blur?: boolean;
}
 
const DEFAULT_TIMEOUT = 10_000;
 
/**
 * Wait until a <select> has real options (more than the placeholder).
 * Useful when options are populated asynchronously.
 */
export async function waitForOptions(
  select: Locator,
  minCount = 2,
  timeout = DEFAULT_TIMEOUT
): Promise<void> {
  await expect(select).toBeVisible({ timeout });
  await expect
    .poll(async () => select.locator('option').count(), { timeout })
    .toBeGreaterThanOrEqual(minCount);
}
 
/**
 * Fill a text input, then confirm the value stuck.
 * If the app clears or overwrites it, retry the whole fill.
 */
export async function fillAndVerify(
  field: Locator,
  value: string | number,
  { timeout = DEFAULT_TIMEOUT, blur = false }: FieldOptions = {}
): Promise<void> {
  const expected = String(value);
 
  await expect(async () => {
    await field.fill(expected);
    if (blur) await field.press('Tab');
    await expect(field).toHaveValue(expected, { timeout: 1_000 });
  }).toPass({ timeout });
}
 
/**
 * Type into a masked/formatted input key by key (dates, prices, etc.),
 * then confirm the value stuck. Use when fill() doesn't trigger the mask.
 *
 * Pass `expectedValue` if the mask changes how the value is displayed
 * (e.g. typed "1500" shows as "1,500").
 */
export async function typeAndVerify(
  field: Locator,
  value: string | number,
  {
    timeout = DEFAULT_TIMEOUT,
    blur = true,
    expectedValue,
    delay = 50,
  }: FieldOptions & { expectedValue?: string; delay?: number } = {}
): Promise<void> {
  const typed = String(value);
  const expected = expectedValue ?? typed;
 
  await expect(async () => {
    await field.click();
    await field.clear();
    await field.pressSequentially(typed, { delay });
    if (blur) await field.press('Tab');
    await expect(field).toHaveValue(expected, { timeout: 1_000 });
  }).toPass({ timeout });
}
 
/**
 * Select a dropdown option, then confirm it stuck.
 * Waits for options to load first. `value` can be the option's value
 * or its visible label.
 */
export async function selectAndVerify(
  select: Locator,
  value: string | number,
  { timeout = DEFAULT_TIMEOUT }: FieldOptions = {}
): Promise<void> {
  const expected = String(value);
 
  await waitForOptions(select, 2, timeout);
 
  await expect(async () => {
    await select.selectOption(expected);
    // Compare against the selected option's value OR label, since callers
    // may pass either.
    const selected = await select.evaluate((el: HTMLSelectElement) => ({
      value: el.value,
      label: el.selectedOptions[0]?.label ?? '',
    }));
    expect([selected.value, selected.label]).toContain(expected);
  }).toPass({ timeout });
}
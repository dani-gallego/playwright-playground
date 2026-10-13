
import { Page, Locator, expect } from '@playwright/test';
import {
  InsurantDataInput,
  Gender,
  Hobby,
} from '../BusinessMethods/insurant_data_methods';
import { BasePage } from './components/basepage';

export class InsurantDataPage extends BasePage {
  readonly page: Page;

  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly dateOfBirthField: Locator;
  readonly streetAddressField: Locator;
  readonly countryField: Locator;
  readonly zipCodeField: Locator;
  readonly cityField: Locator;
  readonly occupationField: Locator;
  readonly websiteField: Locator;
  readonly pictureField: Locator;
  readonly genderInput: Record<Gender, Locator>;
  readonly genderLabel: Record<Gender, Locator>;
  readonly hobbyInput: Record<Hobby, Locator>;
  readonly hobbyLabel: Record<Hobby, Locator>;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.firstNameField = page.locator('#firstname:visible');
    this.lastNameField = page.locator('#lastname:visible');
    this.dateOfBirthField = page.locator('#birthdate:visible');
    this.streetAddressField = page.locator('#streetaddress:visible');
    this.countryField = page.locator('#country:visible');
    this.zipCodeField = page.locator('#zipcode:visible');
    this.cityField = page.locator('#city:visible');
    this.occupationField = page.locator('#occupation:visible');

    // in constructor (note: no :visible on the inputs)
    this.genderInput = {
      [Gender.MALE]: page.locator('#gendermale'),
      [Gender.FEMALE]: page.locator('#genderfemale'),
    };
    this.genderLabel = {
      [Gender.MALE]: page.locator('label:has(#gendermale)'),
      [Gender.FEMALE]: page.locator('label:has(#genderfemale)'),
    };

    this.hobbyInput = {
      [Hobby.SPEEDING]: page.locator('#speeding'),
      [Hobby.BUNGEE_JUMPING]: page.locator('#bungeejumping'),
      [Hobby.CLIFF_DIVING]: page.locator('#cliffdiving'),
      [Hobby.SKYDIVING]: page.locator('#skydiving'),
      [Hobby.OTHER]: page.locator('#other'),
    };
    this.hobbyLabel = {
      [Hobby.SPEEDING]: page.locator('label:has(#speeding)'),
      [Hobby.BUNGEE_JUMPING]: page.locator('label:has(#bungeejumping)'),
      [Hobby.CLIFF_DIVING]: page.locator('label:has(#cliffdiving)'),
      [Hobby.SKYDIVING]: page.locator('label:has(#skydiving)'),
      [Hobby.OTHER]: page.locator('label:has(#other)'),
    };

    this.websiteField = page.locator('#website:visible');
    this.pictureField = page.locator('#picture:visible');
  }

  async waitForPageToLoad(): Promise<void> {
    await expect(this.firstNameField).toBeVisible();
  }

  async fillForm(data: InsurantDataInput): Promise<void> {
    await this.firstNameField.fill(data.firstname);
    await this.lastNameField.fill(data.lastname);
    await this.dateOfBirthField.fill(data.birthdate);

    await this.genderLabel[data.gender].click();
    await expect(this.genderInput[data.gender]).toBeChecked();

    for (const hobby of data.hobby) {
      await this.hobbyLabel[hobby].click();
      await expect(this.hobbyInput[hobby]).toBeChecked();
}

    await this.streetAddressField.fill(data.streetaddress);
    await this.countryField.selectOption({
      label: data.country,
    });
    await this.zipCodeField.fill(String(data.zipcode));
    await this.cityField.fill(data.city);
    await this.occupationField.selectOption({
      label: data.occupation,
    });

    await this.websiteField.fill(data.website);
    await this.pictureField.fill(data.picture);
  }
}

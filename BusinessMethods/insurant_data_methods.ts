import { Page, Locator, expect } from '@playwright/test';


export interface InsurantDataInput {
  firstname: string;
  lastname: string;
  birthdate: string;
  streetaddress: string;
  country: string;
  zipcode: number;
  city: string;
  occupation: string;
  website: string;
  picture: string;
  gender: Gender;
  hobby: Hobby[];
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum Hobby {
  SPEEDING = 'Speeding',
  BUNGEE_JUMPING = 'Bungee Jumping',
  CLIFF_DIVING = 'Cliff Diving',
  SKYDIVING = 'Skydiving',
  OTHER = 'Other',
}
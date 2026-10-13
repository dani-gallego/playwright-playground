import { Page, Locator, expect } from '@playwright/test';

export interface vehicleDataInput {
  make: string;
  engineperformance: number | string;
  dateofmanufacture: string;
  numberofseats: string;
  fuel: string;
  listprice: number | string;
  licenseplatenumber: number | string;
  annualmileage: number | string;
}
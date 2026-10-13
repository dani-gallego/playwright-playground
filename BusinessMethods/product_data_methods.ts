import { Page, Locator, expect } from '@playwright/test';


export interface ProductDataInput {
    startdate : number | string;
    insurancesum : string;
    meritrating : string;
    damageinsurance :  string;
    optionalproduct :  Option[];
    courtesycar : string;

}

export enum Option {
    EUROPROTECTION = 'Euro Protection',
    LEGALDEFENSE = 'Legal Defense Insurance'
}
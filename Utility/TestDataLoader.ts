import path from 'node:path';

import { CSVReader } from './CSVReader';
import { vehicleDataInput } from '../BusinessMethods/vehicle_data_methods';
import { InsurantDataInput, Gender, Hobby } from '../BusinessMethods/insurant_data_methods';
import { ProductDataInput, Option } from '../BusinessMethods/product_data_methods';

export class TestDataLoader {
  private static getDataFile(fileName: string): string {
    return path.resolve(process.cwd(), 'Data', fileName);
  }

  private static parseNumber(
    value: string,
    field: string,
    rowNumber: number
  ): number {
    if (value.trim() === '') {
      throw new Error(
        `[TestDataLoader] ${field} is empty at CSV row ${rowNumber}.`
      );
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      throw new Error(
        `[TestDataLoader] Invalid ${field} at CSV row ${rowNumber}: "${value}".`
      );
    }

    return number;
  }

  static loadVehicleData(): vehicleDataInput[] {
    const filePath = this.getDataFile('vehicle_data.csv');
    const rows = CSVReader.readCSV(filePath);

    CSVReader.validateHeaders(
      rows,
      [
        'Make',
        'EnginePerformance',
        'DateOfManufacture',
        'NumberOfSeats',
        'FuelType',
        'ListPrice',
        'LicensePlateNumber',
        'AnnualMileage',
      ],
      filePath
    );

    return rows.map((row, index) => {
      const rowNumber = index + 2;

      return {
        make: row.Make,
        engineperformance: this.parseNumber(
          row.EnginePerformance,
          'EnginePerformance',
          rowNumber
        ),
        dateofmanufacture: row.DateOfManufacture,
        numberofseats: row.NumberOfSeats,
        fuel: row.FuelType,
        listprice: this.parseNumber(row.ListPrice, 'ListPrice', rowNumber),
        licenseplatenumber: row.LicensePlateNumber,
        annualmileage: this.parseNumber(
          row.AnnualMileage,
          'AnnualMileage',
          rowNumber
        ),
      };
    });
  }

  static loadInsurantData(): InsurantDataInput[] {
    const filePath = this.getDataFile('insurant_data.csv');
    const rows = CSVReader.readCSV(filePath);

    CSVReader.validateHeaders(
      rows,
      [
        'FirstName',
        'LastName',
        'BirthDate',
        'StreetAddress',
        'Country',
        'ZipCode',
        'City',
        'Occupation',
        'Website',
        'Picture',
        'Gender',
        'Hobby',
      ],
      filePath
    );

    return rows.map((row, index): InsurantDataInput => {
      const rowNumber = index + 2;

      // Case-insensitive Gender validation & mapping
      const rawGender = (row.Gender || '').trim();
      const gender = Object.values(Gender).find(
        (validGender) => validGender.toLowerCase() === rawGender.toLowerCase()
      );

      if (!gender) {
        throw new Error(
          `[TestDataLoader] Invalid Gender at CSV row ${rowNumber}: "${row.Gender}".`
        );
      }

      // Strip surrounding quotes and split multiple hobbies cleanly (supports commas, semicolons, and pipes)
      const rawHobbyString = (row.Hobby || '').replace(/^["']|["']$/g, '').trim();

      const validHobbies = rawHobbyString
        .split(/[,，;；|]+/)
        .map((value) => value.trim())
        .filter(Boolean)
        .map((value): Hobby => {
          const hobby = Object.values(Hobby).find(
            (validHobby) => validHobby.toLowerCase() === value.toLowerCase()
          );

          if (!hobby) {
            throw new Error(
              `[TestDataLoader] Invalid Hobby at CSV row ${rowNumber}: "${value}".`
            );
          }

          return hobby;
        });

      return {
        firstname: row.FirstName,
        lastname: row.LastName,
        birthdate: row.BirthDate,
        streetaddress: row.StreetAddress,
        country: row.Country,
        zipcode: this.parseNumber(row.ZipCode, 'ZipCode', rowNumber),
        city: row.City,
        occupation: row.Occupation,
        website: row.Website,
        picture: row.Picture,
        gender,
        hobby: validHobbies,
      };
    });
  }

static loadProductData(): ProductDataInput[] {
  const filePath = this.getDataFile('product_data.csv');
  const rows = CSVReader.readCSV(filePath);

  CSVReader.validateHeaders(
    rows,
    [
      'StartDate',
      'InsuranceSum',
      'DamageInsurance',
      'MeritRating',
      'OptionalProduct',
      'CourtesyCar',
    ],
    filePath
  );

  return rows.map((row, index): ProductDataInput => {
    const rowNumber = index + 2;

    const rawOptionalProduct = (row.OptionalProduct || '')
      .replace(/^["']|["']$/g, '')
      .trim();

    const validOptions = rawOptionalProduct
      .split(/[,，;；|]+/)
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value): Option => {
        const option = Object.values(Option).find(
          (candidate) => candidate.toLowerCase() === value.toLowerCase()
        );

        if (!option) {
          throw new Error(
            `[TestDataLoader] Invalid Option at CSV row ${rowNumber}: "${value}".`
          );
        }

        return option;
      });

    return {
      startdate: row.StartDate,
      insurancesum: row.InsuranceSum,       // parseNumber(...) if the type expects a number
      damageinsurance: row.DamageInsurance,
      meritrating: row.MeritRating,
      optionalproduct: validOptions,
      courtesycar: row.CourtesyCar,
    };
  });
}}
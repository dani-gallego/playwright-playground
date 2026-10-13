
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'csv-parse/sync';

export type CSVRow = Record<string, string>;

export class CSVReader {
  static readCSV(filePath: string): CSVRow[] {
    const resolvedPath = path.resolve(filePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(
        `[CSVReader] File not found: ${resolvedPath}`
      );
    }

    const content = fs.readFileSync(resolvedPath, 'utf-8');

    if (!content.trim()) {
      throw new Error(
        `[CSVReader] File is empty: ${resolvedPath}`
      );
    }

    let headers: string[] = [];

    const records = parse(content, {
      bom: true,
      skip_empty_lines: true,
      trim: true,
      columns: (rawHeaders: string[]) => {
        headers = rawHeaders.map((header) => header.trim());

        if (headers.some((header) => !header)) {
          throw new Error(
            '[CSVReader] CSV contains an empty column header.'
          );
        }

        if (new Set(headers).size !== headers.length) {
          throw new Error(
            '[CSVReader] CSV contains duplicate column headers.'
          );
        }

        return headers;
      },
    }) as CSVRow[];

    if (headers.length === 0) {
      throw new Error(
        `[CSVReader] No headers found: ${resolvedPath}`
      );
    }

    if (records.length === 0) {
      throw new Error(
        `[CSVReader] No data rows found: ${resolvedPath}`
      );
    }

    return records;
  }

  static validateHeaders(
    rows: CSVRow[],
    requiredHeaders: string[],
    filePath: string
  ): void {
    if (rows.length === 0) {
      throw new Error(
        `[CSVReader] No rows available for validation: ${filePath}`
      );
    }

    const availableHeaders = Object.keys(rows[0]);

    const missingHeaders = requiredHeaders.filter(
      (header) => !availableHeaders.includes(header)
    );

    if (missingHeaders.length > 0) {
      throw new Error(
        `[CSVReader] Missing headers in "${filePath}": ` +
        missingHeaders.join(', ')
      );
    }
  }
}

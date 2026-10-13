# Playwright TypeScript Automation Framework

An end-to-end UI test automation project built with **Playwright, TypeScript, and Playwright Test**. This project automates the Vehicle Insurance workflow on the Tricentis Sample Application using a reusable Page Object Model structure and CSV-based test data.

## Overview

The goal of this project is to practice building a maintainable UI automation framework with reusable components, organized test data, and automated test execution.

### Key Features

- **Playwright with TypeScript** — browser automation with type safety.
- **Page Object Model (POM)** — separates page locators and actions from test scenarios.
- **Reusable components** — shared methods for navigation, form interactions, and verification.
- **CSV-based test data** — keeps test inputs separate from automation code.
- **Data validation** — validates CSV headers and converts input values into the expected data types.
- **Automated assertions** — verifies form inputs and interactions.
- **Test reporting** — supports HTML reports and Allure reporting.
- **Organized project structure** — separates page objects, business methods, utilities, test data, and reports.

## Application Under Test

**Tricentis Sample Application — Vehicle Insurance**

Website: https://sampleapp.tricentis.com/101/

The automation focuses on the vehicle insurance quotation workflow, including entering vehicle and insurance-related information.

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Programming language |
| Playwright | Browser automation |
| Playwright Test | Test execution and assertions |
| Node.js / npm | Runtime and package management |
| CSV | External test data |
| Allure | Test reporting |
| HTML Reporter | Test execution reports |

## Project Structure

```text
Playwright-Playground/
├── BusinessMethods/       # Data models and business-related methods
├── Pages/                 # Page Object Model classes
│   └── components/        # Shared page components and helpers
├── Utility/               # CSV reader and test data loader
├── Data/                  # CSV test data files
├── tests/                 # Automated test specifications
├── Features/              # BDD feature files, if applicable
├── Steps/                 # BDD step definitions, if applicable
├── Reports/               # Generated test reports
├── Screenshots/           # Captured screenshots, if configured
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
└── README.md
```

*The structure above describes the intended organization. Keep only the folders that exist in your repository.*

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — preferably an LTS version compatible with your project.
- npm — included with Node.js.
- [Git](https://git-scm.com/) — for version control.
- [GitHub Desktop](https://desktop.github.com/) — optional, for managing Git repositories through a graphical interface.

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Playwright-Playground
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Run the Tests

Run all configured tests:

```bash
npx playwright test
```

Run tests with the interactive UI:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test tests/vehicle_insurance.spec.ts
```

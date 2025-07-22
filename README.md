# Nesto QA Automation Take-Home Assessment

## Project Overview

This project was developed as part of a technical take-home assessment for the role of Senior QA Automation Engineer at Nesto. The project demonstrates automated testing capabilities using Cypress with TypeScript, focusing on end-to-end testing of a mortgage application signup flow.

## Prerequisites

Before setting up this project, ensure you have the following installed:

- **Node.js** (version 16 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## Project Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cypress
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
npx cypress --version
```

## Running Tests

### Opening Cypress Test Runner
```bash
npm run cy:open
```
This opens the Cypress Test Runner in interactive mode where you can select and run tests visually.

### Running Tests in Different Browsers

#### Chrome
```bash
npm run cy:run-test-chrome
```

#### Firefox
```bash
npm run cy:run-test-firefox
```


## Multi-Language Testing Architecture

This project implements a decent multi-language testing approach that allows the same test scripts to run in different languages (English and French) without code duplication.

### Key Components

#### 1. Translation System (`support/translations.ts`)
- **Centralized Translations**: All UI text is stored in a `TRANSLATIONS` object with both English (`en`) and French (`fr`) versions
- **Type Safety**: Uses TypeScript to ensure translation keys are valid
- **Dynamic Language Switching**: The `t()` function returns the appropriate text based on the current language setting

#### 2. Language Helper (`helpers/language-helper.ts`)
- **Language Management**: Provides static methods to set and get the current language
- **Runtime Language Switching**: Allows tests to dynamically change language during execution
- **Type Safety**: Uses TypeScript enums for language types

#### 3. Test Implementation
The same test script (`signup.cy.ts`) runs in multiple languages using a helper function:

```typescript
function runSignupTestWithLanguage(language: 'en' | 'fr' = 'en') {
    LanguageHelper.setLanguage(language);
    // Same test logic works for both languages
}
```

### Benefits of This Approach
- **DRY Principle**: No code duplication between language-specific tests
- **Maintainability**: Single source of truth for test logic
- **Scalability**: Easy to add new languages by extending the translation system
- **Consistency**: Ensures the same test scenarios are covered in all languages

## Utilities and Helper Functions

### Borrower Generator (`support/utils.ts`)

The project includes a borrower data generator that creates realistic test data:

#### Features
- **Realistic Data**: Generates realistic names, emails, and phone numbers using Faker.js
- **Canadian Provinces**: Supports all Canadian provinces with proper translations
- **Customizable**: Allows overriding specific fields while generating others
- **Type Safety**: Full TypeScript support with proper interfaces

#### Usage Examples
```typescript
// Generate a complete borrower with random data
const borrower = generateBorrower();

// Generate borrower with specific overrides
const customBorrower = generateBorrower({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
});
```

### Additional Utilities
- **Phone Number Formatting**: Converts raw numbers to formatted display
- **Text Capitalization**: Ensures consistent text formatting
- **Province Mapping**: Maps full province names to abbreviated codes

## Project Structure

```
cypress/
├── nesto_takehome_kartik_muchandi/
│   ├── e2e/                    # Test specifications
│   │   └── signup.cy.ts       # Main signup test suite
│   ├── fixtures/               # Test data files
│   ├── helpers/                # Helper functions and utilities
│   │   ├── common/
│   │   │   └── dropdown.ts      # Custom dropdown helper
│   │   ├── language-helper.ts  # Language management
│   │   └── signup/
│   │       └── signup.ts       # Signup flow helpers
│   ├── pages/                  # Page Object Models
│   │   ├── common.ts
│   │   ├── get-a-quote.ts
│   │   ├── login-page.ts
│   │   └── signup-page.ts
│   └── support/                # Support files and utilities
│       ├── commands.ts         # Custom Cypress commands
│       ├── e2e.ts             # E2E support configuration
│       ├── translations.ts     # Multi-language translations
│       └── utils.ts           # Borrower generator and utilities
├── cypress.config.ts           # Cypress configuration
└── package.json               # Project dependencies
```

## Configuration

The project is configured with the following key settings:

- **Base URL**: `https://app.qa.nesto.ca`
- **Test Isolation**: Disabled for real-time failure tracking
- **Retries**: 1 retry in run mode, 0 in open mode
- **Timeouts**: 10 seconds for various operations
- **Video Recording**: Enabled for test runs
- **Screenshots**: Captured on test failures

## Test Scenarios Covered

The signup test suite covers comprehensive scenarios including:

- ✅ Successful signup in English and French
- ✅ Form validation (required fields)
- ✅ Email format validation
- ✅ Password strength validation
- ✅ Password confirmation matching
- ✅ Terms and conditions agreement
- ✅ Duplicate account handling
- ✅ Phone number validation
- ✅ API response validation

## Contributing

When adding new tests or features:

1. Follow the existing patterns for multi-language support
2. Use the borrower generator for test data
3. Add new translations to the `TRANSLATIONS` object
4. Update this README with any new setup requirements


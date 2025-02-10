# Test Automation Project - Domino's Pizza

## Overview

This project contains automated tests for the Domino's Pizza website. It uses CodeceptJS with Playwright to simulate user interactions and validate different scenarios.

## Project Structure


```
project/
│
├── codecept.conf.js
├── pages/
│   └── folderPage/
│       └── classPage.js
├── tests/
│   └── testClass.js
└── README.md
```

## Prerequisites

- Node.js (v12 or higher)
- NPM (v6 or higher)

## Installation

1. Clone the repository:
git clone https://github.com/ciandt-lucasmazzuco/dominos-playwright-codeceptjs


2. Install dependencies:
```
npm install
```

3. Install global dependencies:
```
npm install -g codeceptjs playwright
```

4. Initialize the CodeceptJS project (if not already initialized):
```
npx codeceptjs init
```

Follow the on-screen instructions to configure your project.

5. Install local project dependencies:
```
npm install
```

6. Install necessary browsers for Playwright:
```
npx playwright install
```

## Configuration

The `codecept.conf.js` file contains the main project settings, including:

- Base URL
- Browser settings
- Geolocation settings

## Running Tests

To run all tests:
```
npx codeceptjs run
```

To run a specific test:
```
npx codeceptjs run tests/testClass.js
```

## Page Objects

The project uses the Page Object pattern. The `LoginAccountPage` class in `pages/accessPage/loginAccountPage.js` encapsulates the elements and actions of the login page.

## Best Practices
- Use Page Object pattern for better maintainability.
- Keep tests atomic and independent.
- Use descriptive names for scenarios and steps.

## Troubleshooting
- Common issues and solutions.
- Links to CodeceptJS and Playwright documentation.

## License

This project is licensed under the XYZ License - see the [LICENSE.md](LICENSE.md) file for details.

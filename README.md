# Playwright Test Automation : DemoQA Case Studies

This project demonstrates how to automate the submission of a form using Playwright with TypeScript. The form is tested in two different scenarios: one with all fields populated and one with only mandatory fields populated. Below is the breakdown of how the test works, including installation and usage instructions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Test Scenarios](#test-scenarios)
- [Running the Tests](#running-the-tests)
- [Error Handling](#error-handling)
- [Conclusion](#conclusion)

## Prerequisites
Before getting started, ensure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (Node Package Manager)
- Playwright

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd your-repo
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Install Playwright:
   ```bash
   npx playwright install
   ```

## Project Structure

Here's an overview of the key files:

```bash
├── pages/
│   ├── basePage.ts        # Contains base functions for interacting with the form
├── data/
│   ├── testData_1.json    # Test data for the first test case (all fields populated)
│   ├── testData_2.json    # Test data for the second test case (mandatory fields only)
├── tests/
│   ├── formSubmission.spec.ts # Test cases for form submission
├── README.md              # Documentation
├── package.json           # Project configuration and dependencies
```

## Test Scenarios

### Test Case 1 - Submit Form (All fields populated)
This test case submits the form with all the fields (e.g., name, email, gender, mobile number, date of birth, subjects, hobbies, image, address, state, and city) populated.

### Test Case 2 - Submit Form (Mandatory fields populated)
This test case submits the form with only the mandatory fields (first name, last name, gender, and mobile number) populated.

## Running the Tests

1. To run the tests, use the following command:
   ```bash
   npx playwright test
   ```

2. You can also run specific tests:
   ```bash
   npx playwright test --grep "Submit Form"
   ```

3. Run tests in headed mode (to visually observe the test):
   ```bash
   npx playwright test --headed
   ```

## Error Handling
Error handling in the tests is done using Playwright's built-in assertions. The tests check if the correct values are displayed after form submission and throw an error if the expected values are not found.

For example, to check if a specific field in the form was successfully populated and displayed:

```typescript
await base.verifyTableValue('Student Name', testData.firstName + ' ' + testData.lastName);
```

If the expected value does not match, an assertion error is thrown, and the test fails.

## Sample Code

Below is a sample of the test implementation for the form submission:

### Test Case 1 - Submit Form (All Fields Populated)
```typescript
test('Test Case 1 - Submit Form - All fields populated', async ({ page }, testInfo) => {
    const base = new BasePage(page);

    await base.navigateToTestPage();

    await base.insertFirstName(testData.firstName);
    await base.insertLastName(testData.lastName);
    await base.insertEmail(testData.email);
    await base.selectGender(testData.gender);
    await base.insertMobileNumber(testData.mobileNumber);
    await base.selectDateOfBirth(testData.dateOfBirth);
    await base.selectSubject(testData.subjects);
    await base.selectHobbies(testData.hobbies);
    await base.uploadImage();
    await base.insertCurrentAddress(testData.address);
    await base.selectState(testData.state, testData.city);
    
    await page.locator(base.buttonSubmit).click();
    await page.locator('#example-modal-sizes-title-lg').isVisible();

    await base.verifyTableValue('Student Name', testData.firstName + ' ' + testData.lastName);
    await base.verifyTableValue('Student Email', testData.email);
    await base.verifyTableValue('Gender', testData.gender);
    await base.verifyTableValue('Mobile', testData.mobileNumber);
    await base.verifyTableValue('Date of Birth', base.formatDate(testData.dateOfBirth));
    await base.verifyTableValue('Subjects', testData.subjects);
    await base.verifyTableValue('Hobbies', testData.hobbies);
    await base.verifyTableValue('Address', testData.address);
    await base.verifyTableValue('State and City', testData.state + ' ' + testData.city);
});
```

### Test Case 2 - Submit Form (Only Mandatory Fields Populated)
```typescript
test('Test Case 2 - Submit Form - Only mandatory populated', async ({ page }, testInfo) => {
    const base = new BasePage(page);

    await base.navigateToTestPage();

    await base.insertFirstName(testData2.firstName);
    await base.insertLastName(testData2.lastName);
    await base.selectGender(testData2.gender);
    await base.insertMobileNumber(testData2.mobileNumber);

    await page.locator(base.buttonSubmit).click();
    await page.locator('#example-modal-sizes-title-lg').isVisible();

    await base.verifyTableValue('Student Name', testData2.firstName + ' ' + testData2.lastName);
    await base.verifyTableValue('Student Email', '');
    await base.verifyTableValue('Gender', testData2.gender);
    await base.verifyTableValue('Mobile', testData2.mobileNumber);
    await base.verifyTableValue('Date of Birth', '');
    await base.verifyTableValue('Subjects', '');
    await base.verifyTableValue('Hobbies', '');
    await base.verifyTableValue('Address', '');
    await base.verifyTableValue('State and City', '');
});
```

## Conclusion
This Playwright project provides a robust and scalable framework for form automation, allowing tests to be performed under various scenarios. It supports full-field validation as well as testing with only mandatory fields, ensuring comprehensive coverage.

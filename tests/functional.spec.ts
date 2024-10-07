import test from '@playwright/test';
import { BasePage } from '../pages/basePage';
import * as testData1 from '../data/testData_1.json';
import * as testData2 from '../data/testData_2.json';

test.describe('DemoQA Form Submission Tests', () => {

    let base: BasePage;

    // Test Setup: Common actions before each test case
    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        await base.navigateToTestPage();
    });

    // Step 1: Fill the form with provided test data
    async function fillFormWithData(testData: any) {
        await base.insertFirstName(testData.firstName);
        await base.insertLastName(testData.lastName);
        if (testData.email) await base.insertEmail(testData.email);
        await base.selectGender(testData.gender);
        await base.insertMobileNumber(testData.mobileNumber);
        if (testData.dateOfBirth) await base.selectDateOfBirth(testData.dateOfBirth);
        if (testData.subjects) await base.selectSubject(testData.subjects);
        if (testData.hobbies) await base.selectHobbies(testData.hobbies);
        if (testData.address) await base.insertCurrentAddress(testData.address);
        if (testData.state && testData.city) await base.selectState(testData.state, testData.city);
        if (testData.uploadImage) await base.uploadImage();
    }

    // Step 2: Submit the form
    async function submitForm() {
        await base.page.locator(base.buttonSubmit).click();
        await base.page.locator(base.summaryPage).isVisible();
    }

    // Step 3: Verify submitted data in the summary
    async function verifySummary(testData: any) {
        await base.verifyTableValue('Student Name', `${testData.firstName} ${testData.lastName}`);
        await base.verifyTableValue('Student Email', testData.email || '');
        await base.verifyTableValue('Gender', testData.gender);
        await base.verifyTableValue('Mobile', testData.mobileNumber);
        await base.verifyTableValue('Date of Birth', testData.dateOfBirth ? base.formatDate(testData.dateOfBirth) : '');
        await base.verifyTableValue('Subjects', testData.subjects || '');
        await base.verifyTableValue('Hobbies', testData.hobbies || '');
        await base.verifyTableValue('Address', testData.address || '');
        await base.verifyTableValue('State and City', (testData.state && testData.city) ? `${testData.state} ${testData.city}` : '');
    }

    test('Test Case 1 - Submit Form - All fields populated', async () => {
        // Fill the form
        await test.step('Step 1 : Fill in the form', async () => {
            await fillFormWithData(testData1);
        });

        // Submit the form
        await test.step('Step 2 : Submit the form', async () => {
            await submitForm();
        });

        // Verify the form submission summary
        await test.step('Step 3 : Verify the form submission summary', async () => {
            await verifySummary(testData1);
        });
    });

    test('Test Case 2 - Submit Form - Only mandatory fields populated', async () => {
        // Fill the form with minimal required fields
        await test.step('Step 1 : Fill in the form', async () => {
            await fillFormWithData(testData2);
        });

        // Submit the form
        await test.step('Step 2 : Submit the form', async () => {
            await submitForm();
        });

        // Verify the form submission summary
        await test.step('Step 3 : Verify the form submission summary', async () => {
            await verifySummary(testData2);
        });
    });
});

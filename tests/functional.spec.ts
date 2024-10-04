import test from '@playwright/test';
import { BasePage } from '../pages/basePage';
import * as testData from "../data/testData_1.json";

test('Test Case 1 - Submit Form - All fields populated', { tag: '@e2e' }, async ({ page }, testInfo) => {
    const base = new BasePage(page);

    await base.navigateToTestPage();

    await base.insertFirstName(testData.firstName)
    await base.insertLastName(testData.lastName);

    await base.insertEmail(testData.email);

    await base.selectGender(testData.gender);

    await base.inserMobileNumber(testData.mobileNumber);

    await base.selectDateOfBirth(testData.dateOfBirth);

    await page.locator(base.buttonSubmit).click();

    await page.locator('#example-modal-sizes-title-lg').isVisible();

    await base.verifyTableValue('Student Name', testData.firstName + ' ' + testData.lastName);
    await base.verifyTableValue('Student Email', testData.email);
    await base.verifyTableValue('Gender', testData.gender);
    await base.verifyTableValue('Mobile', testData.mobileNumber);
    await base.verifyTableValue('Date of Birth', base.formatDate(testData.dateOfBirth));
})
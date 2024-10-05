import test from '@playwright/test';
import { BasePage } from '../pages/basePage';
import * as testData from "../data/testData_1.json";
import * as testData2 from "../data/testData_2.json";

test('Test Case 1 - Submit Form - All fields populated', async ({ page }, testInfo) => {
    const base = new BasePage(page);

    await base.navigateToTestPage();

    await base.insertFirstName(testData.firstName)
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

    await page.locator(base.summaryPage).isVisible();

    await base.verifyTableValue('Student Name', testData.firstName + ' ' + testData.lastName);
    await base.verifyTableValue('Student Email', testData.email);
    await base.verifyTableValue('Gender', testData.gender);
    await base.verifyTableValue('Mobile', testData.mobileNumber);
    await base.verifyTableValue('Date of Birth', base.formatDate(testData.dateOfBirth));
    await base.verifyTableValue('Subjects', testData.subjects);
    await base.verifyTableValue('Hobbies', testData.hobbies);
    await base.verifyTableValue('Address', testData.address);
    await base.verifyTableValue('State and City', testData.state + ' ' + testData.city);
})

test('Test Case 2 - Submit Form - Only mandatory populated', async ({ page }, testInfo) => {
    const base = new BasePage(page);

    await base.navigateToTestPage();

    await base.insertFirstName(testData2.firstName)
    await base.insertLastName(testData2.lastName);

    await base.selectGender(testData2.gender);

    await base.insertMobileNumber(testData2.mobileNumber);

    await page.locator(base.buttonSubmit).click();

    await page.locator(base.summaryPage).isVisible();

    await base.verifyTableValue('Student Name', testData2.firstName + ' ' + testData2.lastName);
    await base.verifyTableValue('Student Email', '');
    await base.verifyTableValue('Gender', testData2.gender);
    await base.verifyTableValue('Mobile', testData2.mobileNumber);
    await base.verifyTableValue('Date of Birth', '');
    await base.verifyTableValue('Subjects', '');
    await base.verifyTableValue('Hobbies', '');
    await base.verifyTableValue('Address', '');
    await base.verifyTableValue('State and City', '');
})
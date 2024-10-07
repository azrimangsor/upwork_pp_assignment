import { expect, Page } from "@playwright/test";
import * as path from 'path';

class Logger {
    // Success message (green text)
    logSuccess(message) {
        console.log("\x1b[32m%s\x1b[0m", "[SUCCESS] -", message);
    }

    // Error message (red text)
    logError(message) {
        console.log("\x1b[31m%s\x1b[0m", "[ERROR] -", message);
    }

    // Warning message (yellow text)
    logWarning(message) {
        console.log("\x1b[33m%s\x1b[0m", "[WARNING] -", message);
    }
}

const logger = new Logger();

export class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    url = 'https://demoqa.com/automation-practice-form/';

    firstName = '#firstName';
    lastName = '#lastName';
    userEmail = '#userEmail';
    genderMale = 'input#gender-radio-1';
    genderFemale = 'input#gender-radio-2';
    genderOther = 'input#gender-radio-3';
    mobileNumber = '#userNumber';
    dateOfBirth = '#dateOfBirthInput';
    datePickerYear = 'select.react-datepicker__year-select';
    datePickerMonth = 'select.react-datepicker__month-select';
    subjectContainer = '#subjectsInput';
    subjectContainerResult = '##subjects-auto-complete__indicators';
    hobbiesSports = 'input#hobbies-checkbox-1';
    hobbiesReading = 'input#hobbies-checkbox-2';
    hobbiesMusic = 'input#hobbies-checkbox-3';
    address = 'textarea#currentAddress';
    stateDropDown = '#state';
    cityDropDown = '#city';

    buttonSubmit = '#submit';

    summaryPage = '#example-modal-sizes-title-lg';

    async navigateToTestPage(): Promise<void> {
        try {

            this.page.setDefaultTimeout(60000);
            // Navigate to the specified URL
            await this.page.goto(this.url);

            // Validate if the current URL contains the expected part
            if (this.page.url().includes('/automation-practice-form/')) {
                //console.log(`Success - Navigated to "${this.url}"`);
                logger.logSuccess(`Navigated to "${this.url}"`);
            } else {
                throw new Error(`Error - URL does not match expected path: '/automation-practice-form/'. Current URL: "${this.page.url()}"`);
            }
        } catch (error) {
            // Log the error if the URL validation fails
            logger.logError(`Navigation failed: ${error.message}`);
            throw error;  // Optional: Re-throw the error to let the test fail if needed
        }
    }

    async insertFirstName(fname: string): Promise<void> {
        try {
            // Fill the first name input
            await this.page.locator(this.firstName).fill(fname);
    
            // Verify the input value matches the expected first name
            const inputValue = await this.page.inputValue(this.firstName);
    
            // Check if the first name input is valid
            const isValid = await this.page.locator(this.firstName).evaluate(
                (input) => (input as HTMLInputElement).checkValidity()
            );
    
            // Log success if the value is correct and the input is valid
            if (inputValue === fname && isValid) {
                logger.logSuccess(`First name inserted successfully: "${inputValue}"`);
            }
        } catch (error) {
            // Log error details
            logger.logError(`Error inserting first name: "${fname}". Message: ${error.message}`);
        }
    }

    async insertLastName(lname: string): Promise<void> {
        try {
            // Fill the last name input
            await this.page.locator(this.lastName).fill(lname);
    
            // Get the input value and check if it is valid
            const inputValue = await this.page.inputValue(this.lastName);
            const isValid = await this.page.locator(this.lastName).evaluate(
                (input) => (input as HTMLInputElement).checkValidity()
            );
    
            // Log success if the input is valid and matches the provided last name
            if (inputValue === lname && isValid) {
                logger.logSuccess(`Last name inserted successfully: "${inputValue}"`);
            } else if (!isValid) {
                logger.logError(`Invalid last name: "${inputValue}".`);
            }
        } catch (error) {
            // Log any error that occurs during the process
            logger.logError(`Error inserting last name: "${lname}". Message: ${error.message}`);
        }
    }    

    async insertEmail(email: string): Promise<void> {
        try {
            // Fill the email input
            await this.page.locator(this.userEmail).fill(email);
    
            // Check if the input value matches the provided email and is valid
            const inputValue = await this.page.inputValue(this.userEmail);
            const isValid = await this.page.locator(this.userEmail).evaluate(
                (input) => (input as HTMLInputElement).checkValidity()
            );
    
            // Log success or error based on validity and input match
            if (inputValue === email && isValid) {
                logger.logSuccess(`Email inserted successfully: "${inputValue}"`);
            } else {
                logger.logError(`Invalid email: "${inputValue}".`);
            }
        } catch (error) {
            // Log error details
            logger.logError(`Error inserting email: "${email}". Message: ${error.message}`);
        }
    }    

    async selectGender(gender: string): Promise<void> {
        try {
            const genderOption = this.page.getByText(gender, { exact: true });
            await genderOption.click();
    
            // Ensure the selected gender option is checked
            const isChecked = await genderOption.isChecked();
    
            if (isChecked) {
                logger.logSuccess(`Gender "${gender}" selected successfully`);
            } else {
                logger.logError(`Failed to select gender: "${gender}". Option not checked.`);
            }
        } catch (error) {
            // Log error details
            logger.logError(`Error selecting gender: "${gender}". Message: ${error.message}`);
        }
    }    

    async insertMobileNumber(mobile: string): Promise<void> {
        try {
            // Fill the mobile number input
            await this.page.locator(this.mobileNumber).fill(mobile);
    
            // Get the input value and check its validity
            const inputValue = await this.page.inputValue(this.mobileNumber);
            const isValid = await this.page.locator(this.mobileNumber).evaluate(
                (input) => (input as HTMLInputElement).checkValidity()
            );
    
            // Log success if the value matches and input is valid
            if (inputValue === mobile && isValid) {
                logger.logSuccess(`Mobile number inserted successfully: "${inputValue}"`);
            } else {
                logger.logError(`Invalid mobile number: "${inputValue}".`);
            }
        } catch (error) {
            // Log error details
            logger.logError(`Error inserting mobile number: "${mobile}". Message: ${error.message}`);
        }
    }    

    async verifyDateInput(expectedDate: string): Promise<void> {
        try {
            // Get the input value from the date field
            const dateValue = await this.page.inputValue(this.dateOfBirth);
    
            // Regular expression to match the format 'DD MMM YYYY' (e.g., '04 Oct 2024')
            const dateRegex = /^(0[1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (19\d{2}|20\d{2}|2100)$/;
    
            // Verify if the date matches the expected format
            if (!dateRegex.test(dateValue)) {
                throw new Error(`Date "${dateValue}" does not match the expected format "DD MMM YYYY".`);
            }
    
            // Optionally check if the input value matches the expected date
            if (dateValue !== expectedDate) {
                throw new Error(`Expected date "${expectedDate}", but found "${dateValue}".`);
            }
    
            // Log success if both checks pass
            logger.logSuccess(`Date "${dateValue}" matches the expected format and value.`);
        } catch (error) {
            // Log error details
            logger.logError(`Date validation failed: ${error.message}`);
        }
    }    

    async selectDateOfBirth(dob: string): Promise<void> {
        //this.verifyDateInput(dob);

        const [day, month, year] = dob.split(' ');

        const monthMap: { [key: string]: string } = {
            'Jan': '0',
            'Feb': '1',
            'Mar': '2',
            'Apr': '3',
            'May': '4',
            'Jun': '5',
            'Jul': '6',
            'Aug': '7',
            'Sep': '8',
            'Oct': '9',
            'Nov': '10',
            'Dec': '11'
        };

        // Get the corresponding value for the month from the monthMap
        const monthValue = monthMap[month];

        await this.page.locator('#dateOfBirthInput').click();
        await this.page.locator('div').filter({ hasText: /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/ }).getByRole('combobox').selectOption(monthValue);
        await this.page.getByRole('combobox').nth(1).selectOption(year);

        const monthNameMap: { [key: string]: string } = {
            'Jan': 'January',
            'Feb': 'February',
            'Mar': 'March',
            'Apr': 'April',
            'May': 'May',
            'Jun': 'June',
            'Jul': 'July',
            'Aug': 'August',
            'Sep': 'September',
            'Oct': 'October',
            'Nov': 'November',
            'Dec': 'December'
        };

        const monthName = monthNameMap[month];

        const getDayWithSuffix = (day: string) => {
            const dayInt = parseInt(day);
            if (dayInt === 1 || dayInt === 21 || dayInt === 31) return `${day}st`;
            if (dayInt === 2 || dayInt === 22) return `${day}nd`;
            if (dayInt === 3 || dayInt === 23) return `${day}rd`;
            return `${day}th`;
        };

        // Get the day with the appropriate suffix
        const dayWithSuffix = getDayWithSuffix(day);

        //await this.page.getByLabel('Choose Friday, January 11th, 1980').click();
        const dayPattern = new RegExp(`Choose .*, ${monthName} ${dayWithSuffix}.*, .*`, 'i');

        await this.page.getByLabel(dayPattern).click();

        //this.verifyDateInput(dob);
    }

    async verifyTableValue(label: string, expectedValue: string): Promise<void> {
        try {
            // Locate the value in the adjacent cell of the row containing the label
            const valueLocator = this.page.locator(`table.table-dark tbody tr:has-text("${label}") td:nth-child(2)`);
            
            // Retrieve and trim the actual value
            const actualValue = (await valueLocator.textContent())?.trim();
    
            // Compare the actual value with the expected value
            if (actualValue === expectedValue) {
                logger.logSuccess(`Success - Value for "${label}" is correctly set to "${expectedValue}".`);
            } else {
                throw new Error(`Value for "${label}" is "${actualValue}", expected "${expectedValue}".`);
            }
        } catch (error) {
            logger.logWarning(`Verification failed for "${label}": ${error.message}`);
        }
    }

    async selectSubject(subjects: string): Promise<void> {
        // Split and trim the subject list
        const subjectList = subjects.split(',').map(subject => subject.trim());
    
        // Iterate over each subject in the list
        for (const subject of subjectList) {
            try {
                // Focus on the subject container
                await this.page.locator(this.subjectContainer).click();
    
                // Fill in the subject name
                await this.page.locator(this.subjectContainer).fill(subject);
    
                // Click on the subject from the autocomplete suggestions
                await this.clickSubject(subject);
    
                // Optional: Small wait to ensure the subject is properly added
                await this.page.waitForTimeout(500);
    
                // Log success
                logger.logSuccess(`Success - Subject added: "${subject}"`);
            } catch (error) {
                logger.logError(`Error - Failed to add subject: "${subject}". Message: ${error.message}`);
            }
        }
    }

    async selectHobbies(hobbies: string): Promise<void> {
        // Split and trim the hobbies list
        const selectedHobbies = hobbies.split(',').map(hobby => hobby.trim());
    
        try {
            // Iterate over each hobby and handle the selection
            for (const hobby of selectedHobbies) {
                const hobbyLocator = await this.page.getByText(hobby, { exact: true });
    
                if (await hobbyLocator.isVisible()) {
                    await hobbyLocator.click();
                    logger.logSuccess(`Success - Hobby selected: "${hobby}"`);
                } else {
                    throw new Error(`Invalid hobby: "${hobby}". Please select either "Sports", "Reading", or "Music".`);
                }
            }
        } catch (error) {
            logger.logError(`Hobby selection failed: ${error.message}`);
        }
    } 

    async uploadImage(): Promise<void> {
        try {
            // Locate the file input element
            const fileInput = this.page.locator('input[type="file"]');
            
            // Resolve the file path
            const filePath = path.resolve(__dirname, 'files', 'test.jpg');
            
            // Check if the file input is visible before attempting to set the file
            if (!(await fileInput.isVisible())) {
                throw new Error('File input element is not visible on the page.');
            }
            
            // Upload the image file
            await fileInput.setInputFiles(filePath);
            
            logger.logSuccess('Image successfully uploaded.');
        } catch (error) {
            // Log error if the upload fails
            logger.logError(`Image upload failed: ${error.message}`);
        }
    }

    async insertCurrentAddress(address: string): Promise<void> {
        try {
            // Fill the current address input field
            await this.page.locator(this.address).fill(address);
    
            // Get the value inserted in the input box
            const inputValue = await this.page.inputValue(this.address);
    
            // Validate if the input field's content is valid using checkValidity()
            const isValid = await this.page.locator(this.address).evaluate((input: HTMLInputElement) => input.checkValidity());
    
            // Check if the entered address matches the expected value and is valid
            if (inputValue === address && isValid) {
                logger.logSuccess(`Current address inserted successfully: "${inputValue}"`);
            } else {
                throw new Error(`Current address "${inputValue}" is invalid or does not match the expected input.`);
            }
        } catch (error) {
            // Log the error with appropriate messaging
            logger.logError(`Failed to insert current address: "${address}". Error: ${error.message}`);
        }
    }    

    async selectState(state: string, city: string): Promise<void> {
        try {
            // Select the state from the dropdown
            await this.page.locator(this.stateDropDown).click();
            const stateOption = await this.page.getByText(state, { exact: true });
            
            if (await stateOption.isVisible()) {
                await stateOption.click();
                logger.logSuccess(`State "${state}" selected successfully.`);
            } else {
                throw new Error(`State "${state}" not found in the dropdown.`);
            }
    
            // Select the city from the dropdown
            await this.page.locator(this.cityDropDown).click();
            const cityOption = await this.page.getByText(city, { exact: true });
    
            if (await cityOption.isVisible()) {
                await cityOption.click();
                logger.logSuccess(`City "${city}" selected successfully.`);
            } else {
                throw new Error(`City "${city}" not found in the dropdown.`);
            }
        } catch (error) {
            // Log the error with details
            logger.logError(`Error while selecting state "${state}" and city "${city}": ${error.message}`);
        }
    }    

    async clickSubject(subjectSearch: string): Promise<void> {
        try {
            // Locate the subject option
            const subjectLocator = this.page.locator(`#react-select-2-option-0 >> text=${subjectSearch}`);
    
            // Verify if the subject exists before clicking
            if (await subjectLocator.isVisible()) {
                await subjectLocator.click();
                logger.logSuccess(`Subject "${subjectSearch}" selected successfully.`);
            } else {
                throw new Error(`Subject "${subjectSearch}" is not available in the dropdown.`);
            }
        } catch (error) {
            // Handle and log any error that occurs during subject selection
            logger.logError(`Error - Failed to select subject "${subjectSearch}": ${error.message}`);
        }
    }

    formatDate(input: string): string {
        // Define an object to map abbreviated month names to full month names
        const monthMap: { [key: string]: string } = {
            Jan: 'January',
            Feb: 'February',
            Mar: 'March',
            Apr: 'April',
            May: 'May',
            Jun: 'June',
            Jul: 'July',
            Aug: 'August',
            Sep: 'September',
            Oct: 'October',
            Nov: 'November',
            Dec: 'December',
        };

        // Split the input into parts
        const parts = input.split(' ');

        // Ensure the input is in the expected format
        if (parts.length !== 3) {
            throw new Error(`Invalid date format: "${input}". Expected format is "DD MMM YYYY".`);
        }

        let day = parts[0];
        const abbreviatedMonth = parts[1];
        const year = parts[2];

        // Add leading zero to single-digit days
        if (parseInt(day) < 10) {
            day = `0${day}`;
        }

        // Get the full month name from the map
        const fullMonth = monthMap[abbreviatedMonth];
        if (!fullMonth) {
            throw new Error(`Invalid month abbreviation: "${abbreviatedMonth}".`);
        }

        // Format and return the new date string
        return `${day} ${fullMonth},${year}`;
    }
}
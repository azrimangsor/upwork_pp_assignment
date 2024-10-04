import { expect, Page } from "@playwright/test";


export class BasePage {
    protected page: Page;

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
    datePickerMonth = 'react-datepicker__month-select';
    subjectContainer = '#subjectsContainer';
    subjectContainerResult = '#subjects-auto-complete__menu';
    hobbiesSports = '#hobbies-checkbox-1';
    hobbiesReading = '#hobbies-checkbox-2';
    hobbiesMusic = '#hobbies-checkbox-3';

    buttonSubmit = '#submit';

    async navigateToTestPage(): Promise<void> {
        await this.page.goto(this.url);
        expect(this.page.url()).toContain('/automation-practice-form/');
        console.log(`Success - Navigate to "${this.url}"`);
    }

    async insertFirstName(fname: string): Promise<void> {
        try {
            await this.page.locator(this.firstName).fill(fname);
            const inputValue = await this.page.inputValue(this.firstName)

            if (inputValue == fname) {
                console.log(`Success - First name inserted "${inputValue}"`);
            }
        } catch (error) {
            console.error(`Error - First name input : "${fname}" Message :`, error);
        }
    }

    async insertLastName(lname: string): Promise<void> {
        try {
            await this.page.locator(this.lastName).fill(lname);
            const inputValue = await this.page.inputValue(this.lastName)

            const isValid = await this.page.locator(this.lastName).evaluate(input => {
                const element = input as HTMLInputElement; // Cast the element
                return element.checkValidity();
            });

            if (inputValue == lname && isValid) {
                console.log(`Success - Last name inserted "${inputValue}"`);
            } else if (!isValid) {
                console.error(`Error - Last name "${inputValue}" is invalid.`);
            }
        } catch (error) {
            console.error(`Error - Last name input : "${lname}" Message :`, error);
        }

    }

    async insertEmail(email: string): Promise<void> {
        try {
            // Fill the email input
            await this.page.locator(this.userEmail).fill(email);

            // Get the value inserted in the input box
            const inputValue = await this.page.inputValue(this.userEmail);

            // Evaluate checkValidity() inside the browser context
            const isValid = await this.page.locator(this.userEmail).evaluate(input => {
                const element = input as HTMLInputElement; // Cast the element
                return element.checkValidity();
            });

            // Log success if the input is valid and value matches
            if (inputValue === email && isValid) {
                console.log(`Success - Email inserted: "${inputValue}"`);
            } else if (!isValid) {
                console.error(`Error - Email "${inputValue}" is invalid.`);
            }
        } catch (error) {
            console.error(`Error - Email input: "${email}" Message:`, error);
        }
    }

    async selectGender(gender: string): Promise<void> {
        try {
            await this.page.getByText(gender, { exact: true }).click();
            await this.page.getByText(gender, { exact: true }).isChecked();
            console.log(`Success - Gender "${gender}" selected`);
        } catch (error) {
            console.error(`Error - Gender Input : "${gender}" Message :`, error);
        }
    }

    async inserMobileNumber(mobile: string): Promise<void> {
        try {
            await this.page.locator(this.mobileNumber).fill(mobile);
            const inputValue = await this.page.inputValue(this.mobileNumber)

            const isValid = await this.page.locator(this.mobileNumber).evaluate(input => {
                const element = input as HTMLInputElement; // Cast the element
                return element.checkValidity();
            });

            if (inputValue == mobile && isValid) {
                console.log(`Success - Mobile number inserted "${inputValue}"`);
            } else if (!isValid) {
                console.error(`Error - Mobile Number "${inputValue}" is invalid.`);
            }
        } catch (error) {
            console.error(`Error - Mobile number input : "${mobile}" Message :`, error);
        }

    }

    async verifyDateInput(expectedDate: string): Promise<void> {
        try {
            // Get the input value from the date field
            const dateValue = await this.page.inputValue(this.dateOfBirth);

            // Define the regular expression to match the format 'DD MMM YYYY' (e.g., '04 Oct 2024')
            const dateRegex = /^(0[1-9]|[12][0-9]|3[01]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (19[0-9]{2}|20[0-9]{2}|2100)$/;

            // Verify if the date matches the format
            if (dateRegex.test(dateValue)) {
                console.log(`Success: Date "${dateValue}" matches the expected format.`);
            } else {
                throw new Error(`Error: Date "${dateValue}" does not match the expected format "DD MMM YYYY".`);
            }

            // Additionally, you can check if the input value matches the expected date
            if (dateValue === expectedDate) {
                console.log(`Success: The date matches the expected date "${expectedDate}".`);
            } else {
                throw new Error(`Error: Expected date "${expectedDate}", but found "${dateValue}".`);
            }
        } catch (error) {
            console.error(`Date validation failed: ${error.message}`);
        }
    }

    async selectDateOfBirth(dob: string): Promise<void> {
        try {
            await this.page.locator(this.dateOfBirth).fill(dob);
            this.verifyDateInput(dob);
            const inputValue = await this.page.inputValue(this.dateOfBirth)

            const isValid = await this.page.locator(this.dateOfBirth).evaluate(input => {
                const element = input as HTMLInputElement; // Cast the element
                return element.checkValidity();
            });

            if (inputValue == dob && isValid) {
                console.log(`Success - Date of birth inserted "${inputValue}"`);
            } else if (!isValid) {
                console.error(`Error - Date of birth "${inputValue}" is invalid.`);
            }
        } catch (error) {
            console.error(`Error - Date of birth input : "${dob}" Message :`, error);
        }
    }

    async verifyTableValue(label: string, expectedValue: string): Promise<void> {
        try {
            // Locate the row that contains the label and then get the value in the adjacent cell
            const valueLocator = this.page.locator(`table.table-dark tbody tr:has-text("${label}") td:nth-child(2)`);

            // Get the actual value from the table
            const actualValue = await valueLocator.textContent();

            // Verify the value in the table matches the expected value
            if (actualValue?.trim() === expectedValue) {
                console.log(`Success: Value for "${label}" is correctly set to "${expectedValue}".`);
            } else {
                throw new Error(`Error: Value for "${label}" is "${actualValue}", expected "${expectedValue}".`);
            }
        } catch (error) {
            console.error(`Verification failed for "${label}": ${error.message}`);
        }
    }

    async selectSubject(subject: string): Promise<void> {

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

        const day = parts[0];
        const abbreviatedMonth = parts[1];
        const year = parts[2];

        // Get the full month name from the map
        const fullMonth = monthMap[abbreviatedMonth];
        if (!fullMonth) {
            throw new Error(`Invalid month abbreviation: "${abbreviatedMonth}".`);
        }

        // Format and return the new date string
        return `${day} ${fullMonth},${year}`;
    }

}
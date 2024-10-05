import { expect, Page } from "@playwright/test";
import * as path from 'path';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    url = 'https://demoqa.com/automation-practice-form/';
    //url = 'https://google.com'

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

    async navigateToTestPage(): Promise<void> {
        try {
            // Navigate to the specified URL
            await this.page.goto(this.url);
            
            // Validate if the current URL contains the expected part
            if (this.page.url().includes('/automation-practice-form/')) {
                console.log(`Success - Navigated to "${this.url}"`);
            } else {
                throw new Error(`Error - URL does not match expected path: '/automation-practice-form/'. Current URL: "${this.page.url()}"`);
            }
        } catch (error) {
            // Log the error if the URL validation fails
            console.error(`Navigation failed: ${error.message}`);
            throw error;  // Optional: Re-throw the error to let the test fail if needed
        }
    }

    async insertFirstName(fname: string): Promise<void> {
        try {
            await this.page.locator(this.firstName).fill(fname);
            const inputValue = await this.page.inputValue(this.firstName)

            const isValid = await this.page.locator(this.lastName).evaluate(input => {
                const element = input as HTMLInputElement; // Cast the element
                return element.checkValidity();
            });

            if (inputValue == fname && isValid) {
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

    async insertMobileNumber(mobile: string): Promise<void> {
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
                //console.log(`Success: Date "${dateValue}" matches the expected format.`);
            } else {
                throw new Error(`Error: Date "${dateValue}" does not match the expected format "DD MMM YYYY".`);
            }

            // Additionally, you can check if the input value matches the expected date
            // if (dateValue === expectedDate) {
            //     //console.log(`Success - The date matches the expected date "${expectedDate}".`);
            // } else {
            //     throw new Error(`Error -  Expected date "${expectedDate}", but found "${dateValue}".`);
            // }
        } catch (error) {
            console.error(`Date validation failed: ${error.message}`);
        }
    }

    async selectDateOfBirth(dob: string): Promise<void> {
        //await this.page.locator(this.dateOfBirth).fill(dob);
        this.verifyDateInput(dob);

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
    }

    async verifyTableValue(label: string, expectedValue: string): Promise<void> {
        try {
            // Locate the row that contains the label and then get the value in the adjacent cell
            const valueLocator = this.page.locator(`table.table-dark tbody tr:has-text("${label}") td:nth-child(2)`);

            // Get the actual value from the table
            const actualValue = await valueLocator.textContent();

            // Verify the value in the table matches the expected value
            if (actualValue?.trim() === expectedValue) {
                console.log(`Success - Value for "${label}" is correctly set to "${expectedValue}".`);
            } else {
                throw new Error(`Error - Value for "${label}" is "${actualValue}", expected "${expectedValue}".`);
            }
        } catch (error) {
            console.error(`Verification failed for "${label}": ${error.message}`);
        }
    }

    async selectSubject(subjects: string): Promise<void> {
        const subjectList = subjects.split(',').map(subject => subject.trim());


        for (const subject of subjectList) {
            //console.log(`Processing subject: ${subject}`);

            // Click on the subject container to focus
            await this.page.locator(this.subjectContainer).click();

            // Type the first letter of the subject
            await this.page.locator(this.subjectContainer).fill(subject);

            this.clickSubject(subject);
            //console.log(`Success - Subject added: ${subject}`);

            await this.page.waitForTimeout(500);
        }
    }

    async selectHobbies(hobbies: string): Promise<void> {
        const selectedHobbies = hobbies.split(',').map(hobby => hobby.trim());

        try {
            for (const hobby of selectedHobbies) {
                switch (hobby) {
                    case 'Sports':
                        await this.page.getByText('Sports').click();
                        console.log(`Success - Hobby selected Sports`);
                        break;
                    case 'Reading':
                        await this.page.getByText('Reading').click();
                        console.log(`Success - Hobby selected Reading`);
                        break;
                    case 'Music':
                        await this.page.getByText('Music').click();
                        console.log(`Success - Hobby selected Music`);
                        break;
                    default:
                        throw new Error(`Invalid hobby: ${hobby}. Please select either "Sports", "Reading", or "Music".`);
                }
            }
        } catch (error) {
            console.error(`Date validation failed: ${error.message}`);
        }

    }

    async uploadImage(): Promise<void> {
        const fileInput = this.page.locator('input[type="file"]');

        const filePath = path.resolve(__dirname, 'files', 'test.jpg');

        await fileInput.setInputFiles(filePath);
    }

    async insertCurrentAddress(address: string): Promise<void> {
        try {
            await this.page.locator(this.address).fill(address);
            const inputValue = await this.page.inputValue(this.address)

            const isValid = await this.page.locator(this.address).evaluate(input => {
                const element = input as HTMLInputElement; // Cast the element
                return element.checkValidity();
            });

            if (inputValue == address && isValid) {
                console.log(`Success - Current address inserted "${inputValue}"`);
            } else if (!isValid) {
                console.error(`Error - Current address "${inputValue}" is invalid.`);
            }
        } catch (error) {
            console.error(`Error - Current address input : "${address}" Message :`, error);
        }
    }

    async selectState(state: string, city: string): Promise<void> {

        await this.page.locator(this.stateDropDown).click();
        await this.page.getByText(state, { exact: true }).click();

        await this.page.locator(this.cityDropDown).click();
        await this.page.getByText(city, { exact: true }).click();

    }

    async clickSubject(subjectSearch: string): Promise<void> {
        //this.page.locator('#react-select-2-option-0').click()

        try {
            // Check if the subject is available
            const subjectLocator = this.page.locator(`#react-select-2-option-0 >> text=${subjectSearch}`);
    
            // Ensure that the subject exists before clicking
            if ( await subjectLocator.count() > 0) {
                await subjectLocator.click();
                console.log(`Success - Selected subject: "${subjectSearch}"`);
            } else {
                throw new Error(`Subject not available: "${subjectSearch}"`);
            }
        } catch (error) {
            // Log the error if the subject is not available or there is any other issue
            console.error(`Error - Subject selection failed: ${error.message}`);
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
// This is a functional helper. Instead of using POMs, if the app has very well written data-test-ids, we can directly use functional helpers and skip a layer of abstraction. 

import { 
    Borrower, 
    capitalizeFirstLetter, 
    getPhoneNumberWithDashes, 
    getRegionFromProvince 
} from "../../support/utils";
import { selectDropdownOption } from '../common/dropdown';

export async function signupFlow(borrower: Borrower) {
    
    cy.get('[data-test-id="firstName"]').type(borrower.firstName);
    cy.get('[data-test-id="lastName"]').type(borrower.lastName);
    cy.get('[data-test-id="email"]').type(borrower.email);
    cy.get('[data-test-id="phone"]').type(borrower.phoneNumber);
    cy.get('[data-test-id="password"]').type(borrower.password);
    cy.get('[data-test-id="passwordConfirm"]').type(borrower.password);
    selectDropdownOption({
        selector: '[data-test-id="province"]',
        dropdown_option: borrower.province,
        typeOption: true,
    });
    if (borrower.agreeToTerms) {
        cy.get('[data-test-id="leadDistributeConsentAgreement"]').click();
    }
}

export function expectAccountToMatch(responseAccount: any, borrower: Borrower) {
    expect(responseAccount).to.deep.include({
        email: borrower.email,
        firstName: borrower.firstName,
        lastName: capitalizeFirstLetter(borrower.lastName), // UI auto capitalizes the first letter and does not allow any other capital letters
        phone: getPhoneNumberWithDashes(borrower.phoneNumber),
        region: getRegionFromProvince(borrower.province),
    });
}
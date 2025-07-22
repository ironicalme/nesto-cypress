import { generateBorrower } from '../support/utils';
import { LoginPage } from '../pages/login-page';
import { expectAccountToMatch, signupFlow } from '../helpers/signup/signup';
import { GetAQuotePage } from '../pages/get-a-quote';
import { LanguageHelper } from '../helpers/language-helper';
import { t } from '../support/translations';

describe('Sign Up Flow', () => {
    beforeEach(() => {
        cy.visit('/login')
        const loginPage = new LoginPage();
        loginPage.signupLink().click(); // Demonstrating POM method.
    });
    afterEach(() => {
        cy.clearAllCookies();
        cy.clearLocalStorage();
        cy.clearAllSessionStorage();
    });

    // Helper function to run the same test with different languages
    function runSignupTestWithLanguage(language: 'en' | 'fr' = 'en') {
        // Set the language for this test
        LanguageHelper.setLanguage(language);
        cy.log(`Running test with language: ${language}`);
        const borrower = generateBorrower();
        
        // cy.log(JSON.stringify(borrower));

        const toggleText = language === 'fr' ? 'FR' : 'EN';

        cy.get('[data-test-id="toggle-language"]').then($toggle => {
            if ($toggle.text().includes(toggleText)) {
                cy.wrap($toggle).click();
            }
        });
        
        const getAQuotePage = new GetAQuotePage();
        
        signupFlow(borrower); // Demonstrating functional helper method.
        cy.get('[data-test-id="createYourAccount"]').click();
        
        getAQuotePage.newMortgageContainer().should('be.visible');
        getAQuotePage.refinanceMyMortgageContainer().should('be.visible');
        getAQuotePage.mortgageRenewalContainer().should('be.visible');
        
        getAQuotePage.title().should('have.text', t('howCanWeHelpYouWithYourMortgage'));
        getAQuotePage.newMortgageTitle().should('have.text', t('newMortgage'));
        getAQuotePage.newMortgageDescription().should('have.text', t('iNeedAPreQualification'));
        getAQuotePage.refinanceMyMortgageTitle().should('have.text', t('refinanceMyMortgage'));
        getAQuotePage.refinanceMyMortgageDescription().should('have.text', t('iWantToRefinance'));
        getAQuotePage.mortgageRenewalTitle().should('have.text', t('mortgageRenewal'));
        getAQuotePage.mortgageRenewalDescription().should('have.text', t('iWantToRenewMyMortgage'));
    }

    it('should successfully sign up a borrower in English', () => {
        runSignupTestWithLanguage('en'); // Can pass in the language as a run time parameter. 
    });

    it('should successfully sign up a borrower in French', () => {
        runSignupTestWithLanguage('fr');
    });

    it('should successfully sign up a borrower, default language', () => {
        runSignupTestWithLanguage();
    });

    it('should throw error when required fields are empty', () => {
        cy.get('[data-test-id="createYourAccount"]').click();
        cy.get('[data-test-id="form-error-lastName"]').should('be.visible').should('have.text', t('required')).should('have.css', 'color', 'rgb(249, 66, 58)');
        cy.get('[data-test-id="form-error-email"]').should('be.visible').should('have.text', t('required')).should('have.css', 'color', 'rgb(249, 66, 58)');
        cy.get('[data-test-id="form-error-phone"]').should('be.visible').should('have.text', t('required')).should('have.css', 'color', 'rgb(249, 66, 58)');
        cy.get('[data-test-id="form-error-password"]').should('be.visible').should('have.text', t('required')).should('have.css', 'color', 'rgb(249, 66, 58)');
        cy.get('[data-test-id="form-error-passwordConfirm"]').should('be.visible').should('have.text', t('required')).should('have.css', 'color', 'rgb(249, 66, 58)');
    });

    it('should throw error when using invalid email', () => {
        const borrower = generateBorrower();
        borrower.email = 'abc#domain.com';
        signupFlow(borrower);
        cy.get('[data-test-id="createYourAccount"]').click();
        cy.get('[data-test-id="form-error-email"]').should('be.visible').should('have.text', t('invalidEmail')).should('have.css', 'color', 'rgb(249, 66, 58)');
    });

    it('should throw error when using a weak password', () => {
        const borrower = generateBorrower();
        borrower.password = 'abc';
        signupFlow(borrower);
        cy.get('[data-test-id="createYourAccount"]').click();
        cy.get('[data-test-id="form-error-password"]').should('be.visible').should('have.text', t('yourPasswordIsTooWeak')).should('have.css', 'color', 'rgb(249, 66, 58)');
    });

    it('should throw error when passwords do not match', () => {
        const borrower = generateBorrower();
        borrower.password = 'Sup3r5ecre7@';
        cy.get('[data-test-id="firstName"]').type(borrower.firstName);
        cy.get('[data-test-id="lastName"]').type(borrower.lastName);
        cy.get('[data-test-id="email"]').type(borrower.email);
        cy.get('[data-test-id="phone"]').type(borrower.phoneNumber);
        cy.get('[data-test-id="password"]').type(borrower.password);
        cy.get('[data-test-id="passwordConfirm"]').type(borrower.password + '1');
        cy.get('[data-test-id="form-error-passwordConfirm"]').should('be.visible').should('have.text', t('yourPasswordsDoNotMatch')).should('have.css', 'color', 'rgb(249, 66, 58)');
    });

    it('should throw error when terms are not agreed to', () => {
        const borrower = generateBorrower();
        borrower.agreeToTerms = false;
        signupFlow(borrower);
        cy.get('[data-test-id="createYourAccount"]').click();
        cy.get('[data-test-id="form-error-leadDistributeConsentAgreement"]').should('be.visible').should('have.text', t('required')).should('have.css', 'color', 'rgb(249, 66, 58)');
    });

    it('should throw error when trying to signup using the email of an already registered user', () => {
        const borrower = generateBorrower(
            {
                email: 'already_registered@domain.com',
                firstName: 'Already',
                lastName: 'Registered',
                phoneNumber: '1234567890'
            }
        );
        
        signupFlow(borrower);
        cy.get('[data-test-id="createYourAccount"]').click();
        cy.get('[data-test-id="toasts_duplicateAccount_title"]').should('be.visible').should('have.text', t('accountAlreadyExists'));
        cy.get('[data-test-id="toasts_duplicateAccount_message"]').should('be.visible').should('have.text', t('thisAccountAlreadyExistsPleaseLogIn'));
    });

    it('should throw error when using incomplete phone number', () => {
        const borrower = generateBorrower();
        borrower.phoneNumber = '12345678';
        signupFlow(borrower);
        cy.get('[data-test-id="createYourAccount"]').click();
        cy.get('[data-test-id="form-error-phone"]').should('be.visible').should('have.text', t('invalidPhoneNumber')).should('have.css', 'color', 'rgb(249, 66, 58)');
    });
    
    it('API: should return 201 when signing up a new borrower successfully', () => {
        const borrower = generateBorrower();
        borrower.province = "Alberta"
        cy.log(JSON.stringify(borrower));

        signupFlow(borrower);
        cy.intercept('POST', '/api/accounts').as('newBorrower');
        cy.get('[data-test-id="createYourAccount"]').click();
        // cy.wait('@newBorrower').then(console.log)
        cy.wait('@newBorrower').its('response').then(response => {
            expect(response.statusCode).to.eq(201);
            expectAccountToMatch(response.body.account, borrower);
        });
        // cy.get('@newBorrower').its('response.body.account').then(response => {
        //     cy.log(JSON.stringify(response));
        // });
        // cy.wait('@newBorrower').should('have.property', 'response.statusCode', 201);
        // cy.get('@newBorrower').then(response => {
        //     cy.log(JSON.stringify(response));
        // });

    });

}); 
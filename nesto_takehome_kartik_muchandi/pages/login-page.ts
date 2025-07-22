export class LoginPage {
    emailField() {
      return cy.get('[data-test-id="email"]');
    }
  
    passwordField() {
      return cy.get('[data-test-id="password"]');
    }
  
    submitButton() {
      return cy.get('[data-test-id="login"]');
    }

    forgotPasswordLink() {
        return cy.get('[data-test-id="form_signup_forgotPassword"]');
    }
    
    signupLink() {
        return cy.get('[data-test-id="loginPage_signUp"]');
    }

  }
  
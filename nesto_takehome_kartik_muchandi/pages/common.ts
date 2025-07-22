
export class UserMenu {
    loginButton() {
      return cy.get('[data-test-id="userMenu_login"]');
    }

    languageToggle() {
        return cy.get('[data-test-id="toggle-language"]');
    }
}
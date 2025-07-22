// This is a POM. If the app has well written components with data-test-ids, we can directly use functional helpers and skip a layer of abstraction. 
export class UserMenu {
    loginButton() {
      return cy.get('[data-test-id="userMenu_login"]');
    }

    languageToggle() {
        return cy.get('[data-test-id="toggle-language"]');
    }
}
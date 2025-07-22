export class GetAQuotePage {
    title() {
      return cy.get('[data-test-id="getAQuote_pageTitle"]');
    }
  
    newMortgageContainer() {
      return cy.get('[data-test-id="newMortgage"]');
    }
    
    newMortgageTitle() {
      return cy.get('[data-test-id="getAQuote_newMortgageTitle"]');
    }
    
    newMortgageDescription() {
      return cy.get('[data-test-id="getAQuote_newMortgageDesc"]');
    }
    
    refinanceMyMortgageContainer() {
      return cy.get('[data-test-id="refinance"]');
    }
    
    refinanceMyMortgageTitle() {
      return cy.get('[data-test-id="getAQuote_refinanceTitle"]');
    }
    
    refinanceMyMortgageDescription() {
      return cy.get('[data-test-id="getAQuote_refinanceDesc"]');
    }

    mortgageRenewalContainer() {
        return cy.get('[data-test-id="renewal"]');
    }
    
    mortgageRenewalTitle() {
      return cy.get('[data-test-id="getAQuote_renewalTitle"]');
    }
    
    mortgageRenewalDescription() {
      return cy.get('[data-test-id="getAQuote_renewalDesc"]');
    }

}
  
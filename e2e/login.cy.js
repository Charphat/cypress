import '../support/commands.js'

describe('Login', () => {
  it('login', () => {
      cy.loginUat();
      cy.goStore();
  });
});
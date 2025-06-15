Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.viewport(1024, 768)
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});
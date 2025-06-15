describe(`Cenário 1: Testes de Login - ${Cypress.browser.name}`, () => {
  it('CT-01: Validar login com credenciais válidas', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.url().should('include', '/inventory.html');
  });

  it('CT-02: Validar tentativa de login com credenciais inválidas', () => {
    cy.login('invalid_user', 'invalid_password');

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('CT-03: Validar tentativa de login sem informar a senha', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Password is required');
  });

  it('CT-04: Validar tentativa de login sem informar o usuário', () => {
    cy.visit('/');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username is required');
  }) 
});
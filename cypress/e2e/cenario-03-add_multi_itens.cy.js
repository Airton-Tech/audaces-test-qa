
describe(`Cenário 3: Manipulação de Múltiplos Itens no Carrinho - ${Cypress.browser.name}`, () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });

  it('CT-07: Adicionar 2 produtos, remover um e validar a quantidade', () => {
    // Adiciona dois produtos
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Valida a quantidade no ícone
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Remove um item
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();

    // Validações
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.contains('Sauce Labs Bolt T-Shirt').should('not.exist');
    cy.contains('Sauce Labs Bike Light').should('be.visible');
  });

  it('CT-08: Adicionar 3 produtos, remover um e validar a quantidade', () => {
    // Adiciona dois produtos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    // Valida a quantidade no ícone
    cy.get('.shopping_cart_badge').should('have.text', '3');

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Remove um item
    cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();

    // Validações
    cy.get('.shopping_cart_badge').should('have.text', '2');
    cy.contains('Test.allTheThings() T-Shirt (Red)').should('not.exist');
    cy.contains('Sauce Labs Backpack').should('be.visible');
    cy.contains('Sauce Labs Fleece Jacket').should('be.visible');
  });

  it('CT-09: Adicionar 3 produtos, remover todos e validar que o carrinho está vazio', () => {
    // Adiciona dois produtos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    // Valida a quantidade no ícone
    cy.get('.shopping_cart_badge').should('have.text', '3');

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Remove um item
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').click();

    // Validações
    cy.get('.shopping_cart_badge').should('not.exist');
    cy.contains('Test.allTheThings() T-Shirt (Red)').should('not.exist');
    cy.contains('Sauce Labs Backpack').should('not.exist');
    cy.contains('Sauce Labs Fleece Jacket').should('not.exist');
  });
});
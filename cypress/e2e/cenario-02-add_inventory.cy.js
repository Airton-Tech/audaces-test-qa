describe(`Cenário 2: Funcionalidade de Adicionar ao Carrinho - ${Cypress.browser.name} - ${Cypress.isBrowser('headed') ? 'headed' : 'headless'}`, () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });

  it('CT-05: Adicionar o produto "Sauce Labs Bolt T-Shirt" ao carrinho pela página principal (/inventory)', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .parents('.inventory_item')
      .find('button')
      .click();

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt')
      .parents('.inventory_item')
      .find('button')
      .should('have.text', 'Remove');
  });

  it('CT-06: Adicionar o produto "Sauce Labs Bolt T-Shirt" ao carrinho pela página do item (/inventory-item)', () => {
    cy.get('[data-test="inventory-item-name"]')
      .contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt')
      .click();
    cy.get('[data-test="add-to-cart"]')
      .click();
    
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    cy.get('[data-test="inventory-container"]')
      .find('button')
      .should('have.text', 'Remove');
  });
});
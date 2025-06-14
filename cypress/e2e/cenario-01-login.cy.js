describe(`Cenário 1: Testes de Login - ${Cypress.browser.name} - ${Cypress.isBrowser('headed') ? 'headed' : 'headless'}`, () => {
  it('CT-01: Validar login com credenciais válidas', () => {
    cy.login('standard_user', 'secret_sauce');

    cy.url().should('include', '/inventory.html');
  });

  it('CT-02: Validar tentativa de login com credenciais inválidas', () => {
    cy.login('invalid_user', 'secret_sauce');

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('CT-03: Validar tentativa de login sem informar a senha', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('invalid_user');
    //cy.get('[data-test="password"]').type('invalid'); // Deixa o campo de senha vazio
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Password is required');
  });

  it('CT-04: Validar tentativa de login sem informar o usuário', () => {
    cy.visit('/');
    //cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('invalid'); // Deixa o campo de senha vazio
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username is required');
  }) 
});




/* describe('Cenário 2: Funcionalidade de Adicionar ao Carrinho', () => {
  beforeEach(() => {
    // Pré-condição: Fazer login antes de cada teste deste bloco
    cy.login('standard_user', 'secret_sauce');
  });

  it('CT-03: Deve adicionar o produto "Sauce Labs Bolt T-Shirt" ao carrinho', () => {
    // Acha o item pelo nome, sobe para o elemento pai e encontra o botão
    cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt')
      .parents('.inventory_item')
      .find('button')
      .click();

    // Validações
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.contains('.inventory_item_name', 'Sauce Labs Bolt T-Shirt')
      .parents('.inventory_item')
      .find('button')
      .should('have.text', 'Remove');
  });
});

describe('Cenário 3: Manipulação de Múltiplos Itens no Carrinho', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });

  it('CT-04: Deve adicionar múltiplos produtos, remover um e validar a quantidade', () => {
    // Adiciona dois produtos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Valida a quantidade no ícone
    cy.get('.shopping_cart_badge').should('have.text', '2');

    // Vai para o carrinho
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');

    // Remove um item
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // Validações
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.contains('Sauce Labs Backpack').should('not.exist');
    cy.contains('Sauce Labs Bike Light').should('be.visible');
  });
});

describe('Cenário 4: Fluxo de Checkout', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
  });

  it('CT-05: Deve adicionar um produto ao carrinho e finalizar a compra com sucesso', () => {
    // Adiciona um produto
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    // Inicia o checkout
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Preenche os dados do comprador
    cy.get('[data-test="firstName"]').type('Teste');
    cy.get('[data-test="lastName"]').type('QA');
    cy.get('[data-test="postalCode"]').type('01001-000');
    cy.get('[data-test="continue"]').click();

    // Valida a página de overview e as informações
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', 1);
    cy.contains('Payment Information').should('be.visible');
    cy.contains('Shipping Information').should('be.visible');
    cy.get('.summary_total_label').should('contain.text', 'Total: $8.63'); // Exemplo de validação do total

    // Finaliza a compra
    cy.get('[data-test="finish"]').click();

    // Valida a conclusão do pedido
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });
});

*/
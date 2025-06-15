
describe(`Cenário 4: Fluxo de Checkout - ${Cypress.browser.name} - ${Cypress.isBrowser('headed') ? 'headed' : 'headless'}`, () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce');
   });

  it('CT-10: Deve adicionar um produto ao carrinho e finalizar a compra com sucesso', () => {
    // Adiciona um produto
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Inicia o checkout :Your Cart
    cy.get('[data-test="shopping-cart-link"]').click();
      
    //Armazena o valor do item no carrinho para comparação no checkout
    cy.get('[data-test="inventory-item-price"]').invoke('text').then((texto) => {
      cy.wrap(texto).as('valueText');
    });

    // Continuando o checkout :Your Cart
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Preenche os dados do comprador : Your Information
    cy.get('[data-test="firstName"]').type('Airton');
    cy.get('[data-test="lastName"]').type('França');
    cy.get('[data-test="postalCode"]').type('69830-000');
    cy.get('[data-test="continue"]').click();

    // Valida a página de confirmação e as informações : Overview
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', 1);
    cy.get('[data-test="payment-info-label"]').contains('Payment Information:').should('be.visible');
    cy.get('[data-test="payment-info-value"]').should('have.text', 'SauceCard #31337');
    cy.get('[data-test="shipping-info-label"]').contains('Shipping Information:').should('be.visible');
    cy.get('[data-test="shipping-info-value"]').should('have.text', 'Free Pony Express Delivery!');
    cy.get('[data-test="payment-info-label"]').contains('Payment Information:').should('be.visible');
    cy.get('[data-test="total-info-label"]').contains('Price Total').should('be.visible');
    // Valida o valor do item no subtotal
    cy.get('@valueText').then((value) => {
      cy.get('[data-test="subtotal-label"]').should('have.text', `Item total: valor`.replace('valor', value));
    });
    // Valida o valor da taxa (8%)    
    cy.get('@valueText').then((value) => {
      const numericValue = parseFloat(value.replace('$', '').trim());
      const valueTax = numericValue * 0.08;
      cy.wrap(valueTax).as('valueTax');
      cy.get('[data-test="tax-label"]').should('have.text', `Tax: $${valueTax.toFixed(2)}`);
    });
    // Valida o valor total
    cy.get('@valueText').then((value) => {
      cy.get('@valueTax').then((valueTax) => {
        const totalValue = parseFloat(value.replace('$', '').trim()) + valueTax;
        cy.get('[data-test="total-label"]').should('have.text', `Total: $${totalValue.toFixed(2)}`);
      });
    });
    
    // Finaliza a compra
    cy.get('[data-test="finish"]').click();

    // Valida a conclusão do pedido
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

  it('CT-11: Deve adicionar três produtos ao carrinho e finalizar a compra com sucesso', () => {
    // Adiciona três produtos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

    // Inicia o checkout :Your Cart
    cy.get('[data-test="shopping-cart-link"]').click();
      
    //Armazena os valores dos itens no carrinho para comparação no checkout
    cy.get('[data-test="inventory-item-price"]').then($prices => {
    let sum = 0;
    $prices.each((i, el) => {
      const val = parseFloat(el.innerText.replace('$', '').trim());
      sum += val;
    });
    // Formata para string com cifrão, 2 casas decimais
    const formattedSum = `$${sum.toFixed(2)}`;
    cy.wrap(formattedSum).as('valueText');
  });

    // Continuando o checkout :Your Cart
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    // Preenche os dados do comprador : Your Information
    cy.get('[data-test="firstName"]').type('Airton');
    cy.get('[data-test="lastName"]').type('França');
    cy.get('[data-test="postalCode"]').type('69830-000');
    cy.get('[data-test="continue"]').click();

    // Valida a página de confirmação e as informações : Overview
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', 3);
    cy.get('[data-test="payment-info-label"]').contains('Payment Information:').should('be.visible');
    cy.get('[data-test="payment-info-value"]').should('have.text', 'SauceCard #31337');
    cy.get('[data-test="shipping-info-label"]').contains('Shipping Information:').should('be.visible');
    cy.get('[data-test="shipping-info-value"]').should('have.text', 'Free Pony Express Delivery!');
    cy.get('[data-test="payment-info-label"]').contains('Payment Information:').should('be.visible');
    cy.get('[data-test="total-info-label"]').contains('Price Total').should('be.visible');
    // Valida o valor do itens no subtotal
    cy.get('@valueText').then((value) => {
      cy.get('[data-test="subtotal-label"]').should('have.text', `Item total: ${value}`);
    });
    // Valida o valor da taxa (8%)    
    cy.get('@valueText').then((value) => {
      const numericValue = parseFloat(value.replace('$', '').trim());
      const valueTax = numericValue * 0.08;
      cy.wrap(valueTax).as('valueTax');
      cy.get('[data-test="tax-label"]').should('have.text', `Tax: $${valueTax.toFixed(2)}`);
    });
    // Valida o valor total
    cy.get('@valueText').then((value) => {
      cy.get('@valueTax').then((valueTax) => {
        const numericValue = parseFloat(value.replace('$', '').trim());
        const totalValue = numericValue + valueTax;
        cy.get('[data-test="total-label"]').should('have.text', `Total: $${totalValue.toFixed(2)}`);
      });
    });
    
    // Finaliza a compra
    cy.get('[data-test="finish"]').click();

    // Valida a conclusão do pedido
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });
});
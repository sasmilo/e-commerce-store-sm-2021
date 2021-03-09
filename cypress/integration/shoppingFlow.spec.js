// import { ShoppingFlow } from './shoppingFlowComponent.spec';

// ShoppingFlow();

// export function ShoppingFlow() {
describe('ShoppingFlow', () => {
  it('Add to cart, change quantity and remove from cart', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy="header-products"]')
      // ...and click on that element

      .click();

    cy.get('[data-cy=product-17]').click();

    cy.get('[data-cy="button-add-to-cart"]').click();

    cy.get('[data-cy="product-page-amount-in-cart"]').should(
      'contain.text',
      '1',
    );

    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '1');

    cy.get('[data-cy="button-add-to-cart"]').click();

    cy.get('[data-cy="product-page-amount-in-cart"]').should(
      'contain.text',
      '2',
    );

    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '2');

    cy.get('[data-cy="button-remove-from-cart"]').click();

    cy.get('[data-cy="product-page-amount-in-cart"]').should(
      'contain.text',
      '1',
    );

    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '1');

    cy.get('[data-cy="header-products"]')
      // ...and click on that element

      .click();

    cy.get('[data-cy=product-16]').click();

    cy.get('[data-cy="button-add-to-cart"]').click();

    cy.get('[data-cy="product-page-amount-in-cart"]').should(
      'contain.text',
      '1',
    );
    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '2');

    cy.get('[data-cy="button-remove-from-cart"]').click();

    cy.get('[data-cy="product-page-amount-in-cart"]').should(
      'contain.text',
      '0',
    );

    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '1');

    cy.get('[data-cy="link-go-to-cart"]').click();

    cy.get('[data-cy="cart-button-add-to-cart"]').click();

    cy.get('[data-cy="amount-of-one-product-in-cart"]').should(
      'contain.text',
      '2',
    );

    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '2');
    cy.get('[data-cy="cart-button-remove-from-cart"]').click();

    cy.get('[data-cy="amount-of-one-product-in-cart"]').should(
      'contain.text',
      '1',
    );

    cy.get('[data-cy="header-items-in-the-cart"]').should('contain.text', '1');

    cy.get('[data-cy="go-back-to-shop"]').click();
  });
});

// Cypress.Cookies.preserveOnce('cart');
// }

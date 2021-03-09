// import { CheckoutFlow } from './checkoutFlowComponent.spec';
// import { ShoppingFlow } from './shoppingFlowComponent.spec';

// ShoppingFlow();
// CheckoutFlow();

describe('CheckoutFlow', () => {
  it('Add to cart, change quantity and remove from cart', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy="header-products"]')
      // ...and click on that element

      .click();

    cy.get('[data-cy=product-20]').click();

    cy.get('[data-cy="button-add-to-cart"]').click();

    cy.get('[data-cy="link-go-to-cart"]').click();

    cy.get('[data-cy="go-to-checkout"]').click();

    cy.get('[data-cy=input-first-name]').type('Sasa');

    cy.get('[data-cy=input-last-name]').type('Sasa');

    cy.get('[data-cy="input-email"]').type('myemail@domain.com');

    cy.get('[data-cy="input-address"]').type('Marxergasse 24');

    cy.get('[data-cy="input-city"]').type('Wien');

    cy.get('[data-cy="input-zip"]').type('1030');

    cy.get('[data-cy="input-card-number"]').type('123456789123');

    cy.get('[data-cy="button-buy-now"]').click();

    cy.get('[data-cy="thank-you"]').should('be.visible');

    cy.get('[data-cy="header-cart"]').click();

    cy.get('[data-cy="final-value-of-the-empty-cart"]').should(
      'contain.text',
      '0',
    );
  });
});



describe('CheckoutFlow', () => {
  it('Buy the product, go to cart, go to checkout page, go to thank you page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy="header-products"]')
      // ...and click on that element

      .click();

    cy.get('[data-cy="product-page-content"]', { timeout: 10000 });

    cy.get('li').eq(1).find('a').click();

    cy.get('[data-cy="button-add-to-cart"]').click();

    cy.get('[data-cy="link-go-to-cart"]').click();

    cy.get('[data-cy="go-to-checkout"]', { timeout: 10000 }).click();

    cy.location('pathname').should('match', /\/checkout$/);

    cy.get('[data-cy=input-first-name]').type('Sasa');

    cy.get('[data-cy=input-last-name]').type('Sasa');

    cy.get('[data-cy="input-email"]').type('myemail@domain.com');

    cy.get('[data-cy="input-address"]').type('Marxergasse 24');

    cy.get('[data-cy="input-city"]').type('Wien');

    cy.get('[data-cy="input-zip"]').type('1030');

    cy.get('[data-cy="input-card-number"]').type('123456789123');

    cy.get('[data-cy="button-buy-now"]').click();

    cy.location('pathname').should('match', /\/thankyou$/);

    cy.get('[data-cy="thank-you"]').should('be.visible');

    cy.get('[data-cy="header-cart"]').click();

    cy.get('[data-cy="final-value-of-the-empty-cart"]').should(
      'contain.text',
      '0',
    );
  });
});

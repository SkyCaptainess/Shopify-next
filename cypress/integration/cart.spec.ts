/// <reference path="../support/index.js" />

describe('Cart', () => {
  it('should add and remove item cart', () => {
    cy.visit('/products');

    //Find first product
    cy.get('[data-cy=product-card]').eq(0).click();

    // add to cart
    cy.findByRole('button', { name: /add to cart/i }).click();
    cy.findByText('Successfully added to cart.').should('exist');
    cy.findByRole('button', { name: 'cart' }).click();
    cy.get('[data-cy=cart-item-count]').should('have.text', '1');

    cy.get('[data-cy=cart-list]').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1);

      // remove item from cart
      cy.findByRole('listitem')
        .eq(0)
        .within(() => {
          cy.findByRole('button', { name: /remove cart item/i }).click();
        });
    });

    cy.findByText('Your cart is empty :(').should('exist');
    cy.get('[data-cy=cart-list]').should('not.exist');
  });
});

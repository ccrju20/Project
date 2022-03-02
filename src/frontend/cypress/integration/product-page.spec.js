/// <reference types="cypress" />

describe("Product Page", () => {

  // Add to Cart from Product page - 1 product
  it("should add product to cart", () => {
    cy.addToCartFromProductPage(4); // pass product id
      cy.assertSnackbarAndBadge(1); // pass in total cart items
      cy.assertCartDrawer(4, 1); // pass in product id and amount

    // pass in array of objects(products) with id, qty, option
    // option always 1 by default unless testing product options
    cy.assertCartTotal([
      { id: 2, qt: 1, option: 1 },
    ]);
  });

  // Add to Cart from Product page - more than 1 product
  it("should add 2 products to cart", () => {
    cy.addToCartFromProductPage(1);
      cy.assertSnackbarAndBadge(1); 
      cy.assertCartDrawer(1, 1);

    cy.addToCartFromProductPage(2);
      cy.assertSnackbarAndBadge(2);
      cy.assertCartDrawer(2, 1);

    cy.assertCartTotal([
      { id: 1, qt: 1, option: 1 },
      { id: 2, qt: 1, option: 1 },
    ]);
  });

  // Increase quantity and Add to Cart
  it("should increase qty and add product to cart", () => {
    cy.addProductWithQuantity(1, 2); // pass product id and qty
      cy.assertSnackbarAndBadge(1);
      cy.assertCartDrawer(1, 2);

    cy.addProductWithQuantity(4, 3);
      cy.assertSnackbarAndBadge(2);
      cy.assertCartDrawer(4, 3);

    cy.assertCartTotal([
      { id: 1, qt: 2, option: 1 },
      { id: 4, qt: 3, option: 1 },
    ]);
  });

  // Select size option and Add to Cart
  it("should select different size and add product to cart", () => {
    cy.addProductWithOption(7, 3, 2) // pass product id, optionNo, qty
      cy.assertSnackbarAndBadge(1);
      cy.assertCartDrawerProductOptions(7, 3, 2) // pass in productId, optionNo, qty
    
    cy.addProductWithOption(1, 2, 1)
      cy.assertSnackbarAndBadge(2);
      cy.assertCartDrawerProductOptions(1, 2, 1) 

    cy.assertCartTotal([
      { id: 7, qt: 2, option: 3 },
      { id: 1, qt: 1, option: 2 },
    ]);
  });
});

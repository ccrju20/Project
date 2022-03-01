/// <reference types="cypress" />

describe("Product Page", () => {
  // Add to Cart from Product page
  it("should add product to cart", () => {
    cy.addToCartFromProductPage(2); // pass product id
    cy.assertSnackbarAndBadge(1); // pass in total cart items
    cy.assertCartDrawer(2, 1); // pass in product id and amount

    cy.addToCartFromProductPage(1);
    cy.assertSnackbarAndBadge(2);
    cy.assertCartDrawer(1, 1);

    // pass in array of objects(products) with id, qty, option
    cy.assertCartTotal([
      { id: 2, qt: 1, option: 1 },
      { id: 1, qt: 1, option: 1 },
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
    cy.addProductWithOption(1, 2) // pass product id and optionNo
    cy.assertSnackbarAndBadge(1);

    cy.get(".makeStyles-carticon-11").eq(1).click();

    cy.assertCartTotal([
      { id: 1, qt: 1, option: 2 },
    ]);
  });
});

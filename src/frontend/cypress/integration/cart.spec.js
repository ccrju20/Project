/// <reference types="cypress" />

describe("Cart Page", () => {
  // Verify the correct amount of items in Cart
  it("should have 1 item in cart page", () => {
    cy.addOneToCart(1);
      cy.assertCartPage(1, 1, 1) // prodId, position, qty
    cy.contains("You have 1 item(s) in your cart").should("be.visible");
  });

  it("should have 2 items in cart page", () => {
    cy.addTwoToCart(1, 9);
      cy.assertCartPage(1, 1, 1)
      cy.assertCartPage(9, 2, 1)
    cy.contains("You have 2 item(s) in your cart").should("be.visible");
  });

  // Update 1 item quantity (increase) and verify correct total amount
  it("should update item quantity - increase", () => {
    cy.addProductWithQuantity(1, 1);
      cy.assertCartPage(1, 1, 1)
      cy.assertCartTotal([
        { id: 1, qt: 1, option: 1 },
      ]);

    cy.updateItem(1, true)
      cy.assertCartPage(1, 1, 2)
      cy.assertCartTotal([
          { id: 1, qt: 2, option: 1 },
      ]);
  })

  // Update 1 item quantity (decrease) and verify correct total amount
  it("should update item quantity - decrease", () => {
    cy.addProductWithQuantity(1, 2);
      cy.assertCartPage(1, 1, 2)
      cy.assertCartTotal([
        { id: 1, qt: 2, option: 1 },
      ]);

    cy.updateItem(1, false)
      cy.assertCartPage(1, 1, 1);
      cy.assertCartTotal([
        { id: 1, qt: 1, option: 1 },
      ]);
  })

  // Update 2 item quantities (2 increase) and verify correct total amount
  it("should update 2 item quantities - increase", () => {
    cy.addProductWithQuantity(1, 1);
      cy.assertCartPage(1, 1, 1)
    cy.addProductWithQuantity(2, 1);
      cy.assertCartPage(2, 2, 1)
    cy.assertCartTotal([
      { id: 1, qt: 1, option: 1 },
      { id: 2, qt: 1, option: 1 },
    ]);

    cy.updateItem(1, true)
      cy.assertCartPage(1, 1, 2)
    cy.updateItem(2, true)
      cy.assertCartPage(2, 2, 2)
    cy.assertCartTotal([
      { id: 1, qt: 2, option: 1 },
      { id: 2, qt: 2, option: 1 },
    ]);
  })

  // Update 2 item quantities (1 increase 1 decrease) and verify correct total amount
  it("should update 2 item quantities - 1 increase, 1 decrease", () => {
    cy.addOneToCart(1);
      cy.assertCartPage(1, 1, 1)
    cy.addProductWithQuantity(4, 2);
      cy.assertCartPage(4, 2, 2)
    cy.assertCartTotal([
      { id: 1, qt: 1, option: 1 },
      { id: 4, qt: 2, option: 1 },
    ]);

    cy.updateItem(1, true)
      cy.assertCartPage(1, 1, 2)
    cy.updateItem(2, false)
      cy.assertCartPage(4, 2, 1)
    cy.assertCartTotal([
      { id: 1, qt: 2, option: 1 },
      { id: 4, qt: 1, option: 1 },
    ]);
  })

  // Update 2 item quantities (2 decrease) and verify correct total amount
  it("should update 2 item quantities - decrease", () => {
    cy.addProductWithQuantity(1, 2);
      cy.assertCartPage(1, 1, 2)
    cy.addProductWithQuantity(4, 2);
      cy.assertCartPage(4, 2, 2)
    cy.assertCartTotal([
      { id: 1, qt: 2, option: 1 },
      { id: 4, qt: 2, option: 1 },
    ]);

    cy.updateItem(1, false)
      cy.assertCartPage(1, 1, 1)
    cy.updateItem(2, false)
      cy.assertCartPage(4, 2, 1)
    cy.assertCartTotal([
      { id: 1, qt: 1, option: 1 },
      { id: 4, qt: 1, option: 1 },
    ]);
  })

  // Empty the cart
  it("should display empty cart after removing", () => {
    cy.addOneToCart(1);
      cy.assertCartPage(1, 1, 1)
      cy.get("[data-cy='delete']").click();

    cy.contains("You have 0 item(s) in your cart").should("be.visible")
    cy.get("[type='submit']").should("contain", "Continue Shopping")
  })
});

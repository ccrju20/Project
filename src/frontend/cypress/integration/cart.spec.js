/// <reference types="cypress" />

describe("Cart Page", () => {
  beforeEach(() => {
    cy.fixture("products").then((json) => {
      cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
    });
    cy.visit("/shop");
  });

//   // Verify the correct amount of items in Cart
//   it("should have 1 item in cart page", () => {
//     cy.addOneToCart(1);
//     cy.contains("Go to Cart").click();
//     cy.contains("You have 1 item(s) in your cart").should("be.visible");
//     cy.contains("Product 1").should("be.visible");
//   });

//   it("should have 2 items in cart page", () => {
//     cy.addTwoToCart(1, 9);
//     cy.contains("Go to Cart").click();
//     cy.contains("You have 2 item(s) in your cart").should("be.visible");
//     cy.contains("Product 1").should("be.visible");
//     cy.contains("Product 9").should("be.visible");
//   });

  // Update 1 item quantity (increase) and verify correct total amount
  it("should update item quantity", () => {
      cy.increaseProductQty(7, 1);
  })

  // Update 1 item quantity (decrease) and verify correct total amount

  // Update 2 item quantities (2 increase) and verify correct total amount

  // Update 2 item quantities (1 increase 1 decrease) and verify correct total amount

  // Update 2 item quantities (2 decrease) and verify correct total amount
});

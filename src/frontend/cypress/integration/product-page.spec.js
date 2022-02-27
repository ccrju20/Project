/// <reference types="cypress" />

describe("Product Page", () => {
  beforeEach(() => {
    cy.fixture("products").then((json) => {
      cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
    });
    cy.visit("/shop");
  });

  // Add to Cart from Product page
  it("should add product to cart", () => {
    // pass product id
    cy.addToCartFromProductPage(2);
  });

  // Increase quantity and Add to Cart
  it("should increase qty and add product to cart", () => {
    // pass product id and qty
    cy.increaseProductQty(1, 1);
  });

  // Select size option and Add to Cart
  it("should select different size and add product to cart", () => {
    cy.contains("Product 1").click();

    cy.get(".MuiFormControl-root").click();
    cy.get("[data-value='2']").click();
    cy.contains("$9.99").should("be.visible");

    cy.contains("Add to Cart").click();
    cy.contains("Added to Cart!").should("be.visible");
    cy.get(".makeStyles-badge-12").should("contain", "1");

    cy.get(".makeStyles-carticon-11").first().click();
    cy.contains("size 4").should("be.visible");
    cy.contains("Total: $9.99").should("be.visible");
  });
});

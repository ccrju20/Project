/// <reference types="cypress" />

describe("Shop", () => {
  // Get Products
  it("should display a list of products from server", () => {
    cy.visit("/shop");
    cy.get(".MuiCardMedia-root").should("have.length", 9);
  });

  it("should mock display a list of products", () => {
    cy.intercept("GET", "api/v1/products?category=all&page=1", {
      fixture: "products.json",
    });
    cy.visit("/shop");

    cy.get(".MuiCardMedia-root").should("have.length", 9);
    cy.get("span").contains("Product 1").should("be.visible");
  });

  // Pagination
  it("should display second page of products from server", () => {
    cy.visit("/shop");
    cy.get("[aria-label='Go to page 2']").click();
    cy.get(".MuiCardMedia-root").should("have.length", 3);
  });

  it("should mock display second page of products", () => {
    cy.intercept("GET", "api/v1/products?category=all&page=2", {
      fixture: "products-page2.json",
    });
    cy.visit("/shop");

    cy.get("[aria-label='Go to page 2']").click();
    cy.get(".MuiCardMedia-root").should("have.length", 2);
    cy.get("span").contains("Product 10").should("be.visible");
  });

  // Add to Cart from Shop page
  it("should add 1 product to cart", () => {
    cy.addOneToCart(1); // pass in product id
    cy.contains("Added to Cart!").should("be.visible");
    cy.get(".MuiBadge-badge").should("contain", "1");

    cy.get(".makeStyles-carticon-12").first().click();
    cy.contains("You have 1 item(s) in your cart").should("be.visible");
  });

  // Add 2 different items to Cart from Shop page
  it("should add 2 products to cart", () => {
    cy.addTwoToCart(1, 2); // pass in product ids
    cy.contains("Added to Cart!").should("be.visible");
    cy.get(".MuiBadge-badge").should("contain", "2");

    cy.get(".makeStyles-carticon-12").first().click();
    cy.contains("You have 2 item(s) in your cart").should("be.visible");
  });

  // Get Products by Category
  it("should mock get products by category", () => {
    cy.selectCategory("cookie");
    cy.get(".MuiCardMedia-root").should("have.length", 1);

    cy.selectCategory("cake");
    cy.get(".MuiCardMedia-root").should("have.length", 2);
  });

  // Search Product
  it("should mock find products by search", () => {
    cy.fixture("products").then((json) => {
      cy.intercept(
        "GET",
        "api/v1/products/all",
        json.products
      );
    });

    cy.visit("/shop");
    cy.get("[placeholder='Search']").click().type("product 1");
    cy.get(".MuiCardMedia-root").should("have.length", 1);
  });
});

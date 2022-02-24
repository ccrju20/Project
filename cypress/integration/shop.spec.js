/// <reference types="cypress" />

describe("Shop", () => {
  // Get Products
  it("should display a list of products from server", () => {
    cy.visit("/shop");
    cy.get(".MuiCardMedia-root").should("have.length", 9);
  });

  it("should mock display a list of products", () => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=1", {
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
    cy.get(".MuiCardMedia-root").should("have.length", 1);
  });

  it("should mock display second page of products", () => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=2", {
      fixture: "products-page2.json",
    });
    cy.visit("/shop");

    cy.get("[aria-label='Go to page 2']").click();
    cy.get(".MuiCardMedia-root").should("have.length", 2);
    cy.get("span").contains("Product 10").should("be.visible");
  });

  // Add to Cart from Shop page
  it("should add 1 product to cart", () => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=1", {
      fixture: "products.json",
    });
    cy.visit("/shop");
    cy.get("span").contains("+ Add").click();
    cy.contains("Added to Cart!").should("be.visible");
    cy.get(".makeStyles-badge-12").should("contain", "1");

    cy.get(".makeStyles-carticon-11").first().click();
    cy.contains("You have 1 item(s) in your cart").should("be.visible");
  });

  // Get Products by Category
  it("should mock get products by category", () => {
    cy.intercept(
      "GET",
      "http://localhost:8080/api/products?category=Cake&page=1",
      {
        fixture: "products-page2",
      }
    );
    cy.visit("/shop");

    cy.get("span").contains("Cake").click();
    cy.get(".MuiCardMedia-root").should("have.length", 2);
  });

  // Search Product
  it("should mock find products by search", () => {
    cy.fixture('products').then((json) => {
      cy.intercept('GET', 'http://localhost:8080/api/products/all', json.products)
    })

    cy.visit("/shop");
    cy.get("[placeholder='Search']").click().type("product 1")
    cy.get(".MuiCardMedia-root").should("have.length", 1);
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { times } from "lodash";

Cypress.Commands.add("getByTestId", (testId) => {
  cy.get(`[data-cy='${testId}']`);
});

// Add to Cart from Shop Page (passing in product number)
Cypress.Commands.add("addOneToCart", (productNumber) => {
  cy.intercept("GET", "http://localhost:8080/api/products?page=1", {
    fixture: "products.json",
  });
  cy.visit("/shop");

  cy.get("[class='MuiButton-label']")
    .eq(productNumber - 1)
    .click();
  cy.contains("Added to Cart!").should("be.visible");
  cy.get(".makeStyles-badge-12").should("contain", "1");

  cy.get(".makeStyles-carticon-11").first().click();
  cy.contains("You have 1 item(s) in your cart").should("be.visible");
});

Cypress.Commands.add("addTwoToCart", (productNumber, productNumberTwo) => {
  cy.intercept("GET", "http://localhost:8080/api/products?page=1", {
    fixture: "products.json",
  });
  cy.visit("/shop");

  cy.get("[class='MuiButton-label']")
    .eq(productNumber - 1)
    .click();
  cy.contains("Added to Cart!").should("be.visible");
  cy.get(".makeStyles-badge-12").should("contain", "1");

  cy.get("[class='MuiButton-label']")
    .eq(productNumberTwo - 1)
    .click();
  cy.contains("Added to Cart!").should("be.visible");
  cy.get(".makeStyles-badge-12").should("contain", "2");
  cy.get(".makeStyles-carticon-11").first().click();
  cy.contains("You have 2 item(s) in your cart").should("be.visible");
});

// Add to Cart from Product page passing in product ID
Cypress.Commands.add("addToCartFromProductPage", (productId) => {
  cy.fixture("products").then((json) => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
  });
  cy.visit("/shop");

  cy.contains(`Product ${productId}`).click();
  cy.contains("Add to Cart").click();
  cy.contains("Added to Cart!").should("be.visible");
  cy.get(".makeStyles-badge-12").should("contain", "1");

  cy.get(".makeStyles-carticon-11").eq(1).click();
  cy.contains(`Product ${productId} (1)`).should("be.visible");

  cy.fixture("products").then((json) => {
    cy.get(
      "[class='MuiTypography-root MuiTypography-h5 MuiTypography-alignCenter']"
    ).should(
      "contain",
      json.products[productId - 1].options[0].price
    );
  });
});

// Increase Product Qty from Product page passing in product ID and amount
Cypress.Commands.add("increaseProductQty", (productId, qtyAmount) => {
  cy.fixture("products").then((json) => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
  });
  cy.visit("/shop");

  cy.contains(`Product ${productId}`).click();
  _.times(qtyAmount, () =>
    cy.get("[data-testid='AddCircleOutlineTwoToneIcon']").click()
  );
  const totalQty = qtyAmount + 1;
  cy.get(".MuiTypography-h6").should("contain", `${totalQty}`);

  cy.contains("Add to Cart").click();
  cy.contains("Added to Cart!").should("be.visible");
  cy.get(".makeStyles-badge-12").should("contain", "1");

  cy.get(".makeStyles-carticon-11").eq(1).click();
  cy.contains(`Product ${productId} (${totalQty})`).should("be.visible");

  cy.fixture("products").then((json) => {
    cy.get(
      "[class='MuiTypography-root MuiTypography-h5 MuiTypography-alignCenter']"
    ).should(
      "contain",
      (json.products[productId - 1].options[0].price * totalQty).toFixed(2)
    );
  });
});

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
});

Cypress.Commands.add("addTwoToCart", (productNumber, productNumberTwo) => {
  cy.intercept("GET", "http://localhost:8080/api/products?page=1", {
    fixture: "products.json",
  });
  cy.visit("/shop");

  cy.get("[class='MuiButton-label']")
    .eq(productNumber - 1)
    .click();

  cy.get("[class='MuiButton-label']")
    .eq(productNumberTwo - 1)
    .click();
});

// Select Category from Shop Page
Cypress.Commands.add("selectCategory", (category) => {
  cy.fixture("products").then((json) => {
    const theProducts = json.products.filter(
      (product) => product.category === category
    );
    const alteredProducts = { ...json, products: theProducts };
    cy.intercept(
      "GET",
      `http://localhost:8080/api/products?category=${category}&page=1`,
      alteredProducts
    );
  });
  cy.visit("/shop");

  cy.get("span").contains(`${category}`).click();
});

// Assert Snackbar and Cart Icon Badge
Cypress.Commands.add("assertSnackbarAndBadge", (totalCartItems) => {
  cy.contains("Added to Cart!").should("be.visible");
  cy.get(".makeStyles-badge-12").should("contain", `${totalCartItems}`);
});

// Assert Cart Drawer
Cypress.Commands.add("assertCartDrawer", (productId, qty) => {
  cy.get(".makeStyles-carticon-11").eq(1).click();

  cy.contains(`Product ${productId} (${qty})`).should("be.visible");
});

// Assert Cart Drawer for Products with Options
Cypress.Commands.add(
  "assertCartDrawerProductOptions",
  (productId, optionNo, qty) => {
    cy.get(".makeStyles-carticon-11").eq(1).click();

    cy.fixture("products").then((json) => {
      const productOptionPrice =
        json.products[productId - 1].options[optionNo - 1].price;

      const productOptionSize =
        json.products[productId - 1].options[optionNo - 1].size;

      cy.get(".MuiCardHeader-title")
        .should("contain", productOptionSize)
        .and("contain", `Product ${productId}`)
        .and("contain", `(${qty})`);
      cy.get(".MuiCardHeader-subheader").should("contain", productOptionPrice);
    });
  }
);

// Assert Cart Total
Cypress.Commands.add("assertCartTotal", (products) => {
  cy.fixture("products").then((json) => {
    let prodTotal = 0;
    products.forEach(
      (product) =>
        (prodTotal +=
          json.products[product.id - 1].options[product.option - 1].price *
          product.qt)
    );

    cy.get(
      "[class='MuiTypography-root MuiTypography-h5 MuiTypography-alignCenter']"
    ).should("contain", prodTotal.toFixed(2));
  });
});

// Add to Cart from Product page passing in product ID
Cypress.Commands.add("addToCartFromProductPage", (productId) => {
  cy.fixture("products").then((json) => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
  });
  cy.visit("/shop");

  cy.contains(`Product ${productId}`).click();
  cy.contains("Add to Cart").click();
});

// Add from Product page passing in product ID and amount
Cypress.Commands.add("addProductWithQuantity", (productId, qtyAmount) => {
  cy.fixture("products").then((json) => {
    cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
  });
  cy.visit("/shop");

  cy.contains(`Product ${productId}`).click();
  _.times(qtyAmount - 1, () =>
    cy.get("[data-testid='AddCircleOutlineTwoToneIcon']").click()
  );
  cy.get(".MuiTypography-h6").should("contain", `${qtyAmount}`);

  cy.contains("Add to Cart").click();
});

Cypress.Commands.add(
  "addProductWithOption",
  (productId, optionNo, qtyAmount) => {
    cy.fixture("products").then((json) => {
      cy.intercept("GET", "http://localhost:8080/api/products?page=1", json);
    });
    cy.visit("/shop");

    cy.contains(`Product ${productId}`).click();
    _.times(qtyAmount - 1, () =>
      cy.get("[data-testid='AddCircleOutlineTwoToneIcon']").click()
    );
    cy.get(".MuiTypography-h6").should("contain", `${qtyAmount}`);
    cy.get(".MuiFormControl-root").click();
    cy.fixture("products").then((json) => {
      const productOptionId =
        json.products[productId - 1].options[optionNo - 1].id;

      const productOptionPrice =
        json.products[productId - 1].options[optionNo - 1].price;

      cy.get(`[data-value='${productOptionId}']`).click();
      cy.contains(productOptionPrice).should("be.visible");
      cy.contains("Add to Cart").click();
    });
  }
);

// Assert Cart Page (individual item)
Cypress.Commands.add("assertCartPage", (productId, pos, qty) => {
  cy.get(".makeStyles-carticon-11").eq(1).click();
  cy.contains("Go to Cart").click();
  cy.contains(`Product ${productId}`).should("be.visible");
  cy.get("[data-cy='cartQty']")
    .eq(pos - 1)
    .should("contain", qty);
});

// Update Item (individual item)
Cypress.Commands.add("updateItem", (pos, isIncrease) => {
  if (isIncrease) {
    cy.get("[data-testid='AddCircleOutlineOutlinedIcon']")
      .eq(pos - 1)
      .click();
    cy.get("[data-cy='update']")
      .eq(pos - 1)
      .click();
  } else {
    cy.get("[data-testid='RemoveCircleOutlineIcon']")
      .eq(pos - 1)
      .click();
    cy.get("[data-cy='update']")
      .eq(pos - 1)
      .click();
  }
});

Cypress.Commands.add("goToCheckout", () => {
  cy.get(".makeStyles-carticon-11").eq(1).click();
  cy.contains("Checkout").click();
});

Cypress.Commands.add("fillContactCheckout", () => {
  cy.get("[name='firstname']").click().type("Test");
  cy.get("[name='lastname']").click().type("Test");
  cy.get("[name='email']").click().type("test@gmail.com");
  cy.get("[name='phone']").click().type("3105555555");
});

Cypress.Commands.add("fillShippingCheckout", () => {
  cy.get("[name='address']").click().type("123 Test Address");
  cy.get("[name='city']").click().type("Los Angeles");
  cy.get("[name='state']").click().type("CA");
  cy.get("[name='postal']").click().type("91007");
});

Cypress.Commands.add("getStripeElement", (fieldName) => {
  const selector = `input[id="${fieldName}"]`;

  cy.get("iframe")
    .eq(1)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap)
    .find(selector);
});

Cypress.Commands.add("getStripeElementError", (fieldName) => {
  const selector = `p[id="${fieldName}"]`;

  cy.get("iframe")
    .eq(1)
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap)
    .find(selector);
});

Cypress.Commands.add("mockPaymentIntent", () => {
  // mocking our create payment intent endpoint
  cy.intercept("POST", "http://localhost:8080/api/create-payment-intent", {
    body: {
      clientSecret: "pi_3KZheGI7AFq6GjKY1OtlH2rT_secret_iuPuWPUmrFWHugGotfLU8Xhtj"
    }
  }).as("createPaymentIntent");
});

Cypress.Commands.add("mockConfirmPayment", () => {
  // mocking stripe confirm payment intent endpoint
  cy.intercept("POST", "https://api.stripe.com/v1/payment_intents/*/confirm", {
    body: {
      status: "succeeded",
    },
  }).as("confirmPayment");
});

Cypress.Commands.add("fillCardInfo", () => {
  cy.getByTestId("payment").within(() => {
    cy.getStripeElement("Field-numberInput").type("4242424242424242");
    cy.getStripeElement("Field-expiryInput").type("0422");
    cy.getStripeElement("Field-cvcInput").type("789");
    cy.getStripeElement("Field-postalCodeInput").type("91007");
  });
});

Cypress.Commands.add("confirmOrderSuccess", () => {
  cy.contains("Confirm Order").click();
  cy.wait("@confirmPayment").then(() => {
    // mocking order post request
    cy.intercept("POST", "http://localhost:8080/api/orders", {
      body: {
        ordernumber: "ABCD1234",
      },
    }).as("orderSuccess");

    cy.wait("@orderSuccess");
  });
});

/// <reference types="cypress" />

describe("Payment", () => {
  // Confirm Payment - Delivery, ASAP
  it("should continue to payment - delivery ASAP", () => {
    cy.addOneToCart(1);
    cy.goToCheckout();
    cy.mockPaymentIntents();

    cy.fillContactCheckout();
    cy.fillShippingCheckout();

    cy.contains("Continue to Payment").click();

    cy.get("[data-cy='payment']").within(() => {
      cy.getStripeElement("Field-numberInput").type("4242424242424242");
    });

    cy.get("[data-cy='payment']").within(() => {
      cy.getStripeElement("Field-expiryInput").type("0422");
    });

    cy.get("[data-cy='payment']").within(() => {
      cy.getStripeElement("Field-cvcInput").type("789");
    });

    cy.get("[data-cy='payment']").within(() => {
      cy.getStripeElement("Field-postalCodeInput").type("91007");
    });

    cy.contains("Confirm Order").click();

    cy.wait("@confirmPayment").then(() => {
      // mocking our order post request
      cy.intercept("POST", "http://localhost:8080/api/orders", {
        fixture: "order-success.json",
      }).as("orderSuccess");

      cy.wait("@orderSuccess");
    });
  });
});

/// <reference types="cypress" />

describe("Payment", () => {
  beforeEach(() => {
    cy.addOneToCart(1);
    cy.goToCheckout();
    cy.mockPaymentIntent();
    cy.mockConfirmPayment();
  });

  // Confirm Payment - Delivery, ASAP
  it("should continue to payment - delivery asap", () => {
    cy.fillContactCheckout();
    cy.fillShippingCheckout();
    cy.contains("Continue to Payment").click();

    cy.fillCardInfo();
    cy.confirmOrder();

    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains("#ABCD1234").should("be.visible");
  });

  // Confirm Payment - Delivery, Scheduled
  it("should continue to payment - delivery scheduled", () => {
    cy.fillContactCheckout();
    cy.fillShippingCheckout();
    cy.contains("Scheduled").click();
    cy.getByTestId("dateTimePicker").click();
    cy.contains("OK").click();
    cy.contains("Continue to Payment").click();

    cy.fillCardInfo();
    cy.confirmOrder();
    
    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains("#ABCD1234").should("be.visible");
  });

  // Confirm Payment - Pickup, ASAP
  it("should continue to payment - pickup asap", () => {
    cy.fillContactCheckout();
    cy.getByTestId("switch").click();
    cy.contains("Continue to Payment").click();

    cy.fillCardInfo();
    cy.confirmOrder();

    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains("#ABCD1234").should("be.visible");
  });

  // Confirm Payment - Pickup, Scheduled
  it("should continue to payment - pickup scheduled", () => {
    cy.fillContactCheckout();
    cy.getByTestId("switch").click();
    cy.contains("Scheduled").click();
    cy.getByTestId("dateTimePicker").click();
    cy.contains("OK").click();
    cy.contains("Continue to Payment").click();

    cy.fillCardInfo();
    cy.confirmOrder();

    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains("#ABCD1234").should("be.visible");
  });
});

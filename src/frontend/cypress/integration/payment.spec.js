/// <reference types="cypress" />

describe("Payment", () => {
  beforeEach(() => {
    cy.addOneToCart(1);
    cy.goToCheckout();
    cy.mockPaymentIntent();
    cy.mockConfirmPayment();
  });

  // Confirm Payment Form Field Errors
  it("should display all payment form errors", () => {
    cy.fillContactCheckout();
    cy.getByTestId("switch").click();
    cy.contains("Continue to Payment").click();

    cy.wait(3000)
    cy.contains("Confirm Order").click();

    cy.getByTestId("payment").within(() => {
      cy.getStripeElementError("Field-numberError").should(
        "contain",
        "Your card number is incomplete"
      );
      cy.getStripeElementError("Field-expiryError").should(
        "contain",
        "Your card's expiration date is incomplete"
      );
      cy.getStripeElementError("Field-cvcError").should(
        "contain",
        "Your card's security code is incomplete"
      );
      cy.getStripeElementError("Field-postalCodeError").should(
        "contain",
        "Your postal code is incomplete"
      );
    });
  });

  // Confirm Stripe API Error
  it("should display error when payment submission fails", () => {
    cy.fillContactCheckout();
    cy.getByTestId("switch").click();
    cy.contains("Continue to Payment").click();

    cy.intercept('POST', 'https://api.stripe.com/v1/payment_intents/*/confirm', {
      statusCode: 500,
      body: {
        error: true,
      },
    });

    cy.wait(3000)
    cy.fillCardInfo();
    cy.contains("Confirm Order").click();
    cy.contains("An unexpected error occured.").should("be.visible");
  });

  // Confirm Payment - Delivery, ASAP
  it("should continue to payment - delivery asap", () => {
    cy.fillContactCheckout();
    cy.fillShippingCheckout();
    cy.contains("Continue to Payment").click();

    cy.wait(3000)
    cy.fillCardInfo();
    cy.confirmOrderSuccess();

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

    cy.wait(3000)
    cy.fillCardInfo();
    cy.confirmOrderSuccess();

    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains("#ABCD1234").should("be.visible");
  });

  // Confirm Payment - Pickup, ASAP
  it("should continue to payment - pickup asap", () => {
    cy.fillContactCheckout();
    cy.getByTestId("switch").click();
    cy.contains("Continue to Payment").click();

    cy.wait(3000)
    cy.fillCardInfo();
    cy.confirmOrderSuccess();

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

    cy.wait(3000)
    cy.fillCardInfo();
    cy.confirmOrderSuccess();

    cy.contains("Thank you for your purchase!").should("be.visible");
    cy.contains("#ABCD1234").should("be.visible");
  });
});

/// <reference types="cypress" />

describe("Checkout", () => {
  //   // Display all required Contact form errors
  //   it("should display all contact form errors", () => {
  //     cy.addOneToCart(1);
  //     cy.goToCheckout();

  //     cy.contains("Continue to Payment").click();
  //     cy.contains("*First name is required").should("be.visible");
  //     cy.contains("*Last name is required").should("be.visible");
  //     cy.contains("*Email is required").should("be.visible");
  //     cy.contains("*Must be at least 10 characters").should("be.visible");
  //   });

  //   // Validate email format
  //   it("should validate email format", () => {
  //     cy.addOneToCart(1);
  //     cy.goToCheckout();

  //     cy.get("[name='email']").click().type("test");
  //     cy.contains("Continue to Payment").click();
  //     cy.contains("*Must be a valid email").should("be.visible");
  //   });

  //   // Display all required Delivery form errors
  //   it("should display all delivery form errors", () => {
  //     cy.addOneToCart(1);
  //     cy.goToCheckout();
  //     cy.fillContactCheckout()

  //     cy.contains("Continue to Payment").click();
  //     cy.contains("*Address is required").should("be.visible");
  //     cy.contains("*City is required").should("be.visible");
  //     cy.contains("*Must be 2 characters").should("be.visible");
  //     cy.contains("*Must be at least 5 characters").should("be.visible");
  //   });

  //   // Confirm Pickup option
  //   it("should display pickup card", () => {
  //     cy.addOneToCart(1);
  //     cy.goToCheckout();

  //     cy.get(
  //       "[class='MuiSwitch-input PrivateSwitchBase-input css-1m9pwf3']"
  //     ).click();
  //     cy.contains("Pickup Location").should("be.visible");
  //   });

  //   // Confirm Scheduled option
  //   it("should display scheduled date time field", () => {
  //     cy.addOneToCart(1);
  //     cy.goToCheckout();

  //     cy.contains("Scheduled").click();
  //     cy.get("fieldset")
  //       .children(".css-1z7n62")
  //       .should("contain", "Select Date and Time");

  //     cy.get(
  //       "[class='MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input']"
  //     ).click();

  //     cy.get("[class='PrivatePickersToolbar-root css-yquuwn']").should(
  //       "contain",
  //       "Select Date and Time"
  //     );
  //   });

  // Continue to Payment - Delivery, ASAP
  it("should continue to payment - delivery ASAP", () => {
    cy.addOneToCart(1);
    cy.goToCheckout();

    // mocking our create payment intent endpoint
    cy.intercept("POST", "http://localhost:8080/api/create-payment-intent", {
      fixture: "payment-intent.json",
    }).as("createPaymentIntent");

    // mocking stripe confirm payment intent endpoint
    cy.intercept(
      "POST",
      "https://api.stripe.com/v1/payment_intents/*/confirm",
      {
        body: {
          // stripe client requires `error` to be present for both success and failed response
          error: false,
        },
      }
    ).as("confirmPayment");

    cy.fillContactCheckout();
    cy.fillShippingCheckout();

    cy.contains("Continue to Payment").click();

    cy.wait(5000);
    cy.get("iframe")
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .get("[id='Field-numberInput']");

    cy.get("[data-testid='CheckCircleIcon']").should("be.visible");
    cy.contains("Your Order Details").should("be.visible");
  });

  // Continue to Payment - Pickup, ASAP

  // Continue to Payment - Delivery, Scheduled

  // Continue to Payment - Pickup, Scheduled
});

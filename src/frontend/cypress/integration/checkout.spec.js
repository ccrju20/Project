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

  // Confirm Scheduled option
  it("should display scheduled date time field", () => {
    cy.addOneToCart(1);
    cy.goToCheckout();

    cy.contains("Scheduled").click();
    cy.get("fieldset")
      .children(".css-1z7n62")
      .should("contain", "Select Date and Time");

    cy.get("[data-cy='dateTimePicker']").click();

    cy.get("[class='PrivatePickersToolbar-root css-yquuwn']").should(
      "contain",
      "Select Date and Time"
    );
  });

  // // Continue to Payment - Delivery, ASAP
  // it("should continue to payment - delivery asap", () => {
  //   cy.addOneToCart(1);
  //   cy.goToCheckout();
  //   cy.mockPaymentIntents();

  //   cy.fillContactCheckout();
  //   cy.fillShippingCheckout();
  //   cy.contains("Continue to Payment").click();

  //   cy.get("[data-testid='CheckCircleIcon']").should("exist");
  //   cy.contains("Your Order Details").should("be.visible");
  //   cy.contains("DELIVERY").should("be.visible")
  //   cy.contains("ASAP").should("be.visible")
  // });

  // Continue to Payment - Delivery, Scheduled
  it("should continue to payment - delivery scheduled", () => {
    cy.addOneToCart(1);
    cy.goToCheckout();
    cy.mockPaymentIntents();

    cy.fillContactCheckout();
    cy.fillShippingCheckout();
    cy.contains("Scheduled").click();
    cy.get("[data-cy='dateTimePicker']").click();
    cy.contains("OK").click();

    cy.contains("Continue to Payment").click();

    cy.get("[data-testid='CheckCircleIcon']").should("exist");
    cy.contains("Your Order Details").should("be.visible");
    cy.contains("DELIVERY").should("be.visible");
    cy.get(".MuiGrid-grid-sm-6")
      .eq(5)
      .invoke("text")
      .then((text) => {
        const testDate = new Date();
        testDate.setDate(testDate.getDate() + 2);
        testDate.setHours(10, 0);

        let scheduledTime = "";
        scheduledTime = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(testDate);

        expect(text).to.be.eq(scheduledTime);
      });
  });

  // Continue to Payment - Delivery, Scheduled

  // Continue to Payment - Pickup, Scheduled
});

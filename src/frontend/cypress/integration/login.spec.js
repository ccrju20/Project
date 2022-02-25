/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/account");
  });

  it("should show all login errors when submitting blank", () => {
    cy.getByTestId("login-submit").click();
    cy.contains("Email required").should("be.visible");
    cy.contains("Password required").should("be.visible");
  });

  it("should validate email format", () => {
    cy.get("#email").type("invalid");
    cy.get("#password").type("password");
    cy.getByTestId("login-submit").click();

    cy.focused().should('have.attr', 'id', 'email')

    cy.wait(1000);
    cy.get("[class='MuiTypography-root MuiTypography-h5']").should("not.exist");
  });

  it("should validate password format", () => {
    cy.get("#email").type("test@gmail.com");
    cy.get("#password").type("passwo");
    cy.getByTestId("login-submit").click();

    cy.contains("Password must contain at least 7 characters").should("be.visible");
  });

  it("should show invalid user error", () => {
    cy.get("#email").type("nonuser@gmail.com");
    cy.get("#password").type("password");

    cy.getByTestId("login-submit").click();
    cy.contains("Invalid Username or Password").should("be.visible");
  });

  it("should log user in successfully", () => {
    cy.get("#email").type("testuser3@gmail.com");
    cy.get("#password").type("password");

    cy.getByTestId("login-submit").click();

    cy.contains("Your Account")
      .should("be.visible")
      .and("have.class", "MuiTypography-root MuiTypography-h5");
  });
});

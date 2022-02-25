/// <reference types="cypress" />

describe("Locators", () => {
  beforeEach(() => {
    cy.visit("/account");
  });

  it("locating elements with get", () => {
    cy.get(".MuiButton-root"); // class name

    cy.get("[type='submit']"); // attribute

    cy.get("[data-cy='login-submit']");
    cy.getByTestId("login-submit");
  });

  it("locating elements with contains", () => {
    cy.get("#email");
    cy.contains("Email");
  });
});

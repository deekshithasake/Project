/// <reference types="cypress" />

import HomePage from "../pages/HomePage";
import OffersPage from "../pages/OffersPage";
import HolidaysPage from "../pages/HolidaysPage";

describe("Yatra Trip Package Automation - Using Page Objects", () => {

  const homePage = new HomePage();
  const offersPage = new OffersPage();
  const holidaysPage = new HolidaysPage();
  beforeEach(function () {
    cy.fixture("testData").as("data");
  });

  it("Yatra Trip Package Automation", function () {
    //Launch Application 
    cy.visit(this.data.url, {
      timeout: 60000,
      failOnStatusCode: false
    });

    homePage.closePopupIfPresent();

    
    cy.window().then((win) => {
      cy.stub(win, "open").as("offersWindow");
    });

    homePage.offersLink()
      .should("be.visible")
      .click();

    cy.get("@offersWindow").then((stub) => {
      const offersUrl = stub.getCall(0).args[0];
      cy.visit(offersUrl);
    });

    
    offersPage.validateOffersPage(
      this.data.offersTitle,
      this.data.offersBannerText
    );

    //Navigate to Holidays
    homePage.holidaysMenu()
      .should("be.visible")
      .click();

    holidaysPage.validateHolidaysPage();

    
    homePage.viewDetailsCards()
      .should("have.length.greaterThan", 0)
      .then(($cards) => {

        // const maxCount = Math.min($cards.length, 5);
        cy.log(`✅ Total holiday packages found: ${$cards.length}`);
      });
  });
  after(() => {
    cy.log("✅ Test execution completed — closing browser window");
    
  });

});
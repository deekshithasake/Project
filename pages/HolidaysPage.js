class HolidaysPage {

  
 validateHolidaysPage() {
    cy.url().should('include', 'holiday');
    cy.get('body').should('be.visible');
    cy.log("✅ Navigated to Holidays page");
  }


  loopThroughHolidayPackages(maxCount, homePage) {
    homePage.viewDetailsCards()
      .should('have.length.greaterThan', 0)
      .then(($cards) => {
        const count = Math.min($cards.length, maxCount);
        cy.log(`✅ Total holiday packages found: ${$cards.length}`);

        for (let i = 2; i < count; i++) {
          homePage.clickViewDetailsByIndex(i);
        }
      });
  }

}

export default HolidaysPage;

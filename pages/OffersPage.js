class OffersPage {

  validateOffersPage(title, bannerText) {
    cy.title().should('eq', title);
    cy.contains(bannerText).should('be.visible');
    cy.screenshot("Offers_Page");
  }

}

export default OffersPage;
class HomePage {

  closePopupIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find('.style_cross__q1ZoV img').length > 0) {
        cy.get('.style_cross__q1ZoV img', { timeout: 10000 })
          .click({ force: true });
      }
    });
  }

  offersLink() {
    return cy.get('.css-1ug9qk6 > div');
  }

  holidaysMenu() {
    return cy.get('#offer-box-shadow').contains('Holidays');
  }

  viewDetailsCards() {
    return cy.get('a.listingContent');
  }


}

export default HomePage;
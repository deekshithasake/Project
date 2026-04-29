class Hotels {
  openRoomGuestsBox() {
    cy.get('.hp_inputBox.roomGuests')
      .should('be.visible')
      .click();
  }

  addNewRoomBtn() {
    cy.get("#addhotelRoom").should('be.visible').click({ force: true });
  }



  allAdultCounters() {
    return cy.get('.PlusMinus_number[id^="Adults"]');
  }

  adultCount() {
    return cy.get('#Adults_room_1_1');
  }


  extractAdultValuesFromAllRooms() {
    const adultList = [];

    return this.allAdultCounters()
      .each(($el) => {
        const value = Number($el.text().trim());
        if (!isNaN(value)) {
          adultList.push(value);
        }
      })
      .then(() => {
        return adultList;

      })
  }

}
module.exports = new Hotels();
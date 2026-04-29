import GiftCards from "../Files/GiftCards.cy";
import hotels from '../Files/Hotels';


describe("Ease my trip - Gift card flow", function () {
    it("Validating fields of holiday gift card", () => {

        const giftpage = new GiftCards();
        cy.visit('https://www.easemytrip.com/')
        cy.url().should('include', 'easemytrip').then(() => {
            giftpage.Giftfunction();
        })

    })

})


describe('Adult Count Extraction', () => {

   beforeEach(() => {
        cy.visit('https://www.easemytrip.com/hotels/');
    });
 
    it('TC-1: Open hotel Rooms&Guests selection ', () => {
        hotels.openRoomGuestsBox();
        cy.log('Hotel Rooms & Guests selection box opened');
    });
 
    it('TC-2: Verify city search input accepts value', () => {
        cy.get('.hp_city').type('Bangalore{enter}');
        cy.get('.hp_city').then((data) => {
            let text = data.text()
            expect(text).to.be.eq('Bangalore')
        });
    });
 
 
    it('TC-3 Extract the default no.of adults per room and storing them in a list', () => {
 
        hotels.openRoomGuestsBox();
 
        hotels.addNewRoomBtn();
 
 
        hotels.extractAdultValuesFromAllRooms().then((adultList) => {
            cy.log('Adult Persons List: ' + adultList.join(', '));
            console.log('Adult Persons List:', adultList);
 
            expect(adultList.length).to.be.greaterThan(0);
        });
    });
 
 
    it('TC-4: Verify Check-In date is visible', () => {
 
        cy.get('#txtcid')
            .should('be.visible')
            .and('not.be.empty');
 
        cy.get('#txtcimy')
            .should('be.visible')
            .and('not.be.empty');
    });
 
    it('TC-5c: Verify Check-Out date is visible', () => {
        cy.get('#txtcod').should('be.visible').and('not.be.empty');;
        cy.get('#txtcomy').should('be.visible').and('not.be.empty');;
    });
 
});
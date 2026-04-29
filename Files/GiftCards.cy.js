class GiftCards {
    Giftfunction() {

        //TestCase-->1 - more icon 
        cy.get('li._subheaderlink').should('be.visible');

        //TestCase-->2 - hovering more icon
        cy.get('li._subheaderlink').trigger('mouseover', { force: true })

        //TestCase-->3 - select the dropdown
        cy.contains(
            'li._subheaderlink ._dropdownromenu a._drpdubro',
            'Gift Card'
        ).click({ force: true })

        //TestCase-->4 - validate gift card url
        cy.url().should('include', 'gift')

        //TestCase-->5 - Check group gifting card
        let IsGroupGifting = false;
        cy.get('#All > .crd_mnfllbx').each((ele) => {
            if (ele.find('.f17').text().includes('Group Gifting')) {
                IsGroupGifting = true;
            }
        }).then(() => {
            if (!IsGroupGifting) {
                cy.log("There is no group Gifting")
            }
        })

        //TestCase-->6 - Check for holiday gift card
        let IsHoliday = false;
        let element;
        cy.get('#All > .crd_mnfllbx').each((ele) => {
            if (ele.find('.f17').text().includes('Holiday')) {
                IsHoliday = true;
                element = ele
            }
        }).then(() => {
            if (!IsHoliday) {
                cy.log("There is no Holiday gift card")
            }
            else {
                element.find('.crdmgmn').click()
            }
        })

        //TestCase-->7 - Denomination amount in alphabets Checking
        cy.contains('label.m__b_10', 'Enter Denomination').get('input[placeholder="Min 500 -  50000"]').type('hr').then(() => {
            cy.get('p.err_msg').should('contain', 'Enter voucher amount')
            cy.reload();
        })

        //TestCase-->8 - Denomination amount less than 500 and greater than 50000 should throw an error
        cy.contains('label.m__b_10', 'Enter Denomination').get('input[placeholder="Min 500 -  50000"]').type('499').then(() => {
            cy.get('p.err_msg').should('contain', 'Voucher amount should be between 500 and 50000')
            cy.reload();
        })
        cy.contains('label.m__b_10', 'Enter Denomination').get('input[placeholder="Min 500 -  50000"]').type('50001').then(() => {
            cy.get('p.err_msg').should('contain', 'Voucher amount should be between 500 and 50000')
            cy.reload();
        })

        //TestCase-->9 - Denomination amount in between 500 and  50000 
        cy.contains('label.m__b_10', 'Enter Denomination').get('input[placeholder="Min 500 -  50000"]').type('6000').then(() => {
            cy.get('p.err_msg').should('contain', '')

        })

        //TestCase-->10 - Without selecting paying should send error message.
        cy.get('#pny').click().then(() => {
            cy.contains('label.m__b_10', 'Select Quantity ').get('p.err_msg').should('contain', 'Select quantity.')
        })

        //TestCase-->11 - Selecting quantity
        cy.contains('label.m__b_10', 'Select Quantity ').parent().find('select').select('4')

        //TestCase-->12 - Sender name Testing like numberstyping,error messaging
        cy.contains('label', 'Sender details').closest('.form-group').find('input[ng-model="User.SenderName"]').type('12').should('have.value', '')

        cy.get('#pny').click()

        cy.contains('label', 'Sender details')
            .closest('.form-group')
            .find('p.err_msg')
            .invoke('text')
            .should('include', 'Sender name')

        //TestCase-->13 - Sender name Testing with correct information
        cy.contains('label', 'Sender details').closest('.form-group').find('input[ng-model="User.SenderName"]').type('Deekshitha').then(() => {
            cy.get('.err_msg').should('have.value', '');
        })


        //TestCase-->14 - Sender Email Validation
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        const typeEmail = 'tests@gmail.com'
        cy.get('#txtEmailId')
            .type(typeEmail)
        cy.get('#pny').click()
        cy.get('#txtEmailId')
            .invoke('val')
            .then(email => {
                expect(emailRegex.test(email)).to.be.true
            })
        cy.get('#txtEmailId')
            .closest('.form-group')
            .find('p.err_msg')
            .invoke('text')
            .should('include', '')

        //TestCase-->15 - Sender mobile number validation
        cy.get('input[ng-model="User.SenderMobile"]')
            .clear()
            .type('hru')
            .should('have.value', '')


        cy.get('input[ng-model="User.SenderMobile"]')
            .type('123456789012')
            .should('have.value', '1234567890')

        //TestCase-->16 - Reciever details validation
        cy.get('#rcnm').type('Deekshi123')
            .should('have.value', 'Deekshi')

        //TestCase-->17 - Reciever Email Validation
        const recemail = 'test@gmail.com'
        cy.get('#rceml')
            .type(recemail)

        cy.get('#pny').click()

        cy.get('#rceml')
            .invoke('val')
            .then(email => {
                expect(emailRegex.test(email)).to.be.true
            })
        cy.get('#rceml')
            .closest('.form-group')
            .find('p.err_msg')
            .invoke('text')
            .should('include', '')

        //TestCase-->18 - entering mismatching emails to test error message
        cy.get('#rceml')
            .clear()
            .type('test@gmail.com')
            .blur()

        cy.get('#rcteml')
            .clear()
            .type('test1@gmail.com')
            .blur()

        cy.get('#pny').click()

        cy.get('#rcteml')
            .closest('.form-group')
            .find('p.err_msg')
            .should('contain', 'Receiver e-mails should be same')

        //TestCase-->29 - Entering right retyping emails
        cy.get('#rceml')
            .clear()
            .type('test@gmail.com')
            .blur()

        cy.get('#rcteml')
            .clear()
            .type('test@gmail.com')
            .blur()

        cy.get('#pny').click()

        cy.get('#rcteml')
            .closest('.form-group')
            .find('p.err_msg')
            .should('contain', '')

        //TestCase-->20 - Reciever mobile number validation
        cy.get('#rcephn').type('deekshitha1234567891')
            .should('have.value', '1234567891')

        cy.get('#pny').click()


        cy.get('.trms')
            .parent()
            .find('p.err_msg')
            .should('contain.text', 'Please accept terms and conditions.')




        //TestCase-->21 - Terms and conditions checkbox validation
        cy.get('input[ng-model="User.Term"]').check()

        cy.get('#pny').click()
    }
}

export default GiftCards

class PopUp {

    content() {
        return cy.get('#swal2-content')
    }

    haveText(text) {
        this.content()
            .should('be.visible')
            .and('have.text', text)
    }

    confirm() {
        cy.get('.swal2-confirm')
            .click({ force: true })
    }
    
    Back() {
        cy.get('.swal2-cancel')
            .click()
    }
}

export default new PopUp()
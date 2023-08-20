import navBar from "./components/Navbar";
import popUp from "./components/PopUp"

class EnrollmentsPage {

    constructor() {
        this.navBar = navBar
        this.popUp = popUp
    }

    goToForm() {
        cy.get('a[href="/enrollments/new"]')
            .click()
    }

    selectItem(item, value) {
        cy.get(`.select_${item}`)
            .click()

        cy.get(`input[aria-label="select_${item}"]`)
            .type(value)

        cy.contains('div[id*=option]', value)
            .click()
    }

    fillCard(student) {
        cy.get('#card_number')
            .type('5555555555554444')
        cy.get('#card_holder')
            .type(student.name)
        cy.get('#card_month')
            .type('12')
        cy.get('#card_year')
            .type('2030')
        cy.get('#card_cvv')
            .type('987')
    }

    submit() {
        cy.contains('button', 'Cadastrar')
            .click()
    }
}

export default new EnrollmentsPage()
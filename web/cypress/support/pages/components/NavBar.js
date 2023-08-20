
class NavBar {

    userLoggedIn(name) {
        cy.contains('aside .logged-user', 'Olá, ' + name)
            .should('be.visible')
    }

    goToEnrollments() {
        cy.contains('a[href="/enrollments"]', '/matrículas')
            .click()
    }
}

export default new NavBar()
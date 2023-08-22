import popUp from '../pages/components/PopUp'

class LoginPage {

    constructor() {
        this.popUp = popUp
    }

    go() {
        cy.visit('/')
    }

    fill(user) {
        cy.get('input[name=email]').clear({ force: true }).as('email')
        cy.get('input[name=password]').clear({ force: true }).as('password')

        // if ternário
        user.email ? cy.get('@email').type(user.email) : cy.log('empyt email')
        // Se o email estiver em branco é falso, então o passo será pulado
        user.password ? cy.get('@password').type(user.password) : cy.log('empty pass')
        // Se a senha estiver em branco é falso, então o passo será pulado
    }

    submit() {
        cy.contains('button', 'Entrar')
            .click()
    }

    doLogin(user) {
        this.go()
        this.fill(user)
        this.submit()
    }


}

export default new LoginPage()
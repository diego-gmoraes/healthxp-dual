import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage';


describe('login', () => {   


    it('deve logar com perfil do admin', () => {

        const user = users.admin

        loginPage.doLogin(user)
        studentPage.navBar.userLoggedIn(user.name)
        
    });

    it('não deve logar com senha incorreta', () => {
        const user = users.inv_pass

        loginPage.doLogin(user)
        loginPage.popUp.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    });

    it('não deve logar com email não cadastrado', () => {
        const user = users.email_not_found

        loginPage.doLogin(user)
        loginPage.popUp.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    });

    it('não deve logar com email inválido', () => {
        const emails = users.inv_emails

        let outputMessages = []
        // array que irá armazenar as mensagens de saída do popup

        let expectedMessages = []

        loginPage.go()

        emails.forEach((user) => {
            loginPage.fill(user)
            loginPage.submit()

            // login.popUpHave('Insira um email válido.')

            loginPage.popUp.content()
            // busca o texto do popup pelo localizador
                .invoke('text')
                // invoca o texto do elemento
                .then((t) => {
                // recebe o texto na váriavel t do then
                    cy.log(t)
                    // registra o texto encontrado a cada execução
                    outputMessages.push(t)
                    // adiciona o texto no array(lista) outputMessages
                    expectedMessages.push('Insira um email válido.')
                    // adiciona o texto no array(lista) expectedMessages
                })

                loginPage.popUp.Back()
        });

        cy.wrap(outputMessages).should('deep.equal', expectedMessages)
        // compara se todos os textos adicionados nas duas listas são iguais

    });

    it('não deve logar com email em branco', () => {
        const user = users.empty_email

        loginPage.doLogin(user)
        loginPage.popUp.haveText('Os campos email e senha são obrigatórios.')
    });

    it('não deve logar com senha em branco', () => {
        const user = users.empty_password

        loginPage.doLogin(user)
        loginPage.popUp.haveText('Os campos email e senha são obrigatórios.')
    });
});
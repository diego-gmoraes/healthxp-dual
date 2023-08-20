// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import users from '../fixtures/users.json'

import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'

Cypress.Commands.add('adminLogin', () => {
   const user = users.admin

   loginPage.doLogin(user)
   studentPage.navBar.userLoggedIn(user.name)
})

Cypress.Commands.add('createEnroll', (dataTest) => {

   cy.task('selectStudentId', dataTest.student.email)
      // consulta o Id do aluno
      .then(result => {

         const user = users.admin

         // realiza o login como admin
         cy.request({
            url: 'http://localhost:3333/sessions',
            method: 'POST',
            body: {
               email: user.email,
               password: user.password
            }
         }).then(response => {
            cy.log(response.body.token)
            // recebe o token de autorização

            // monta todas as informações para fazer a pré-matricula
            const payload = {
               student_id: result.success.rows[0].id,
               plan_id: dataTest.plan.id,
               credit_card: '4444'
            }

            // realiza a matricula prévia do aluno
            cy.request({
               url: 'http://localhost:3333/enrollments',
               method: 'POST',
               body: payload,
               headers: {
                  Authorization: 'Bearer ' + response.body.token
                  // autorização com o token gerado no login admin
               }
            }).then(response => {
               expect(response.status).to.eq(201)
            })
         })

      })
})

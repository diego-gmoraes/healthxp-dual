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
import 'dotenv/config'

import users from '../fixtures/users.json'

import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'


Cypress.Commands.add('adminLogin', () => {
   const user = users.admin

   loginPage.doLogin(user)
   studentPage.navBar.userLoggedIn(user.name)
})

Cypress.Commands.add('createEnroll', (dataTest) => {

   cy.request({
      url: Cypress.env('apiHelper') + '/enrolls',
      method: 'POST',
      body: {
         email: dataTest.student.email,
         plan_id: dataTest.plan.id,
         price: dataTest.plan.price
      }
   }).then(response => {
      expect(response.status).to.eq(201)
   })

})

Cypress.Commands.add('resetStudent', (student) => {
   cy.request({
      url: Cypress.env('apiHelper')+ '/students',
      method: 'POST',
      body: student
   }).then(response => {
      expect(response.status).to.eq(201)
   })
})

Cypress.Commands.add('deleteStudent', (studentEmail) => {
   cy.request({
      url: Cypress.env('apiHelper') + '/students/' + studentEmail,
      method: 'DELETE',
   }).then(response => {
      expect(response.status).to.eq(204)
   })
})

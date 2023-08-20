import students from '../fixtures/students.json'

import studentPage from '../support/pages/StudentPage';

describe('students', () => {

    it('deve cadastrar um novo aluno', () => {

        const student = students.create

        cy.task('deleteStudent', student.email)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popUp.haveText('Dados cadastrados com sucesso.')

    });

    it('não deve cadastrar com email duplicado', () => {
        const student = students.duplicate
        
        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popUp.haveText('O email informado já foi cadastrado!')
    });

    it('deve remover um aluno sem matricula', () => {
        const student = students.remove

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popUp.confirm()
        studentPage.popUp.haveText('Exclusão realizada com sucesso.')
    });

    it.only('todos os campos são obrigatórios', () => {
        const student =  students.required

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')
        studentPage.alertMessage('E-mail', 'O email é obrigatório')
        studentPage.alertMessage('Idade', 'A idade é obrigatória')
        studentPage.alertMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.alertMessage('Altura', 'A altura é obrigatória')
    });

    it.only('não deve cadastrar aluno com menos de 16 anos', () => {
        const student = students.inv_age

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Idade','A idade mínima para treinar é 16 anos!')
    });

    it.skip('não deve cadastrar aluno com peso menor ou igual a zero', () => {
        // cénario deve falhar por não implementar regra de negócio 
        const student = students.inv_weight

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Peso (em kg)','Peso inválido!')
    });

    it.skip('não deve cadastrar aluno com altura menor ou igual a zero', () => {
    // cénario deve falhar por não implementar regra de negócio 
        const student = students.inv_feet_tall

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Altura','Altura inválida')
    });
});
import data from '../fixtures/enrollments.json'

import enrollmentsPage from "../support/pages/EnrollmentsPage";

describe('matriculas', () => {

    it('deve matricular um novo aluno', () => {
        const dataTest = data.create

        cy.task('resetStudent', dataTest.student)
        // deleta e depois insere o aluno novamente
        /* como a tabela no banco de dados está com cascade true, deletando um 
        registro (cadastro de aluno) que contenha chave estrangeira, tudo 
        relacionado a ele é deletado em cascata e por isso não só o cadastro mas
        também a matricula desse aluno é deletada do banco, assim apenas 
        deletando o cadastro, ao cadastrar esse aluno novamente e depois 
        realizar a matricula, não ficara duplicado, se não estivesse como 
        cascade true precisaria ser implementado uma função para deletar 
        a matricula também*/

        cy.adminLogin()

        enrollmentsPage.navBar.goToEnrollments()

        enrollmentsPage.goToForm()

        enrollmentsPage.selectItem('student', dataTest.student.name)
        enrollmentsPage.selectItem('plan', dataTest.plan.name)

        enrollmentsPage.fillCard(dataTest.student)

        enrollmentsPage.submit()

        enrollmentsPage.popUp.haveText('Matrícula cadastrada com sucesso.')
    });
    
    it('não deve criar matricula duplicada', () => {
        const dataTest = data.duplicate

        cy.task('resetStudent', dataTest.student)
        //reseta o aluno
        cy.createEnroll(dataTest)

        cy.adminLogin()

        enrollmentsPage.navBar.goToEnrollments()
        enrollmentsPage.goToForm()
        enrollmentsPage.selectItem('student', dataTest.student.name)
        enrollmentsPage.selectItem('plan', dataTest.plan.name)
        enrollmentsPage.fillCard(dataTest.student)
        enrollmentsPage.submit()

        enrollmentsPage.popUp.haveText('O aluno já possui matrícula cadastrada!')

    });

});
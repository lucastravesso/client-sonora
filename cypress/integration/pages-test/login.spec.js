/// <reference types="cypress" />

describe('Login tests', () => {

    it('LoginADM', () =>{

        cy.visit('/login');

        cy.get('[data-cy=login]').type('adm@adm')
        cy.get('[data-cy=senha]').type('awd')
        cy.get('[data-cy=login-submit]').click()
        
        cy.wait(500)
        cy.get('[data-cy=logout]').click({force:true})
    });

    it('LoginCLIENT', () =>{

        cy.visit('/login');

        cy.get('[data-cy=login]').type('teste@teste2')
        cy.get('[data-cy=senha]').type('teste')
        cy.get('[data-cy=login-submit]').click()
        
        cy.wait(500)
        cy.get('[data-cy=logout]').click({force:true})
    });

    it('LoginADM after enter admin panel', () =>{

        cy.visit('/login');

        cy.get('[data-cy=login]').type('adm@adm')
        cy.get('[data-cy=senha]').type('awd')
        cy.get('[data-cy=login-submit]').click()
        
        cy.wait(500)

        cy.get('[data-cy=adminpanel]').click()
    });

    it('falha de login', () => {

        cy.visit('/login');

        cy.get('[data-cy=login-submit]').click().should('not.respondTo')
        cy.wait(500)
        cy.get('[data-cy=login]').type('adm@adm')
        cy.get('[data-cy=login-submit]').click().should('not.respondTo')

        cy.wait(500)
        cy.get('[data-cy=login]').clear()
        cy.get('[data-cy=senha]').type('awd')
        cy.get('[data-cy=login-submit]').click().should('not.respondTo')


    })

})
/// <reference types="cypress" />

describe('Register tests', () => {

    it('register teste', () =>{
        cy.visit('/login')

        cy.get('[data-cy=register-btn]').click()
    });

    it('register teste field validation', () =>{
        cy.visit('/login')

        cy.get('[data-cy=register-btn]').click()

        //verifica validade do nome
        cy.get('[data-cy=nome]').type('123')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Nome invalido . .').should('have.length', 1)

        //verifica se esta preenchido 
        cy.get('[data-cy=nome]').clear()
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo nome . .').should('have.length', 1)

        //verifica validade do sobrenome
        cy.get('[data-cy=nome]').type('Lucas')
        cy.get('[data-cy=sobrenome]').type('123')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Sobrenome invalido . .').should('have.length', 1)

        // verifica se esta preenchido
        cy.get('[data-cy=sobrenome]').clear()
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo sobrenome . .').should('have.length', 1)

        //verifica campo cpf preenchido
        cy.get('[data-cy=sobrenome]').type('Travesso')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo cpf . .').should('have.length', 1)

        //verifica validade do campo cpf
        cy.get('[data-cy=cpf]').type('123')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('CPF Invalido . .').should('have.length', 1)

        //verifica validade do campo rg preenchido
        cy.get('[data-cy=cpf]').clear()
        cy.get('[data-cy=cpf]').type('12312312312')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo rg . .').should('have.length', 1)

        //verifica validade do campo rg
        cy.get('[data-cy=rg]').type('123')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('RG Invalido . .').should('have.length', 1)

        //verifica data preenchido
        cy.get('[data-cy=rg]').type('123234')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo data de nascimento . .').should('have.length', 1)

        //verifica valide do campo date
        cy.get('[data-cy=dt-nasc]').type('1996-12-26')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo telefone . .').should('have.length', 1)
        cy.get('[data-cy=dt-nasc').clear()
        cy.get('[data-cy=dt-nasc]').type('2025-12-26')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Data de nascimento invalida . .').should('have.length', 1)

        //verifica telefone preenchido
        cy.get('[data-cy=dt-nasc').clear()
        cy.get('[data-cy=dt-nasc]').type('1996-12-26')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo telefone . .').should('have.length', 1)

        //verifica validade do telefone
        cy.get('[data-cy=tel]').type('1231')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Telefone Invalido . .').should('have.length', 1)

        //verifica email preenchido
        cy.get('[data-cy=tel]').type('1231452')
        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo email . .').should('have.length', 1)
    });

    it('email mult validation', () => {
        cy.visit('/login')

        cy.get('[data-cy=register-btn]').click()

        cy.get('[data-cy=nome]').type('Lucas')
        cy.get('[data-cy=sobrenome]').type('Travesso')
        cy.get('[data-cy=cpf]').type('12312312312')
        cy.get('[data-cy=rg]').type('222222222')
        cy.get('[data-cy=dt-nasc]').type('1996-12-26')
        cy.get('[data-cy=tel]').type('12314524567')

        cy.get('[data-cy=btn-register-submit]').click()
        cy.contains('Necessario preencher o campo email . .').should('have.length', 1)

    })
})

/// <reference types="cypress" />

describe('Ongs', () => {
    it('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register');

        // cy.get - busca um elemento
        // .type - insere um texto
        cy.get('[data-cy=name]').type('Salvem o Multiverso');
        cy.get('[data-cy=email]').type('labsStar@gmail.com');
        cy.get('[data-cy=whatsapp]').type('11922554478');
        cy.get('[data-cy=city]').type('São Paulo');
        cy.get('[data-cy=uf]').type('SP');

        // Serve para monitorar um post
        cy.route('POST', '**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();

        // Validações
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })


    });

    it('deve poder realizar um login no sistema', () => {
        // Variavel para armazenar a id da requisição feita com o comando createOng
        const createOngId = Cypress.env('createdOngId');
                
        cy.visit('http://localhost:3000/');

        cy.get('input').type(createOngId);
        cy.get('.button').click();
    });
});

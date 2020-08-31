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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Craição do comando para fazer o POST e não depender de outro teste
Cypress.Commands.add("createOng", () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            name: "doguinos",
            email: "dogs@mail.com",
            whatsapp: "11999999999",
            city: "São Paulo",
            uf: "SP"
        }            
    }).then(response => {
        // Validação
        expect(response.body.id).is.not.null;

        cy.log(response.body.id)

        // Cria uma variavel temporaria para utilizar durante os teste
        Cypress.env('createdOngId', response.body.id);
    });
})

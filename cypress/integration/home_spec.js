// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('The Home Page', function() {
    it('successfully loads', function() {
        cy.visit(''); // change URL to match your dev URL
        cy.wait(1000);
        cy.get('body').click().type('r', {force: true});
        cy.wait(1000);
        cy.contains('خروج');
    })
});
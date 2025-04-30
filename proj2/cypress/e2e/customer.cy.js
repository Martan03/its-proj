function navToAdmin() {
    cy.loginAsAdmin();
    cy.get(':nth-child(2) > .nav-link').click();
}

describe('Managing customers', () => {
    it('Customer details (16)', () => {
        cy.loginAsAdmin();
        cy.get(':nth-child(2) > .nav-link').click();

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();
        cy.get('#first-name').should('not.have.value', '');
    });

    it('Deleting a customer (17)', () => {
        navToAdmin();

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();

        cy.get('#delete-customer').click();
        cy.get('#message-modal').should('be.visible');
        cy.get('.modal-title').contains('Delete Customer');

        cy.get('.modal-footer > .btn-primary').click();
        cy.get('.toast').should('be.visible');
        cy.get('.toast').contains('Customer deleted successfully');
    });

    it('Customer editor (18)', () => {
        navToAdmin();

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();

        cy.get('#edit-customer').click();
        cy.get('#first-name').should('match', 'input');
    });

    it('Editing a customer (19)', () => {
        navToAdmin();
        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();
        cy.get('#edit-customer').click();

        cy.get('#first-name').clear().type('John');
        cy.get('#last-name').clear().type('Doe');
        cy.get('#save-customer').click();

        cy.get('.selected > strong').contains('John Doe');
        cy.get('#first-name').should('have.value', 'John');

        cy.get('.toast').should('be.visible');
        cy.get('.toast').contains('Customer saved successfully');
    });

    it('Required fields highlighted (20)', () => {
        navToAdmin();
        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();
        cy.get('#edit-customer').click();

        cy.get('#first-name').clear();
        cy.get('#last-name').clear();
        cy.get('#email').clear();
        cy.get('#phone-number').clear();
        cy.get('#address').clear().type('Street 123');

        cy.get('#save-customer').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
        cy.get('#address').should('have.value', 'Street 123');
    });

    it('Customer creator (21)', () => {
        navToAdmin();
        cy.get('#add-customer').click();
        cy.get('#first-name')
            .should('match', 'input')
            .should('have.value', '');
    });

    it('Creating a customer (22)', () => {
        navToAdmin();
        cy.get('#add-customer').click();

        cy.get('#first-name').type('Josh');
        cy.get('#last-name').type('Doe');
        cy.get('#email').type('johndoe@gmail.com');
        cy.get('#phone-number').type('1234567890');

        cy.get('#save-customer').click();

        cy.get('.selected > strong').contains('Josh Doe');
        cy.get('#first-name').should('have.value', 'Josh');

        cy.get('.toast').should('be.visible');
        cy.get('.toast').contains('Customer saved successfully');
    });

    it('Cancel editing (23)', () => {
        navToAdmin();
        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();
        cy.get('#edit-customer').click();

        cy.get('#cancel-customer').click();
        cy.get('#first-name').should('be.disabled');
    });

    it('Cancel creating (24)', () => {
        navToAdmin();
        cy.get('#add-customer').click();

        cy.get('#cancel-customer').click();
        cy.get('#first-name').should('be.disabled').should('have.value', '');

        cy.get('.selected > strong').should('not.exist');
    });
});

function navToAdmin() {
    cy.visit('http://localhost:8080/');
    cy.get('.backend-link').click();

    cy.get('#username').type('admin');
    cy.get('#password').type('admin123');

    cy.get('#login').click();
}

function appointmentDetails() {
    cy.get('.fc-timegrid-event-harness > .fc-event').eq(0).click();
    cy.get('.popover').should('be.visible');
}

describe('Managing appointments', () => {
    it('Appointment details (8)', () => {
        navToAdmin();

        // TODO: make sure calendar is not empty
        appointmentDetails();
    });

    it('Deleting an appointment (9)', () => {
        navToAdmin();
        appointmentDetails();

        cy.get('.delete-popover').click();
        cy.get('#message-modal').should('be.visible');
        cy.get(
            '#message-modal > .modal-dialog > .modal-content' +
            '> .modal-footer > .btn-primary'
        ).click();
    });

    it('Appointment editor (10)', () => {
        navToAdmin();
        appointmentDetails();

        cy.get('.edit-popover').click();

        cy.get('#appointments-modal').should('be.visible');
        cy.get(
            '#appointments-modal > .modal-dialog > .modal-content' +
            '> .modal-header > .modal-title'
        ).click();
    });

    it('Editing an appointment (11)', () => {
        navToAdmin();
        appointmentDetails();
        cy.get('.edit-popover').click();

        cy.get('[data-value="#82e4ec"]').click();
        cy.get('#email').clear().type('xfitov00@fit.vutbr.cz');

        cy.get('#save-appointment').click();
        cy.get('.toast').should('be.visible');
        cy.get('.toast-body').contains('Appointment saved successfully');
    });
});
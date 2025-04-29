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
        ).contains('Edit Appointment');
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

    it('Required fields highlighted (12)', () => {
        navToAdmin();
        appointmentDetails();
        cy.get('.edit-popover').click();

        cy.get('#first-name').clear();
        cy.get('#last-name').clear();
        cy.get('#email').clear();
        cy.get('#phone-number').clear();

        cy.get('#save-appointment').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
    });

    it('Closing the appointment details pop-up (13)', () => {
        navToAdmin();
        appointmentDetails();

        cy.get('.close-popover').click();
        cy.get('.popover').should('not.exist');
    });

    it('Cancel editing (14)', () => {
        navToAdmin();
        appointmentDetails();
        cy.get('.edit-popover').click();

        cy.get('#appointments-modal').should('be.visible');
        cy.wait(500);
        cy.get(
            '#appointments-modal > .modal-dialog > .modal-content' +
            '> .modal-footer > .btn-secondary'
        ).click();
    });

    it('Appointment creator (15)', () => {
        navToAdmin();

        cy.get('.dropdown > .btn').click();
        cy.get('#insert-appointment').click();

        cy.get('#appointments-modal').should('be.visible');
        cy.get(
            '#appointments-modal > .modal-dialog > .modal-content' +
            '> .modal-header > .modal-title'
        ).contains('New Appointment');

        cy.get('#first-name').should('have.value', '');
        cy.get('#last-name').should('have.value', '');
        cy.get('#email').should('have.value', '');
        cy.get('#phone-number').should('have.value', '');
    });
});

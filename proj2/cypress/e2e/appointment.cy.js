function mockGetCalendarAppointments(data, name = 'getAppointments') {
    cy.intercept('POST', '/index.php/calendar/get_calendar_appointments', {
        statusCode: 200,
        body: data,
    }).as(name);
}

function mockPostRequest(url, name) {
    cy.intercept('POST', `/index.php/calendar/${url}`, {
        success: true
    }).as(name);
}

function appointmentDetails() {
    cy.get('.fc-timegrid-event-harness > .fc-event').eq(0).click();
    cy.get('.popover').should('be.visible');
}

describe('Managing appointments', () => {
    beforeEach(() => {
        cy.fixture('calendar_appointments').then(mockGetCalendarAppointments);
    });

    it('Appointment details (8)', () => {
        cy.loginAsAdmin();
        cy.wait('@getAppointments');

        appointmentDetails();
    });

    it('Deleting an appointment (9)', () => {
        mockPostRequest('delete_appointment', 'deleteAppointment');

        cy.loginAsAdmin();
        cy.wait('@getAppointments');
        appointmentDetails();

        cy.intercept('POST', '/index.php/calendar/get_calendar_appointments', {
            body: {
                appointments: [],
                unavailabilities: [],
                blocked_periods: []
            }
        }).as('getAppointmentsEmpty');

        cy.get('.delete-popover').click();
        cy.get('#message-modal').should('be.visible');
        cy.get(
            '#message-modal > .modal-dialog > .modal-content' +
            '> .modal-footer > .btn-primary'
        ).click();
        cy.wait('@deleteAppointment');

        cy.wait('@getAppointmentsEmpty');
    });

    it('Appointment editor (10)', () => {
        cy.loginAsAdmin();
        cy.wait('@getAppointments');
        appointmentDetails();

        cy.get('.edit-popover').click();

        cy.get('#appointments-modal').should('be.visible');
        cy.get(
            '#appointments-modal > .modal-dialog > .modal-content' +
            '> .modal-header > .modal-title'
        ).contains('Edit Appointment');
    });

    it('Editing an appointment (11)', () => {
        mockPostRequest('save_appointment', 'saveAppointment');

        cy.loginAsAdmin();
        cy.wait('@getAppointments');

        cy.fixture('calendar_appointments').then(data => {
            data.appointments[0].color = '#82e4ec';
            data.appointments[0].email = 'xlogin00@fit.vutbr.cz';
            mockGetCalendarAppointments(data, 'getAppointmentsUpdated');
        });

        appointmentDetails();
        cy.get('.edit-popover').click();

        cy.get('[data-value="#82e4ec"]').click();
        cy.get('#email').clear().type('xlogin00@fit.vutbr.cz');
        cy.get('#save-appointment').click();
        cy.wait('@saveAppointment');

        cy.wait('@getAppointmentsUpdated');
        cy.get('.fc-timegrid-event-harness > .fc-event').eq(0)
            .should('have.css', 'background-color', 'rgb(130, 228, 236)');

        cy.get('.toast').should('be.visible');
        cy.get('.toast-body').contains('Appointment saved successfully');
    });

    it('Required fields highlighted (12)', () => {
        cy.loginAsAdmin();
        cy.wait('@getAppointments');
        appointmentDetails();
        cy.get('.edit-popover').click();

        cy.get('#first-name').clear();
        cy.get('#last-name').clear();
        cy.get('#email').clear();
        cy.get('#phone-number').clear();
        cy.get('#appointment-notes').clear().type('State retained');

        cy.get('#save-appointment').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
        cy.get('#appointment-notes').should('have.value', 'State retained')
    });

    it('Closing the appointment details pop-up (13)', () => {
        cy.loginAsAdmin();
        appointmentDetails();

        cy.get('.close-popover').click();
        cy.get('.popover').should('not.exist');
    });

    it('Cancel editing (14)', () => {
        cy.loginAsAdmin();
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
        cy.loginAsAdmin();

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


    it('Error message on save appointment API error (27)', () => {
        cy.intercept('POST', `/index.php/calendar/save_appointment`, {
            statusCode: 500,
            body: {
                success: false,
                message: 'Internal Server Error'
            }
        }).as('saveAppointmentError');
        cy.loginAsAdmin();
        cy.wait('@getAppointments');

        appointmentDetails();
        cy.get('.edit-popover').click();

        cy.get('[data-value="#82e4ec"]').click();
        cy.get('#email').clear().type('xlogin00@fit.vutbr.cz');
        cy.get('#save-appointment').click();
        cy.wait('@saveAppointmentError');

        cy.get('#message-modal').should('be.visible');
        cy.get('.card-body').contains('Internal Server Error');
    });
});

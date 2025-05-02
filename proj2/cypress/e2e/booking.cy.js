function navToCustomerInfo() {
    cy.intercept('POST', '/index.php/booking/get_available_hours')
        .as('getAvailableHours');
    cy.visit('http://localhost:8080/');
    cy.wait('@getAvailableHours');

    cy.get('#available-hours > :nth-child(1)').click();
    cy.get('#button-next-2').should('be.visible').click();
}

function fillRequired() {
    cy.fixture('customer').then(data => {
        cy.get('#first-name').type(data.first_name);
        cy.get('#last-name').type(data.last_name);
        cy.get('#email').type(data.email);
        cy.get('#phone-number').type(data.phone_number);
    });
}

describe('Booking an appointment', () => {
    it('Successful booking (1)', () => {
        navToCustomerInfo();
        fillRequired();

        cy.get('#address').type("Božetěchova");
        cy.get('#city').type("Brno");
        cy.get('#zip-code').type("61200");
        cy.get('#notes').type("This is very important note.");

        cy.get('#button-next-3').click();
        cy.get('#book-appointment-submit').click();
        cy.url().should('include', '/booking_confirmation');
    });

    it(
        'Successful customer information fill-in without filling optional (2)',
        () => {
            navToCustomerInfo();
            fillRequired();

            cy.get('#button-next-3').click();
            cy.get('#wizard-frame-4 > .frame-container > .frame-title')
                .contains('Appointment Confirmation');
        }
    );

    it('Required fields highlighted (3)', () => {
        navToCustomerInfo();

        cy.get('#notes').type('Test note');
        cy.get('#button-next-3').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
        cy.get('#notes').should('have.value', 'Test note');
    });

    it('Filled data is too long (4)', () => {
        navToCustomerInfo();

        const a = 'a'.repeat(256);
        cy.get('#first-name').type(a);
        cy.get('#last-name').type(a);
        cy.get('#email').type(`${a}@gmail.com`);
        cy.get('#phone-number').type('1'.repeat(256));
        cy.get('#notes').type('Test note');

        cy.get('#button-next-3').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
        cy.get('#notes').should('have.value', 'Test note');
    });

    it('Going back to date and time booking page (5)', () => {
        cy.visit('http://localhost:8080/');
        cy.wait(2000);

        cy.get('#available-hours > :last-child').click();

        cy.get('#button-next-2').should('be.visible').click();
        cy.get('#button-back-3').should('be.visible').click();

        cy.get('#wizard-frame-2 > .frame-container > .frame-title')
            .contains('Appointment Date & Time');
        cy.get('#available-hours > :last-child')
            .should('have.class', 'selected-hour');
    });

    it('Going back to customer information page (6)', () => {
        navToCustomerInfo();
        fillRequired();

        cy.get('#button-next-3').should('be.visible').click();
        cy.get('#button-back-4').should('be.visible').click();

        cy.get('#wizard-frame-3 > .frame-container > .frame-title')
            .contains('Customer Information');
        cy.fixture('customer').then(data => {
            cy.get('#first-name').should('have.value', data.first_name);
            cy.get('#last-name').should('have.value', data.last_name);
            cy.get('#email').should('have.value', data.email);
            cy.get('#phone-number').should('have.value', data.phone_number);
        });
    });

    it('Changing the language (7)', () => {
        navToCustomerInfo();
        fillRequired();

        cy.get('#select-language').click();
        cy.get('[data-language="czech"]').should('be.visible').click();

        cy.get('#wizard-frame-2 > .frame-container > .frame-title')
            .contains('Zadání vašich údajů');

        cy.fixture('customer').then(data => {
            cy.get('#first-name').should('have.value', data.first_name);
            cy.get('#last-name').should('have.value', data.last_name);
            cy.get('#email').should('have.value', data.email);
            cy.get('#phone-number').should('have.value', data.phone_number);
        });
    });

    it('Error message on booking API error (25)', () => {
        navToCustomerInfo();
        fillRequired();
        cy.get('#button-next-3').click();

        cy.intercept('POST', '/index.php/booking/register', {
            statusCode: 500,
            body: {
                success: false,
                message: 'Internal Server Error'
            }
        }).as('registerError');

        cy.get('#book-appointment-submit').click();
        cy.wait('@registerError');

        cy.get('#message-modal').should('be.visible');
        cy.get('.card-body').contains('Internal Server Error');
    });
});

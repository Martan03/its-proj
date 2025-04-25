function fillRequired() {
    cy.get('#first-name').type("Kačenka");
    cy.get('#last-name').type("Fitová");
    cy.get('#email').type("kacenka@fit.cz");
    cy.get('#phone-number').type("123456789");
}

describe('Booking an appointment', () => {
    it('Successful booking (1)', () => {
        cy.visit('http://localhost:8080/');

        cy.get('#available-hours > :nth-child(1)').click();
        cy.get('#button-next-2').should('be.visible').click();

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
            cy.visit('http://localhost:8080/');

            cy.get('#available-hours > :nth-child(1)').click();
            cy.get('#button-next-2').should('be.visible').click();

            fillRequired();

            cy.get('#button-next-3').click();
            cy.get('#wizard-frame-4 > .frame-container > .frame-title')
                .should('contain', 'Appointment Confirmation');
        }
    );

    it('Required fields highlighted (3)', () => {
        cy.visit('http://localhost:8080/');

        cy.get('#available-hours > :nth-child(1)').click();
        cy.get('#button-next-2').should('be.visible').click();

        cy.get('#button-next-3').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
    });

    it('Filled data is too long (4)', () => {
        cy.visit('http://localhost:8080/');

        cy.get('#available-hours > :nth-child(1)').click();
        cy.get('#button-next-2').should('be.visible').click();

        const a = 'a'.repeat(256);
        cy.get('#first-name').type(a);
        cy.get('#last-name').type(a);
        cy.get('#email').type(`${a}@gmail.com`);
        cy.get('#phone-number').type('1'.repeat(256));

        cy.get('#button-next-3').click();

        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');
        cy.get('#phone-number').should('have.class', 'is-invalid');
    });

    it('Going back to date and time booking page (5)', () => {
        cy.visit('http://localhost:8080/');

        cy.get('.flatpickr-day:not(.flatpickr-disabled)').eq(1).click();
        cy.get('#available-hours > :nth-child(2)').click();

        cy.get('#button-next-2').should('be.visible').click();
        cy.get('#button-back-3').should('be.visible').click();

        cy.get('.flatpickr-day:not(.flatpickr-disabled)').eq(1)
            .should('have.class', 'selected');
        cy.get('#available-hours > :nth-child(2)')
            .should('have.class', 'selected-hour');
    });
});

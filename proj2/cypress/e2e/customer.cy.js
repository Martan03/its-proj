function mockGetCustomers(data, name = 'getCustomers') {
    cy.intercept('POST', '/index.php/customers/search', {
        statusCode: 200,
        body: data,
    }).as(name);
}

function mockPostRequest(url, name, id) {
    cy.intercept('POST', `/index.php/customers/${url}`, {
        success: true,
        id,
    }).as(name);
}

function navToAdmin() {
    cy.loginAsAdmin();
    cy.get(':nth-child(2) > .nav-link').click();
    cy.wait('@getCustomers');
}

describe('Managing customers', () => {
    beforeEach(() => {
        cy.fixture('customers').then(mockGetCustomers);
    });

    it('Customer details (16)', () => {
        navToAdmin();

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();
        cy.fixture('customers').then(data => {
            const user = data[0];
            const full_name = `${user.first_name} ${user.last_name}`;
            cy.get('.selected > strong').contains(full_name);
            cy.get('#first-name').should('have.value', user.first_name);
        })
    });

    it('Deleting a customer (17)', () => {
        cy.intercept('POST', `/index.php/customers/destroy`, {
            success: true
        }).as('deleteCustomer');
        navToAdmin();

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();

        cy.intercept('POST', '/index.php/customers/search', {
            statusCode: 200,
            body: [],
        }).as('getCustomersEmpty');

        cy.get('#delete-customer').click();
        cy.get('#message-modal').should('be.visible');
        cy.get('.modal-title').contains('Delete Customer');

        cy.get('.modal-footer > .btn-primary').click();
        cy.wait('@deleteCustomer');
        cy.wait('@getCustomersEmpty');
        cy.get('.toast').should('be.visible');
        cy.get('.toast').contains('Customer deleted successfully');
    });

    it('Customer editor (18)', () => {
        navToAdmin();

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();

        cy.get('#edit-customer').click();
        cy.get('#first-name').should('match', 'input');
        cy.fixture('customers').then(data => {
            cy.get('#first-name').should('have.value', data[0].first_name);
        })
    });

    it('Editing a customer (19)', () => {
        mockPostRequest('update', 'updateCustomer', 123);
        navToAdmin();
        cy.fixture('customers').then(data => {
            data[0].first_name = 'Josh';
            data[0].last_name = 'Dow';
            mockGetCustomers(data, 'getCustomersUpdated');
        });

        cy.get('.results').children().should('have.length.greaterThan', 0);
        cy.get('.customer-row.entry').eq(0).click();
        cy.get('#edit-customer').click();

        cy.get('#first-name').clear().type('Josh');
        cy.get('#last-name').clear().type('Dow');
        cy.get('#save-customer').click();
        cy.wait('@updateCustomer');

        cy.wait('@getCustomersUpdated');
        cy.get('.selected > strong').contains('Josh Dow');
        cy.get('#first-name').should('have.value', 'Josh');

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
        mockPostRequest('store', 'createCustomer', 314);
        navToAdmin();
        cy.fixture('customers').then(data => {
            cy.fixture('customer').then(customer => {
                data.push(customer);
                mockGetCustomers(data, 'getCustomersUpdated');
            })
        });
        cy.get('#add-customer').click();

        cy.get('#first-name').type('Joshua');
        cy.get('#last-name').type('Clarkson');
        cy.get('#email').type('joshuaclarkson@its.local');
        cy.get('#phone-number').type('123456789');

        cy.get('#save-customer').click();
        cy.wait('@createCustomer');
        cy.wait('@getCustomersUpdated');

        cy.get('.selected > strong').contains('Joshua Clarkson');
        cy.get('#first-name').should('have.value', 'Joshua');

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

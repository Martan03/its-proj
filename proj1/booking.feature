Feature: Booking an appointment

    Scenario: Successful booking (1)
        Given the current page is the appointment booking page
        And valid date and time are selected
        And next button is clicked
        And valid personal details are filled in
        And next button is clicked
        When confirm button is clicked
        Then the successfully registered page is displayed

    Scenario: Successful customer information fill-in without filling optional (2)
        Given the current page is the customer information booking page
        And valid required personal details are filled in
        When the next button is clicked
        Then the confirmation page is displayed

    Scenario: Required fields highlighted (3)
        Given the current page is the customer information booking page
        And no required personal details are filled in
        When the next button is clicked
        Then required fields are highlighted
        And the state is retained

    Scenario: Filled data is too long (4)
        Given the current page is the customer information booking page
        And fields are filled with more than 256 characters
        When next button is clicked
        Then fields are highlighted
        And the state is retained

    Scenario: Going back to date and time booking page (5)
        Given the current page is the customer information booking page
        When back button is clicked
        Then the date and time booking page is displayed
        And the previous date and time are selected

    Scenario: Going back to customer information page (6)
        Given the current page is the confirmation page
        When back button is clicked
        Then the customer information booking page is displayed
        And the previously filled personal details are displayed

    Scenario: Changing the language (7)
        Given the current page is the appointment booking page
        When the language is changed
        Then the page is displayed in the selected language
        And the booking page state is retained

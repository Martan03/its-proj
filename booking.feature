Feature: Booking an appointment

    Scenario: Successful booking
        Given the current page is the appointment booking page
        And valid date and time are selected
        And next button is clicked
        And valid personal details are filled in
        And next button is clicked
        When confirm button is clicked
        Then the successfully registered page is displayed

    Scenario: Successful customer information fill-in without filling optional
        Given the current page is the customer information booking page
        And valid required personal details are filled in
        When the next button is clicked
        Then the confirmation page is displayed

    Scenario: Required fields highlighted
        Given the current page is the customer information booking page
        And no required personal details are filled in
        When the next button is clicked
        Then required fields are highlighted

    Scenario: Filled data is too long
        Given the current page is the customer information booking page
        And fields are filled with more than 256 characters
        When next button is clicked
        Then fields are highlighted

    Scenario: Going back to date and time booking page
        Given the current page is the customer information booking page
        When back button is clicked
        Then the date and time booking page is displayed
        And the previous date and time are selected

    Scenario: Going back to customer information page
        Given the current page is the confirmation page
        When back button is clicked
        Then the customer information booking page is displayed
        And the previously filled personal details are displayed

    Scenario: Changing the language
        Given the current page is the appointment booking page
        When the language is changed
        Then the page is displayed in the selected language
        And the booking page state is retained

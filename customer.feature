Feature: Managing customers

    Scenario: Customer details (16)
        Given the current page is the customers page
        And the customer list is not empty
        When the user clicks on a customer
        Then the customer details and its appointments are displayed

    Scenario: Deleting a customer (17)
        Given the current page contains customer details
        When delete button is clicked
        And the confirmation dialog appears
        And the user confirms the deletion
        Then the customer is removed from the list
        And confirmation message is displayed

    Scenario: Customer editor (18)
        Given the current page contains customer details
        When edit button is clicked
        Then details of the customer are editable

    Scenario: Editing a customer (19)
        Given the current page contains customer editor for existing customer
        And the user edits the customer details
        And all the required fields are filled in
        When save button is clicked
        Then the customer is updated in the list
        And customer details are displayed
        And confirmation message is displayed

    Scenario: Required fields highlighted (20)
        Given the current page contains customer editor
        And required fields are not filled in
        When save button is clicked
        Then required fields are highlighted
        And the state is retained

    Scenario: Customer creator (21)
        Given the current page is the customers page
        When add button is clicked
        Then the customer editor is displayed
        And all fields are empty

    Scenario: Creating a customer (22)
        Given the current page contains customer editor for creating a customer
        And the user fills in the customer details
        And all the required fields are filled in
        When save button is clicked
        Then the customer is added to the list
        And confirmation message is displayed

    Scenario: Cancel editing (23)
        Given the current page contains customer editor for existing customer
        When cancel button is clicked
        Then the customer editor is closed
        And the previous customer details are displayed

    Scenario: Cancel creating (24)
        Given the current page contains customer editor for creating a customer
        When cancel button is clicked
        Then the customer editor is closed
        And empty customer details are displayed
        And the customer list is not updated

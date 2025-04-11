Feature: Managing appointments

    Scenario: Appointment details
        Given the current page is the appointment calendar page
        And the appointment calendar is not empty
        When the user clicks on the appointment
        Then the pop-up with appointment details is displayed

    Scenario: Deleting an appointment
        Given the current page is the appointment calendar page
        And the pop-up with appointment details is displayed
        When delete button is clicked
        And the confirmation dialog appears
        And the user confirms the deletion
        Then the appointment is removed from the calendar

    Scenario: Appointment editor
        Given the current page is the appointment calendar page
        And the pop-up with appointment details is displayed
        When edit button is clicked
        Then the appointment editor is displayed

    Scenario: Editing an appointment
        Given the current page contains appointment editor
        And the user edits the appointment details
        When save button is clicked
        Then the appointment is updated in the calendar

    Scenario: Closing the appointment details pop-up
        Given the current page is the appointment calendar page
        And the pop-up with appointment details is displayed
        When close button is clicked
        Then the appointment pop-up is closed

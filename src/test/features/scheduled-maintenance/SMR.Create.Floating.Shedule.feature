Feature: SMR - Create SMR - Link Assets - Floating Schedule - convert to Work Order

  @smr @smrFloatingSchedule @sanitySMR @e2e
  Scenario: Create a new Scheduled Maintenance Record with Floating Schedule
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Scheduled Maintenance Records page
    And the user creates a new Scheduled Maintenance Record with a unique description and all mandatory fields
    And the user links assets, personnel, and inventory to the Scheduled Maintenance Record
    Then the newly created Scheduled Maintenance Record should be visible in the list
    When the user sets a Floating Schedule and specifies the last done date
    And the user sets the recurrence pattern to "Daily" every "1" day
    Then the Floating Schedule should be successfully applied to the Scheduled Maintenance Record
    And the user verifies the "Last Done Date"
    When the user navigate to the Open Scheduled Maintenance page from SMR
    And the user converts the Scheduled Maintenance Record into a Work Order
    Then the Work Order should be created from the Scheduled Maintenance Record
    When the user closes the converted Work Order record
    Then the Work Order record should be closed successfully

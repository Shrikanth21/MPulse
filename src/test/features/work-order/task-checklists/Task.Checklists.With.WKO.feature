Feature: Task Checklists with WKO

  @taskChecklistsWKO @e2e @sanityTaskChecklists
  Scenario: Verify Task Checklists functionality in Work Order
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Task Checklists page
    And the user creates a new Task Checklist with a unique name and all mandatory fields
    Then the newly created Task Checklist should be visible in the list
    When the user navigates to the Maintenance Task Records page
    And the user creates a new Maintenance Task and links the previously created Task Checklist
    Then the newly created Maintenance Task should be visible in the list
    When the user navigates to the Work Orders page
    And the user creates a new Work Order with created Maintenance Task
    Then the Work Order status should be Open
    And the user verifies that the Maintenance Task Record is present in the Work Order
    And the user checks the created task checklist in the Work Order
    When the user closes the created Work Order record with task checklist
    Then the Work Order record should be closed successfully

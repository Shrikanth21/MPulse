Feature: Report - Form View - Current Record

  @reportCurrentRecord @sanityReport @e2e
  Scenario: Verify current record information is displayed
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    Then the user gets the current record information displayed
    When the user clicks the print button
    And the user sets the filter to current record
    Then the user should see the correct current record information displayed
    And the user verifies the download report functionality

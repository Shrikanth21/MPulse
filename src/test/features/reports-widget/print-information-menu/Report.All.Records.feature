Feature: Report - Form View - All Record

  @reportAllRecords @sanityReport @e2e
  Scenario: Verify all record information is displayed
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    Then the user gets the all record information displayed
    When the user clicks the print button
    And the user sets the filter to all records
    Then the user should see the correct all record information displayed
    And the user verifies the download report functionality

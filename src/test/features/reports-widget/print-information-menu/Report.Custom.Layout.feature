Feature: Report - Form View - Current Layout

  @reportCustomLayout @sanityReport @e2e
  Scenario: Verify current layout of the report form
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user clicks on the Settings icon
    And the user clicks on the add Layout button
    And the user enters a unique name for the layout
    And the user selects the required columns
    Then the layout should be visible in dropdown list
    When the user clicks on the Settings icon again
    And the user navigate to the custom filter Layouts tab
    And the user creates a filter using provided criteria with conditions
    And the user gets the records count from the custom filter layout
    And the user minimizes the list view display
    And the user clicks the print button
    And the user sets the filter to current lookup
    Then the user should see the correct current lookup information displayed
    And the user verifies the download report functionality

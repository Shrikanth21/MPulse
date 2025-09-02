Feature: Report - List View - Print Information Menu

  @reportListView @sanityReport @e2e
  Scenario: Report - List View - Verify user is able to view list view report
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user clicks the list view print button
    Then the user should see the print information menu
    And the user minimizes the list view display

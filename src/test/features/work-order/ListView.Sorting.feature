Feature: List View - Sorting Work Order Records

  @sortWko @listView @e2e @sanityWKListView
  Scenario: User sorts Work Order Records by workorderID
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    When the user click on workorderID
    Then the Work Order record should be sorted successfully
    And the user minimize the Work Order Records list view display

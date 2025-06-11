Feature: Work Order Sorting in MPulse Application

  @sortwo
  Scenario: User can sort workorderID in list view under MPulse application
    Given the user log into the application
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user click on workorderID
    Then the Work Order record should be sorted successfully

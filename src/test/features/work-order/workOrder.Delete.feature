Feature: Work Order - Delete Work Order

  @wko @deleteWko @e2e @sanityWorkOrder
  Scenario: Work Order - Delete and confirm removal from search results
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user click on delete current Record
    Then the Work Order record should be deleted successfully
    And the user should not see the Work Order in the search results

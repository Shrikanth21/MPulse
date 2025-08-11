Feature: Maintenance Request - Delete Maintenance Request Record

  @deleteMrRecord @sanityMR @e2e
  Scenario: Delete Maintenance Request Record for all statuses
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user verifies the maintenance record status
    And the user click on delete current maintenance Record
    Then the  Maintenance Request Records should be deleted successfully
    And the user should not see the Maintenance Request Records in the search results

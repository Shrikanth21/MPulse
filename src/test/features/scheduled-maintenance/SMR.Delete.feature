Feature: SMR - Delete Scheduled Maintenance Record

  @SMR @smrDelete @sanitySMR @e2e
  Scenario: Delete existing Scheduled Maintenance Record
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Scheduled Maintenance Records page
    And the user clicks on delete current Scheduled Maintenance Record
    Then the Scheduled Maintenance Record should be deleted successfully
    And the user should not see the deleted Scheduled Maintenance Record in the search results

Feature: CYC - Delete Cycle Count Record

  @CYC @cycDelete @sanityCYC @e2e
  Scenario: Delete existing Cycle Count Record
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Cycle Count Records page
    And the user clicks on delete current Cycle Count Records
    Then the Cycle Count Record should be deleted successfully
    And the user should not see the deleted Cycle Count Record in the search results

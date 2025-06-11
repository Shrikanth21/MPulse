Feature: Positive Test Cases for MPulse Application

  @wkoDelete
  Scenario: User deletes a new asset in the MPulse application
    Given the user logs into the application
    When the user navigates to the Work Order Records page
    And the user click on delete current Record
    Then the Work Order record should be deleted successfully

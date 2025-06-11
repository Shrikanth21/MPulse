Feature: Positive Test Cases for MPulse Application

  @updatewo
  Scenario: User can update workorder under MPulse application
    Given the user log into the application
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order with a unique description and uploads media
    Then the user search the Work Order Records by work order id
    And the user should see the Work Order in the search results
    When the user click on the search work order
    And the user click on edit button
    Then the user change the description of the Work Order
    Then the changes should be saved successfully

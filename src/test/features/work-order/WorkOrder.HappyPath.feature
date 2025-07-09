Feature: Happy Path Scenarios for MPulse Application

  @happyPath
  Scenario: User can successfully create and view a work order
    Given the user log into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order with a unique description and uploads media
    Then the uploaded image should be visible
    And the Work Order status should be Open

    When the user assign a future due date to the Work Order
    And the user links assets, personnel, and inventory to the Work Order
    When the user closes the created Work Order record
    Then the Work Order record should be closed successfully

    Then the user search the Work Order Records by work order id
    And the user should see the Work Order in the search results
    When the user click on the search work order
    And the user click on edit button
    Then the user change the description of the Work Order
    Then the changes should be saved successfully

    When the user maximizes the Work Order Records list view display
    And the user click on workorderID
    Then the Work Order record should be sorted successfully
    And the user minimize the Work Order Records list view display
    
    When the user click on delete current Record
    Then the Work Order record should be deleted successfully
    And the user should not see the Work Order in the search results

Feature: List View - Create a Purchase Order Requisition Record - Close

  @porRequisition @createPORListView @sanityPOR
  Scenario: Create a Purchase Order Requisition Record and Close
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Requisition Records page
    And the user creates a new Purchase Order Requisition record from List view
    And the user fill the mandatory fields
    And the user uploads a media file in the Purchase Order Requisition
    Then the uploaded image should be visible
    When the user links inventory to the Purchase Order Requisition
    And the user sets the Requisition Status to Back Order and updates the Quantity Received
    Then the Purchase Order Requisition status should be Back Order
    And the user goes to the grid and verifies the Quantity Received is updated successfully
    And the user maximizes the Work Order Records list view display
    When the user closes the created Purchase Order Requisition record from List view
    And the user minimizes the list view display
    Then the Purchase Order Requisition record should be closed successfully

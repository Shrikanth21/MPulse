Feature: POR - Create POR with Quantity Received update - Close

  @porRequisition @createPOR @sanityPOR
  Scenario: Create POR with Quantity Received update and Close
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Requisition Records page
    And the user creates a new Purchase Order Requisition with a mandatory fields
    Then the Purchase Order Requisition status should be Open
    When the user uploads a media file in the Purchase Order Requisition
    Then the uploaded image should be visible
    When the user links inventory to the Purchase Order Requisition
    And the user sets the Requisition Status to Back Order and updates the Quantity Received
    Then the Purchase Order Requisition status should be Back Order
    And the user goes to the grid and verifies the Quantity Received is updated successfully
    When the user closes the created Purchase Order Requisition record
    Then the Purchase Order Requisition record should be closed successfully

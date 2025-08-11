Feature: Maintenance Request - Create and Convert to Work Order and Close

  @maintenanceRequest @convertToWorkOrder @sanityMR @e2e
  Scenario: Create Maintenance Request and Convert to Work Order and Close
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user creates a new Maintenance Request with a unique description
    Then the Maintenance Order status should be Pending
    When the user convert a Maintenance Request into new work order
    And the user uploads media file
    Then the uploaded image should be visible
    And the Work Order status should be Open status
    And the user links assets, personnel, and inventory to the Work Order
    And the user closes the created Work Order record
    Then the Work Order record should be closed successfully

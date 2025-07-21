Feature: Maintenance Request - Auto Convert to Work Order

  @maintenanceRequest @mrAutoConvert @sanityMR
  Scenario: Automatically Convert Maintenance Request to Work Order Upon Creation
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the workflow page and selects work order options
    And the user enables the checkbox for automatic request conversion
    And the user navigates to the Maintenance Request record page after clicking the checkbox
    And the user creates a new Maintenance Request with a unique description
    Then the user navigate to the work order page automatically
    And the Work Order status should be Open status
    When the user navigates to the Maintenance Request record page after creation
    Then the Maintenance Order status should be Converted
    And uncheck the checkbox for automatic request conversion
    
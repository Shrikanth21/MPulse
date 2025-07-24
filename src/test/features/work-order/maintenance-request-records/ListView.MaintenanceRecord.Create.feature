Feature: Maintenance Request - Create from List View

  @maintenanceRequest @mrListView @sanityMR
  Scenario: Create a Maintenance Request Record from List View
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user creates a new Maintenance Request with a unique description in the list view
    Then the Maintenance Order status should be Pending
    When the user upload media file on Maintenance Request page
    Then the uploaded image should be visible
    When the user link inventory to the Maintenance Request
    And the user maximizes the Work Order Records list view display
    And the user convert a Maintenance Request into new work order in the list view
    Then the Work Order status should be Open status
    And the converted Work Order record from List view should be delete successfully
    
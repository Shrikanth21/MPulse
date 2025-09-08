Feature: SMR - Create SMR - Link Assets - Meter Based - Convert to Work Order

  @smr @smrMeterBased @sanitySMR @e2e
  Scenario: Create Scheduled Maintenance Record with Meter Based
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Scheduled Maintenance Records page
    And the user creates a new SMR "Meter Based" with a unique description and all mandatory fields
    And the user links assets, personnel, and inventory to the Scheduled Maintenance Record
    Then the newly created Scheduled Maintenance Record should be visible in the list
    When the user sets a Meter Based Schedule and selects a valid asset
    Then the Meter Based Schedule should be successfully applied to the Scheduled Maintenance Record
    When the user navigate to the Open Scheduled Maintenance page from SMR
    And the user converts the Scheduled Maintenance Record into a Work Order
    Then the Work Order should be created from the Scheduled Maintenance Record
    When the user closes the converted Work Order record
    Then the Work Order record should be closed successfully

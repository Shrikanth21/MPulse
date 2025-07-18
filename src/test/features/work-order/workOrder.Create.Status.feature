Feature: Work Order - Create Work Order Record with Status

  Background:
    Given the user log into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order with a unique description and uploads media
    Then the uploaded image should be visible
    And the Work Order status should be Open
    #And the user assign a future due date to the Work Order

  @wko @closeWko @sanityWorkOrder
  Scenario: Create a Work Order Record - Link/Enter all the Fields & Close
    When the user links assets, personnel, and inventory to the Work Order
    And the user closes the created Work Order record
    Then the Work Order record should be closed successfully
    And the user deletes the newly created Work Order record

  @wko @holdWko @e2e @sanityWorkOrder
  Scenario: Create a Work Order Record - Link/Enter all the Fields & hold
    When the user link asset, personnel, and inventory to the Work Order
    And the user hold the created Work Order record
    Then the Work Order record should be hold successfully
    And the user delete the created new Work Order record

  @wko @cancelWko @e2e @sanityWorkOrder
  Scenario: Create a Work Order Record - Link/Enter all the Fields & Cancel
    When the user cancel the created Work Order record
    Then the Work Order record should be canceled successfully
    And the user delete the newly created Work Order record

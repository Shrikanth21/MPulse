Feature: Asset and Work Order Management in MPulse Application

  Background:
    Given the user logs into the application
    And the user selects a specific database

  @workOrderClose
  Scenario: User create new work order and close the work order
    When the user navigates to the Equipment Records page
    And the user creates a new asset with a unique description and uploads media
    And the user creates a new Work Order linked to the asset
    And the user assigns a future due date to the Work Order
    And the user links task, asset, personnel, and inventory to the Work Order
    And the user completes all fields in the task checklist
    Then the user closes the Work Order and deletes the associated asset

  @assetDelete
  Scenario: User creates a new asset in the MPulse application
    When the user accesses the Building Records section
    And the user creates a new asset with a unique description and uploads media file
    Then the user deletes the created building record

Feature: List View - Create a Work Order Record - Close

  @closeListViewWko @listView @e2e @sanityWKListView
  Scenario: Create a Work Order Record and Close
    Given the user log into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order record from List view with a unique description
    And the user upload media file
    Then the uploaded image should be visible
    And the Work Order status should be Open status
    Then the user assign a future due date to the Work Order
    And the user links assets, personnel, and inventory to the Work Order
    When the Work Order record from List view should be close
    Then the Work Order record from List view should be delete successfully

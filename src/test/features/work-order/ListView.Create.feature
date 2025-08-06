Feature: List View - Create a Work Order Record - Close

  @closeListViewWko @listView @e2e @sanityWKListView
  Scenario: Create a Work Order Record and Close
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order record from List view with a unique description
    And the user uploads media file
    Then the uploaded image should be visible
    And the Work Order status should be Open status
    And the user links assets, personnel, and inventory to the Work Order
    Then the Work Order record from List view should be close

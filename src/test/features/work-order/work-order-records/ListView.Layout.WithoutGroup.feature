Feature: List View - Custom Layouts for Work Order Records (without Grouping)

  @withoutgroup @customFilter @colorCode @listView @e2e @sanityWKListView
  Scenario: Manage custom layout with filters and color coding in Work Order Records without grouping
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user clicks on the Settings icon
    Then the user should see the Settings menu
    When the user clicks on the add Layout button
    And the user enters a unique name for the layout
    And the user selects the required columns
    Then the layout should be visible in dropdown list
    And the layout should be applied and required columns should be visible
    When the user clicks on the Settings icon again
    And the user navigate to the custom filter Layouts tab
    And the user creates a filter using provided criteria with And conditions
    Then the user should see only the Work Orders matching the provided filter criteria
    When the user clicks on the Settings icon again
    And the user navigates to the Color Code Layouts tab
    And the user creates a color code for the status "Closed" with a specific color
    Then the Work Orders with status "Closed" should be highlighted with the specified color
    Then the user deletes the created layout
    And the user minimizes the list view display

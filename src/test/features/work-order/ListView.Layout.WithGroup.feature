Feature: List View - Custom Layouts for Work Order Records (with Grouping)

  @withgroup @listView @e2e @sanityWKListView
  Scenario: Manage custom layout with grouping, filters, and color coding in Work Order Records
    Given the user log into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user clicks on the Settings icon
    When the user clicks on the add Layout button
    And the user enters a unique name for the layout
    And the user selects the required columns
    Then the layout should be visible in dropdown list
    And the layout should be applied and required columns should be visible
    When the user clicks on the Settings icon again
    And the user navigate to the custom filter Layouts tab
    And the user creates a filter using provided criteria with And conditions
    Then the user should see only the Work Orders matching the provided filter criteria
    When the user clicks on the Group checkbox
    And the user drags the "Status" and "Created By" to the group by area
    Then the grouped column header for "Status" should be visible
    And the grouped column header for "Created By" should be visible
    When the user clicks on the Settings icon again
    And the user navigates to the Color Code Layouts tab
    And the user creates a color code for the status "Closed" with a specific color
    And the user expands the last customized group to view its Work Orders
    Then the Work Orders with status "Closed" should be highlighted with the specified color
    Then the user deletes the created layout
    And the user minimize the Work Order Records list view display

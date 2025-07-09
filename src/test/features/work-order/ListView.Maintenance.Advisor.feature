Feature: List View - Maintenance Advisor for Work Order Records

  @setLayoutMA @listView @e2e
  Scenario: Maintenance Advisor - Apply layout, filter, and color code settings
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user clicks on the Settings icon
    Then the user should see the Settings menu
    When the user clicks on the add Layout button
    And the user enters a unique name for the layout
    And the user selects the required columns
    Then the layout should be visible in dropdown lists
    And the layout should be applied and required columns should be visible
    When the user clicks on the Settings icon again
    And the user navigate to the custom filter Layouts tab
    And the user creates a filter using provided criteria with And conditions
    Then the user should see only the Work Orders matching the provided filter criteria
    When the user clicks on the Settings icon again
    And the user navigates to the Color Code Layouts tab
    And the user creates a color code for the status "Closed" with a specific color
    And the user minimize the Work Order Records list view display
    When the user navigates to the Maintenance Advisor module
    Then the user should see the Maintenance Advisor dashboard
    When the user sets the desired layout in Maintenance Advisor
    And the user navigates to the dashboard view
    Then the color code for each record should be displayed correctly
    And the records appearing should match the expected criteria for the layout
    And the user remove the Maintenance Advisor layout

Feature: IM - Select the Default Widget - Click Preview

  @imPreviewWidget @sanityIm @e2e
  Scenario: User clicks on the preview button for the default widget
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    And the user clicks on the Settings icon
    And the user clicks on the add Layout button
    And the user enters a unique name for the layout
    And the user selects the required columns
    Then the layout should be visible in dropdown list
    When the user clicks on the Settings icon again
    And the user navigate to the custom filter Layouts tab
    And the user creates a filter using provided criteria with conditions
    And the user gets the records count from the list view
    And the user navigates to the report Widget page
    And the user creates a new information menu records
    Then the user should see the new Information Menu in the report widget
    And the user should see the correct data count displayed in the preview

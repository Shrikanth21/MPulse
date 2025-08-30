Feature: IM - Select the Default Widget - Place on Maintenance Advisor

  @defaultWidget @sanityIm @e2e
  Scenario: User selects the default widget for the Maintenance Advisor
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the report widget page
    And the user creates a new Information Menu with default widget for Maintenance Advisor
    Then the user should see the new Information Menu in the report widget
    When the user navigates to the Maintenance Advisor module
    Then the user should see the Maintenance Advisor dashboard
    And the user should see the default widget displayed in the Maintenance Advisor
    And the user navigates back to the report widget page
    When the user searches for the new Information Menu in the report widget
    Then the user should see the search results for the new Information Menu
    When the user clicks on the searched Information Menu
    Then the user unchecks the default widget option

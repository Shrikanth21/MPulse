Feature: IM - Create a New IM - Click Save - View the Widget

  @reportWidget @createIm @sanityIm @e2e
  Scenario: Verify the user can create a new IM record, save it, and view it in the widget
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the report widget page
    And the user creates a new Information Menu with unique description and mandatory fields
    Then the user should see the new Information Menu in the report widget
    When the user searches for the new Information Menu in the report widget
    Then the user should see the search results for the new Information Menu

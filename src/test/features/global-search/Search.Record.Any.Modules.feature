Feature: Global Search - Searching a record in any of the modules

  @globalSearch @searchEquipmentRecord @sanityGlobalSearch @e2e
  Scenario: Verify search results for a specific record
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Equipment Records page
    And the user creates a new Equipment Record with a unique description and uploads media
    When the user gets the created record id
    Then the user searches the Equipment Records by equipment id and its description
    And the user should see the Equipment Record in the search results

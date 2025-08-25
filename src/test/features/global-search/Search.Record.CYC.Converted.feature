Feature: Global Search - Search for record Converted from CYC to WKO

  @searchCycConverted @sanityGlobalSearch @e2e
  Scenario: Search for a record that has been converted from CYC to WKO
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Cycle Count Records page
    And the user creates a new Cycle Count with a only description
    When the user gets the created cyc record id
    And the user converts the Cycle Count into a Work Order
    And User navigates back to the Cycle Count Records page
    Then the user navigates to more button on cycle count page
    And the user see the converted work order id on the cycle count page
    When the user searches the Cycle Count Records by cycle count id and its description
    Then the user should see the Cycle Count in the search results

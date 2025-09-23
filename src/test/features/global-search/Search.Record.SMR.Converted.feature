Feature: Global Search - Search for record Converted from SMR to WKO

  @searchSmrConverted @sanityGlobalSearch @e2e
  Scenario: Search for a record that has been converted from SMR to WKO
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Scheduled Maintenance Records page
    And the user creates a new Scheduled Maintenance Record with a only description
    When the user gets the created smr record id
    And the user converts the Scheduled Maintenance into a Work Order
    And User navigates back to the Scheduled Maintenance Records page
    Then the user navigates to more button on scheduled maintenance page
    And the user see the converted work order id on the scheduled maintenance page
    When the user searches the Scheduled Maintenance Records by scheduled maintenance id and its description
    Then the user should see the Scheduled Maintenance in the search results
    When the user click on the searched converted work order record
    Then the Work Order status should be Open

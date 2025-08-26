Feature: Global Search - Search for record Converted from MR and POR to WKO

  @searchMrConvertedRecord @sanityGlobalSearch @e2e
  Scenario: Verify search results for a specific record converted from MR to WKO
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user creates a new Maintenance Request with a only description
    Then the Maintenance Order status should be Pending
    When the user convert a Maintenance Request into new Work order
    When the user gets the created record id
    And the user searches the Maintenance Request Records by request id description and status
    Then the user should see the Maintenance Request in the search results

  @searchClosePorRecord @sanityGlobalSearch @e2e
  Scenario: Verify search results for a specific record converted from POR to WKO
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Requisition Records page
    And the user creates a new Purchase Order Requisition with a mandatory fields
    Then the Purchase Order Requisition status should be Open
    When the user closes the created Purchase Order Requisition record directly
    Then the Purchase Order Requisition record should be closed successfully
    When the user gets the created record id
    And the user searches the Purchase Order Records by order id and status
    Then the user should see the Purchase Order in the search results

  @searchClosedWkoRecord @sanityGlobalSearch @e2e
  Scenario: Verify search results for a specific record closed work order
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order with a unique description
    And the Work Order status should be Open
    And the user closes the created Work Order record
    Then the Work Order record should be closed successfully
    When the user gets the created record id
    And the user searches the closed Work Order Records by order id and status
    Then the user should see the closed Work Order in the search results

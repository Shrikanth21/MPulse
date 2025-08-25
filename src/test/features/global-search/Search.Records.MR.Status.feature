Feature: Global Search - Searching a Maintenance Request Record

  @globalSearch @searchCanceledRecord @sanityGlobalSearch @e2e
  Scenario: Verify search results for Canceled MR record
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user creates a new Maintenance Request with a only description
    Then the Maintenance Order status should be Pending
    When the user Clicks on Cancel Request button
    And the user confirms the cancellation
    Then the Maintenance Order status should be Cancel
    When the user gets the created record id
    And the user searches the Maintenance Request Records by request id description and Cancel status
    Then the user should see the Maintenance Request in the search Cancel results

  @globalSearch @searchQuitWaitingRecord @sanityGlobalSearch @e2e
  Scenario: Verify search results for Search for Waiting for Reply records
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user creates a new Maintenance Request with a only description
    Then the Maintenance Order status should be Pending
    When the user Clicks on Reply To Requester button
    And the user fills in the Reply-To email and CC email, then sends the email
    Then the email should be sent successfully
    And the user can see the Quit Waiting button is enabled
    And the Maintenance Order status should be Waiting for Reply
    When the user gets the created record id
    And the user searches the Maintenance Request Records by request id description and Waiting for Reply status
    Then the user should see the Maintenance Request in the search Waiting for Reply results

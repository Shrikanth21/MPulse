Feature: Work Order - Change Work Order Label Language

  @changeLabel @listView @e2e
  Scenario: Customization - Change and verify record label
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the customization page and selects language options
    And the user selects dropdown values on the customization language page
    When the user navigates to the workorder record page after changing the label
    Then the record text should reflect the updated label
    When the user navigates back to the customization page and selects language options after changing the label
    Then the user selects the same record type from the Record Area dropdown

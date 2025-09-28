Feature: CYC- Verify Auto Convert Functionality

  @cyc @cycAutoConvert
  Scenario: Verify Auto Convert of cycle count records to work orders
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the workflow page and selects Scheduled Maintenance options
    And the user enables the cyc automatic request conversion with on due date
    And the user navigates to the Cycle Count Records page
    And the user creates a new Cycle Count Record with unique description and mandatory fields
    And the user proceeds to the population step by choosing Constant population
    Then the user should see the constant population of items
    And the user should be able to create a new Cycle Count Record with random population successfully
    And the user waits for the cyc auto conversion to occur
    When the user navigates to the Open Work Orders popup
    Then the user should see the converted Work Order
    When the user clicks on the converted work order records
    Then the user navigates to the Work Order record page
    When the user closes the converted Work Order record
    Then the Work Order record should be closed successfully
    And the user changes the automatic cyc request conversion flag

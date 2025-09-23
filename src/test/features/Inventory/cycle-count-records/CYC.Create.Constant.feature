Feature: CYC - Create a CYC record with Constant population -Covert to WKO-Close

  @CYC @cycConstantPopulation @sanityCYC
  Scenario: Create a CYC record with Constant population and Convert to WKO and Close
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Cycle Count Records page
    And the user creates a new Cycle Count Record with unique description and mandatory fields
    And the user proceeds to the population step by choosing Constant population
    Then the user should see the constant population of items
    And the user should be able to create a new Cycle Count Record with random population successfully
    When the user navigate to the Open Scheduled Maintenance page
    And the user set the today date in date range
    And the user search the created cycle count record
    Then the user should see the created Cycle Count Record in the search results
    When the user select the searched record and convert to Work Order
    Then the user should see the Work Order created from Cycle Count Record
    And the Work Order status should be Open
    When the user check the stock quantity of the linked inventory item
    And the user updates the "Constant" stock quantity of the linked inventory item
    And the user closes the converted Work Order record
    Then the Work Order record should be closed successfully
    And the user should verify the "Constant" updated quantity in stock after Closing the record

Feature: List View - Omit and Lookup functionality

  Background:
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display

  @omitRecord @listView @e2e @sanityWKListView
  Scenario: Work Order - Omit and validate exclusion from list
    Then the user get the first record from the Work order records list view
    When the user clicks on the "Omit" button
    Then the omitted Work Order should not appear in the Omitted Records section
    And the user clicks on the "View All" button
    And the user minimizes the list view display

  @lookupRecord @listView @e2e @sanityWKListView
  Scenario: Work Order - Lookup and isolate a record in list view
    Then the user get the first record from the Work order records list view
    When the user clicks on the "Lookup" button
    Then only the selected Work Order should be visible in the list
    And the user clicks on the "View All" button
    And the user minimizes the list view display

Feature: List View - Search and Filter Work Order Records

  @filterwko  @listView @e2e @sanityWKListView
  Scenario: Work Order - Filter operations with search conditions in list view
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user maximizes the Work Order Records list view display
    Then the user get the first record from the Work Order Records list view
    When the user hovers over the search icon and click on "Contains" option
    And the user enters a value in the search field in "Contains" option edit box
    Then the "Contains" filtered results should be displayed
    And the user clicks the Reset option
    When the user hovers over the search icon and click on "Does not contain" option
    And the user enters a value in the search field in "Does not contain" option edit box
    Then the "Does not contain" filtered results should be displayed
    And the user clicks the Reset option
    When the user hovers over the search icon and click on "Equals" option
    And the user enters a value in the search field in "Equals" option edit box
    Then the "Equals" filtered results should be displayed
    And the user clicks the Reset option
    When the user hovers over the search icon and click on "Does not equal" option
    And the user enters a value in the search field in "Does not equal" option edit box
    Then the "Does not equal" filtered results should be displayed
    And the user clicks the Reset option
    When the user hovers over the search icon and click on "Starts with" option
    And the user enters a value in the search field in "Starts with" option edit box
    Then the "Starts with" filtered results should be displayed
    And the user clicks the Reset option
    When the user hovers over the search icon and click on "Ends with" option
    And the user enters a value in the search field in "Ends with" option edit box
    Then the "Ends with" filtered results should be displayed
    And the user clicks the Reset option
    And the user minimize the Work Order Records list view display

Feature: Calendar - Create a New Calendar - verify record is displaying Correctly

  @calendarCreate @sanityCalendar @e2e
  Scenario: Verify the newly created calendar record is displayed correctly
    Given the user logs into the application
    And the user selects a specific database
    When the user navigates to the Work Order Records page
    And the user creates a new Work Order with a unique description and uploads media
    Then the uploaded image should be visible
    And the Work Order status should be Open
    And the user get created work order id
    When the user navigates to the Calendar tab
    Then the user should see the current month calendar view
    When the user clicks on the create calendar filter
    And the user navigates back to the calendar view
    Then the user should see the calendar record details displayed correctly
    And the user deletes the created calendar record

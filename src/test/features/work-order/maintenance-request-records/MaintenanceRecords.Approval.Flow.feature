Feature: Maintenance Request - Create a record with Approval Flow

  Background:
    Given the user log into the application
    And the user selects a specific database
    When the user navigates to the Maintenance Request Records page
    And the user creates a new Maintenance Request with a unique description
    Then the Maintenance Order status should be Pending
    When the user upload media file on maintenance request page
    Then the uploaded image should be visible
    When the user link inventory to the Maintenance Request

  @mrApprovalFlow @replyToRequester @quitWaiting @sanityMR
  Scenario: Create Maintenance Request with Approval Flow and Reply to Requester
    When the user Clicks on Reply To Requester button
    And the user fills in the Reply-To email and CC email, then sends the email
    Then the email should be sent successfully
    And the user can see the Quit Waiting button is enabled
    And the Maintenance Order status should be Waiting for Reply
    When the user Clicks on Quit Waiting button
    Then the Maintenance Order status should be Pending

  @mrApprovalFlow @cancelRequest @sanityMR
  Scenario: Create Maintenance Request with Approval Flow and Cancel Request
    When the user Clicks on Cancel Request button
    And the user confirms the cancellation
    Then the Maintenance Order status should be Cancel

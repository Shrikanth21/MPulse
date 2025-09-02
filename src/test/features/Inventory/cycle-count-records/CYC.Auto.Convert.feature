# Feature: CYC- Verify Auto Convert Functionality
#   @cyc @cycAutoConvert @sanityCYC @e2e
#   Scenario: Verify Auto Convert of cycle count records to work orders
#     Given the user logs into the application
#     And the user selects a specific database
#     When the user navigates to the workflow page and selects Scheduled Maintenance options
#     And the user enables the checkbox for automatic request conversion with on due date
#     And the user navigates to the Cycle Count Records page from the workflow page
#     And the user creates a new Cycle Count Record with a unique description and all mandatory fields
#     And the user links assets, personnel, and inventory to the Cycle Count Record
#     Then the newly created Cycle Count Record should be visible in the list
#     When the user sets a Fixed Schedule and specifies an earlier done date
#     And the user sets the recurrence pattern to "Daily" every "1" day
#     Then the Fixed Schedule should be successfully applied to the Scheduled Maintenance Record
#     And the user verifies the "Last Scheduled Date"
#     And the user waits for the auto conversion to occur
#     When the user navigates to the Open Work Orders popup
#     Then the user should see the converted Work Order
#     When the user clicks on the converted work order records
#     Then the user navigates to the Work Order record page
#     When the user closes the converted Work Order record
#     Then the Work Order record should be closed successfully

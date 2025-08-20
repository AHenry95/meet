Feature: Show/Hide an Events Details
    Scenario: An event element is collapsed by default
        Given the user opens the app
        When the city's event list loads
        Then the event details should be displayed in the collapsed state

    Scenario: User can expand an event to see its details
        Given user is viewing the event list
        When the user clicks on an event's "see details" button
        Then the event details section should appear on the page

    Scenario: User can collapse an event to hide details
        Given the user is viewing an event with an expanded detail section
        When the user clicks on the event's "hide details" button
        Then the event details section should revert to its collapsed state
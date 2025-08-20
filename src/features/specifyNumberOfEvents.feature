Feature: Specify Number of Events
    Scenario: When user hasn't specified a number of events, 32 events are shown by default
        Given user hasn't specified a number of events to display
        When the user opens the app
        Then the user should see a list of 32 events
    
    Scenario: User can change the number of events displayed
        Given the user is viewing the events list
        When the user changes the number in the number of events textbox
        Then the list should display the entered number of events (if enough are available)
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn\'t specified a number of events, 32 events are shown by default', ({ given, when, then}) => {
        
        let AppComponent;
        given('user hasn\'t specified a number of events to display', () => {

        });

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see a list of 32 events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });
    });

    test('User can change the number of events displayed', ({ given, when, then }) => {
 
        let AppComponent;
        let AppDOM;
        let EventListDOM;
        let NumberOfEventsDOM;

        given('the user is viewing the events list', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        when('the user changes the number in the number of events textbox', async () => {
            const user = userEvent.setup();
            NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

            await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
        });

        then('the list should display the entered number of events (if enough are available)', async () => {
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            })
        });
    });
});
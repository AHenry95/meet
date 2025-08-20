import React from 'react';
import { loadFeature, defineFeature} from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        
        let AppComponent;
        let AppDOM;
        let EventListDOM;
        given('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        when('the city\'s event list loads', async () => {
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(1);
            });
        });

        then('the event details should be displayed in the collapsed state', () => {
            const eventDetails = EventListDOM.querySelector('.event-details');
            expect(eventDetails).toBeNull();
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        
        let AppComponent;
        let AppDOM;
        let EventListDOM;

        given('user is viewing the event list', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor (() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(1);
            });
        });

        when('the user clicks on an event\'s "see details" button', async () => {
            const user = userEvent.setup();
            const detailsButton = EventListDOM.querySelector('.details-toggler');
            await user.click(detailsButton);
        });

        then('the event details section should appear on the page', () => {
            const eventDetails = EventListDOM.querySelector('.event-details');
            expect(eventDetails).toBeInTheDocument();
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        
        let AppComponent;
        let AppDOM;
        let EventListDOM;

        given('the user is viewing an event with an expanded detail section', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(1);
            });

            const user = userEvent.setup();
            const detailsButton = EventListDOM.querySelector('.details-toggler');
            await user.click(detailsButton);

            const eventDetails = EventListDOM.querySelector('.event-details');
            expect(eventDetails).toBeInTheDocument();
        });

        when('the user clicks on the event\'s "hide details" button', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = EventListDOM.querySelector('.details-toggler');
            await user.click(hideDetailsButton);
        });


        then('the event details section should revert to its collapsed state', () => {
            const eventDetails = EventListDOM.querySelector('.event-details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });
});
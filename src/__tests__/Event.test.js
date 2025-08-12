import React from 'react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Event from '../components/Event'
import { getEvents } from '../api';

describe('<Event /> component', () => {

    let EventComponent;
    let allEvents;

    beforeEach( async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
    });

    test('render event summary', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('render event start time', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });

    test('render event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('render button to show element details', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });

    test('render the event details section hidden by default', () => {
        expect(EventComponent.container.querySelector('#event-details')).not.toBeInTheDocument();
    });

    test('show event details section when user clicks "show details" button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.container.querySelector('.details-toggler');
        await user.click(showDetailsButton);

        expect(EventComponent.container.querySelector('#event-details')).toBeInTheDocument();
    });

    test('show details button text changes to hide details when event details are rendered', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.container.querySelector('.details-toggler');
        await user.click(showDetailsButton);
        expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
    })

    test('hide event details when user clicks hide details button shown in event details view', async () => {
        const user = userEvent.setup();

        const showDetailsButton = EventComponent.container.querySelector('.show-details');
        await user.click(showDetailsButton);

        const hideDetailsButton = EventComponent.container.querySelector('.hide-details');
        await user.click(hideDetailsButton);

        expect(EventComponent.container.querySelector('#event-details')).not.toBeInTheDocument();
    });
})
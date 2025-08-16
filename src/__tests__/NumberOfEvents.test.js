import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';
import { userEvent } from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsDOM;

    beforeEach(() => {
        NumberOfEventsDOM = render(
            <NumberOfEvents
                currentNOE={32}
                setCurrentNOE={() => {}}
            />);
    });

    test('render number input for number of events', () => {
        expect(NumberOfEventsDOM.queryByRole('textbox')).toBeInTheDocument();
    });

    test('render number input with default number of events to render set to 32', () => {
        const eventNumberTextBox = NumberOfEventsDOM.queryByRole('textbox');
        expect(eventNumberTextBox).toHaveValue('32');
    });

    test('updates number of events displayed when user types in the textbox', async () => {
        const user = userEvent.setup();
        const eventNumberTextBox = NumberOfEventsDOM.queryByRole('textbox');
        await user.type(eventNumberTextBox, '{backspace}{backspace}10');

        expect(eventNumberTextBox).toHaveValue('10');
    })
})

describe('<NumberOfEvents /> integration', () => {
    test('number of events shown updates when currentNOE state changes', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        
        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor (() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
        })

        const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events"); 
        const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

        await user.type(NumberOfEventsInput, '{backspace}{backspace}10');

        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(10);
        })

    })
})
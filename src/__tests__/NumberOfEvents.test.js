import React from 'react';
import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import { userEvent } from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsDOM;

    beforeEach(() => {
        NumberOfEventsDOM = render(<NumberOfEvents />);
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
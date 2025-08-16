import React, { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
    const [inputValue, setInputValue] = useState(currentNOE);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const numValue = parseInt(value);
        if (numValue > 0) {
            setCurrentNOE(value);
        };
    };

    return (
        <div id="number-of-events">
            <input 
                className="NumberOfEvent-setter"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default NumberOfEvents;
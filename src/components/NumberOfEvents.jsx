import React, { useState } from 'react';

const NumberOfEvents = () => {
    const [inputValue, setInputValue] = useState('32');

    return (
        <div id="number-of-events">
            <input 
                className="NumberOfEvent-setter"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};

export default NumberOfEvents;
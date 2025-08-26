import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const [inputValue, setInputValue] = useState(String(currentNOE || 32));

    useEffect(() => {
        setInputValue(String(currentNOE || 32))
    }, [currentNOE]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        let alertText= '';

        if(isNaN(value) || parseInt(value) <= 0) {
            alertText = 'Please enter a valid number.';
        } else {
            const numValue = parseInt(value);
            if (numValue > 0) {
                setCurrentNOE(value);
            };
        }

        setErrorAlert(alertText);

       
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
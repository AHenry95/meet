import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    const { summary, location, start, end } = event;

    const getUserTimeZoneAbbr = () => {
        const date = new Date();
        const timeString = date.toLocaleTimeString('en-US', {
            timeZoneName: 'short'
        });
        return timeString.split(' ').pop();
    };
    
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    };

    const startDateTime = formatDateTime(start.dateTime);
    const endDateTime = formatDateTime(end.dateTime);
    const timeZoneAbbr = getUserTimeZoneAbbr();

    return (
        <li key={event.id} role="listitem" className="event">
            <h2 className="summary">{summary}</h2>
            <div className="event-time">
                <span>Date: {startDateTime.date}</span><br />
                <span>Time: {startDateTime.time} - {endDateTime.time} ({timeZoneAbbr})</span>
            </div>
            <span className="location">{location}</span>
            <button 
                className="details-toggler"
                onClick={() => setShowDetails(!showDetails)}    
            >
                {showDetails ? 'hide details' : 'show details'}
            </button>
            {showDetails
                ? <div className="event-details">
                    <p>{event.description}</p>
                </div>
                : null
            }
        </li>
    );
}

export default Event;
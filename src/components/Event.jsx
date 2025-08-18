import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    const { summary, created, location } = event;

    return (
        <li key={event.id} role="listitem" className="event">
            <h2>{summary}</h2>
            <span>{created}</span>
            <span>{location}</span>
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
import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alerts';
import { getEvents, extractLocations } from './api.js';

import './App.css';

function App() {
	const [events, setEvents] = useState([]);
	const [currentNOE, setCurrentNOE] = useState(32);
	const [allLocations, setAllLocations] = useState([]);
	const [currentCity, setCurrentCity] = useState('See all cities');
	const [infoAlert, setInfoAlert] = useState('');
	const [errorAlert, setErrorAlert] = useState('');
	const [warningAlert, setWarningAlert] = useState('');

	const fetchData = async () => {
		const allEvents = await getEvents();
		const filteredEvents = currentCity === 'See all cities'
			? allEvents
			: allEvents.filter(event => event.location === currentCity);
		setEvents(filteredEvents.slice(0, currentNOE));
		setAllLocations(extractLocations(allEvents));
	}

	useEffect(() => {
		if(navigator.onLine) {
			setWarningAlert('');
		} else {
			setWarningAlert('You are offline. Please reconnect to the internet if you wish to see an updated list of events.');
		}
		fetchData();
	}, [currentCity, currentNOE]);

	return (
    	<div className="App">
			<div className="alerts-container">
				{infoAlert.length
					? <InfoAlert text={infoAlert} />
					: null
				}
				{errorAlert.length
					? <ErrorAlert text={errorAlert} />
					: null
				}
				{warningAlert.length
					? <WarningAlert text={warningAlert} />
					: null
				}
			</div>
			<CitySearch 
				allLocations={allLocations} 
				setCurrentCity={setCurrentCity}
				setInfoAlert={setInfoAlert}
			/>
			<NumberOfEvents 
				currentNOE={currentNOE} 
				setCurrentNOE={setCurrentNOE}
				setErrorAlert={setErrorAlert}
			/>
			<CityEventsChart allLocations={allLocations} events={events} />
      		<EventList events={events}/>
    	</div>
  	);
}

export default App;
import React from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import mockData from './mock-data';

function App() {

	return (
    	<div className="App">
			<CitySearch />
			<NumberOfEvents />
      		<EventList events={mockData}/>
    	</div>
  	);
}

export default App;
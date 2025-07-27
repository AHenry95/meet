# Meet app

## Description 

A React-based serverless, progressive web application that will allow users to view upcoming events using the Google Calender API. 

## Tech Stack

- **React** ^19.1.0
- **React-Dom** ^19.1.0
- **Vite** ^7.0.4

## User Stories, Scenarios, and Gherkins 

### Feature 1: Filter Events By City

#### User Story

> As a user,  
> I should be able to filter events by city  
> So that I can see a list of events taking place in that city  

#### Scenarios 


##### **Scenario 1**: When user hasn’t searched for a city, show upcoming events from all cities.
* **Given** user hasn't searched for any city;
* **When** the user opens the app;
* **Then** the user should see a list of upcoming events;

#### **Scenario 2**: User should see a list of suggestions when they search for a city.
* **Given** the main page is open;
* **When** user starts typing in the city textbox;
* **Then** the user should receive a list of cities (suggestions) that match what theyy've typed.

#### **Scenario 3**: User can select a city from the suggested list.
* **Given** user was typing "Berlin" in the city textbox AND the list of suggested cities is showing;
* **When** the user selects a city (e.g., "Berlin, Germany") from the list.
* **Then** their city should be changed to that city (i.e. "Berlin, Germany") AND the user should receive a list of upcoming events in that city.

---
### Feature 2: Show/Hide Event Details

#### User Story

> As a user,  
> I should be able to open and close event displays  
> So I can view specific details about events I am interested in  

#### Scenarios

##### **Scenario 1**: An event element is collapsed by default.
* **Given** the user opens the view for events in a certain city;
* **When** the city's event list loads;
* **Then** the events should be displayed in a collapsed state;

##### **Scenario 2**: User can expand an event to see details.
* **Given** the user is viewing a collapsed event element;
* **When** the user clicks on the button to see more event details;
* **Then** the event element expands to show the user more detials;
   
##### **Scenario 3**: User can collapse an event to hide details.
* **Given** the user is viewing an expanded event element;
* **When** the user clicks on the button to collapse the element view;
* **Then** the event element changes from expanded state back to the default (collapsed) state;

---
### Feature 3: Specify Number of Events

#### User Story

> As a user  
> I should be able to speicfy the number of events displayed  
> So I can decided how many events I want to see on the page at any one time  

#### Scenarios 

##### Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
* **Given** the user selects a city in whcih to view events;
* **When** the user should be presented with an option to select the number of events to be shown;
* * **Then** the list of events should load the number of elements the user request (if enough are available from the API);
  
##### Scenario 2: User can change the number of events displayed.
* **Given** the user is viewing a list of a selected number of events;
* **When** the user changes the number of events to display in the event number specificer;
* **Then** the list either adds (if avialble) events until the new number is reach OR events are removed until the new number is reached;

---
### Feature 4: Use the App When Offline

**** User Story

> As a user  
> I should be able to access events that have already loaded when there is no internet connection  
> So I can check information on events if I am in a situation when I do not have access to the internet  

##### Scenario 1: Show cached data when there’s no internet connection.
* **Given** the user has previously loaded information on events;
* **When** the user opens the app while not having an active internet connection;
* **Then** previosuly cached event data should be shown to the user;

##### Scenario 2: Show error when user changes search settings (city, number of events).
* **Given** the user was viewing a cached event list while not having access to the internet;
* **When** the user changes a search setting (i.e. city or increases number of events);
* **Then** the app will display an error message alerting the user it cannot loading more events until the user connects to the internet;

---
### Feature 5: Add an App Shortcut to the Home Screen

**** User Story

> As a user  
> I should be able to add a shortcut to the app on my device homescreen  
> So that I can more easily access the app  

##### Scenario 1: User can install the meet app as a shortcut on their device home screen.
* **Given** the user has opened the app on a mobile deivce;
* **When** the user selects the "Add to Home Screen" option in the mobile browser";
* **Then** an icon that links directly to the meet app will appear on the user's device home screen;

---
### Feature 6: Display Charts Visualizing Event Details

#### User Story

> As a user  
> I should be able to view a visualization of the data showing events near me  
> So that at I glance I can understand the number and types of events going on near me  

##### Scenario 1: Show a chart with the number of upcoming events in each city.
* **Given** that there are events available for a given city;
* **When** the user selects the given city in the meet app;
* **Then** in addition to events, the meet app will dispaly data visualization containing information on the number/type of events in that city; 

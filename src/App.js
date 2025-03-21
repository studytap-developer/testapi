import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://924c-122-169-159-104.ngrok-free.app/events")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Debugging API response
        if (data.items) {
          // Extract only required fields
          const formattedEvents = data.items.map(event => ({
            name: event.title || "N/A",
            address: event.location?.address || "No Address Provided",
            startDate: event.startDate ? formatDate(event.startDate) : "No Date",
            startTime: event.startDate ? formatTime(event.startDate) : "No Time",
          }));
          setEvents(formattedEvents);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Function to format date (e.g., "28 Dec 2024")
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(date);
  };

  // Function to format time (e.g., "4:30 PM")
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Event List</h1>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.name}</strong> <br />
                <span>📍 {event.address}</span> <br />
                <span>📅 {event.startDate}</span> <br />
                <span>⏰ {event.startTime}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading events...</p>
        )}
      </header>
    </div>
  );
}

export default App;







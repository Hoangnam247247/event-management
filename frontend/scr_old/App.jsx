import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Event Management</h1>

      {events.length === 0 ? (
        <p>Chưa có sự kiện</p>
      ) : (
        <ul>
          {events.map(e => (
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

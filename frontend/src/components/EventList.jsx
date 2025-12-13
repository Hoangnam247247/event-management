/*import { useState, useEffect } from "react";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../api";
import EventForm from "./EventForm";
import EventItem from "./EventItem";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadEvents = () => {
    setLoading(true);
    fetchEvents()
      .then(res => setEvents(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAdd = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleSubmit = (data) => {
    const action = data.id ? updateEvent : createEvent;
    action(data).then(() => {
      setShowForm(false);
      loadEvents();
    });
  };

  const handleDelete = (id) => {
    deleteEvent(id).then(loadEvents);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  return (
    <div>
      <button onClick={handleAdd}>Thêm sự kiện</button>
      {showForm && (
        <EventForm
          event={editingEvent}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {events.map(e => (
          <EventItem
            key={e.id}
            event={e}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default EventList;*/

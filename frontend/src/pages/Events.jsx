import { useEffect, useState } from "react";
import { apiGet } from "../api";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/events").then(setEvents);
  }, []);

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <h1>Danh sách sự kiện</h1>

      <input
        placeholder="Tìm theo tên sự kiện..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        style={{ padding: 8, width: 300, marginBottom: 20 }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20
        }}
      >
        {filtered.map(ev => (
          <EventCard
            key={ev.id}
            event={ev}
            onClick={() => navigate(`/events/${ev.id}`)}
          />
        ))}
      </div>

      {filtered.length === 0 && <p>Không có sự kiện phù hợp</p>}
    </div>
  );
}

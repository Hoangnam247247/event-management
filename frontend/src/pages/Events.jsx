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
    <div
      style={{
        padding: "36px",
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
        background: "#f8fafc"
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#1e40af",
          marginBottom: 18
        }}
      >
        Danh sách sự kiện
      </h1>

      {/* SEARCH */}
      <input
        placeholder="Tìm theo tên sự kiện..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        style={{
          padding: "11px 16px",
          width: 320,
          borderRadius: 10,
          border: "1px solid #1e40af",
          outline: "none",
          fontSize: 14,
          marginBottom: 28,
          background: "#fff",
          boxShadow: "0 4px 10px rgba(30,64,175,0.15)"
        }}
      />

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 26
        }}
      >
        {filtered.map(ev => (
  <div
    key={ev.id}
    style={{
      background: "linear-gradient(180deg, #ffffff, #f1f5ff)",
      borderRadius: 14,
      padding: 4,
      boxShadow: "0 10px 25px rgba(30,64,175,0.15)",
      transition: "0.25s",
      cursor: "pointer",
      borderLeft: "6px solid #1e40af"   // ✅ thêm màu nhấn
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow =
        "0 18px 40px rgba(30,64,175,0.25)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow =
        "0 10px 25px rgba(30,64,175,0.15)";
    }}
    onClick={() => navigate(`/events/${ev.id}`)}
  >
    {/* dải màu trên cùng */}
    <div
      style={{
        height: 6,
        background: "linear-gradient(90deg, #1e40af, #60a5fa)",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        marginBottom: 6
      }}
    />

    <EventCard event={ev} />
  </div>
))}

      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p
          style={{
            marginTop: 32,
            color: "#1e3a8a",
            fontStyle: "italic",
            background: "#eef2ff",
            padding: 16,
            borderRadius: 10,
            display: "inline-block"
          }}
        >
          Không có sự kiện phù hợp
        </p>
      )}
    </div>
  );
}

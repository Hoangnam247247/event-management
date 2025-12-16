export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        cursor: "pointer",
        background: "#fff"
      }}
    >
      <h3>{event.title}</h3>
      <p><b>Địa điểm:</b> {event.location}</p>
      <p><b>Bắt đầu:</b> {new Date(event.start_time).toLocaleString()}</p>
    </div>
  );
}

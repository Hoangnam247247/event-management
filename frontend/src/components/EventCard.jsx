export default function EventCard({ event }) {
  return (
    <div style={{ padding: 16 }}>
      <h3
  style={{
    fontSize: 19,          // ⬅️ to hơn một chút
    fontWeight: 700,
    lineHeight: 2.5,      // ⬅️ tránh dính dòng
    marginBottom: 10,
    color: "#1e40af"
  }}
>
  {event.title}
</h3>


      <p style={{ marginBottom: 6 }}>
        <b>Địa điểm:</b> {event.location}
      </p>

      <p style={{ marginBottom: 6 }}>
        <b>Bắt đầu:</b>{" "}
        {new Date(event.start_time).toLocaleString()}
      </p>
    </div>
  );
}

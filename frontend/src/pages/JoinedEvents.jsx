import { useState } from "react";
import { apiGet } from "../api";

export default function JoinedEvents() {
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!email) return alert("Vui lòng nhập email");
    setLoading(true);
    const res = await apiGet(`/registrations/by-email?email=${email}`);
    setEvents(res);
    setLoading(false);
  }

  return (
    <div>
      <h1>Sự kiện đã tham gia</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Nhập email đã đăng ký"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 8, width: 300 }}
        />
        <button onClick={search} style={{ marginLeft: 10 }}>
          Tìm
        </button>
      </div>

      {loading && <p>Đang tải...</p>}

      {events.length === 0 && !loading && (
        <p>Không tìm thấy sự kiện nào</p>
      )}

      <div style={{ display: "grid", gap: 16 }}>
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16
            }}
          >
            <h3>{e.title}</h3>
            <p><b>Địa điểm:</b> {e.location}</p>
            <p><b>Bắt đầu:</b> {new Date(e.start_time).toLocaleString()}</p>
            <p><b>Ghế:</b> {e.seat_number}</p>
            <p><b>Trạng thái:</b> {e.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

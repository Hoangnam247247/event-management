import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api";
import { useNavigate } from "react-router-dom";

export default function EventManageModal({ onClose }) {
  const [events, setEvents] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    apiGet("/events/admin/events").then(setEvents);
  }, []);

  async function remove(id) {
    try {
      await apiDelete(`/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
    } catch {
      alert("Không thể xoá sự kiện đã có người đăng ký");
    }
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Quản lý sự kiện</h2>
        <button onClick={onClose}>Đóng</button>

        <table border="1" cellPadding="8" width="100%">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Thời gian</th>
              <th>Địa điểm</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id}
                title={`Tổng vé: ${e.total_tickets}
Check-in: ${e.checked_in}`}
              >
                <td>{e.title}</td>
                <td>{new Date(e.start_time).toLocaleString()}</td>
                <td>{e.location}</td>
                <td>
                  <button onClick={() => nav(`/admin/edit-event/${e.id}`)}>
                    Sửa
                  </button>
                  <button onClick={() => remove(e.id)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modal = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: "80%",
  maxHeight: "80%",
  overflowY: "auto"
};

import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api";
import CreateEventForm from "./CreateEventForm";
import EditEventForm from "./EditEventForm";

export default function EventManageModal({ onClose }) {
  const [events, setEvents] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState(null);

  // Lấy danh sách sự kiện từ server
  useEffect(() => {
    apiGet("/events/admin/events").then(setEvents);
  }, []);

  // Xoá sự kiện
  async function remove(id) {
    try {
      await apiDelete(`/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
    } catch {
      alert("Không thể xoá sự kiện đã có người đăng ký");
    }
  }

  // Cập nhật list sự kiện sau khi tạo mới
  function handleCreated(newEvent) {
    setEvents([...events, newEvent]);
  }

  // Cập nhật list sự kiện sau khi sửa
  function handleEdited() {
    setEditing(null);
    apiGet("/events/admin/events").then(setEvents);
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Quản lý sự kiện</h2>

        <div style={{ marginBottom: 10 }}>
          <button onClick={() => setShowCreate(true)}>+ Tạo sự kiện mới</button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>Đóng</button>
        </div>

        {showCreate && (
          <CreateEventForm
            onCreated={handleCreated}
            onClose={() => setShowCreate(false)}
          />
        )}

        {editing && (
          <EditEventForm
            event={editing}
            onDone={handleEdited}
          />
        )}

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
              <tr
                key={e.id} // ID duy nhất từ server
                title={`Tổng vé: ${e.total_tickets || 0}\nCheck-in: ${e.checked_in || 0}`}
              >
                <td>{e.title}</td>
                <td>{new Date(e.start_time).toLocaleString()}</td>
                <td>{e.location}</td>
                <td>
                  <button onClick={() => setEditing(e)}>Sửa</button>
                  <button onClick={() => remove(e.id)} style={{ marginLeft: 5 }}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== style ===== */
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

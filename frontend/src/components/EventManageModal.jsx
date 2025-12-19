import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api";
import CreateEventForm from "./CreateEventForm";
import EditEventForm from "./EditEventForm";
import "./EventManageModal.css";


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
  <div className="manage-overlay">
    <div className="manage-modal">

      {/* HEADER */}
      <div className="manage-header">
        <h2>Quản lý sự kiện</h2>

        <div className="manage-actions">
          <button
            className="btn-primary"
            onClick={() => setShowCreate(true)}
          >
            + Tạo sự kiện
          </button>

          <button
            className="btn-outline"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>

      {/* FORM CREATE */}
      {showCreate && (
        <CreateEventForm
          onCreated={handleCreated}
          onClose={() => setShowCreate(false)}
        />
      )}

      {/* FORM EDIT */}
      {editing && (
        <EditEventForm
          event={editing}
          onDone={handleEdited}
        />
      )}

      {/* TABLE */}
      <div className="table-wrap">
        <table className="manage-table">
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
                key={e.id}
                title={`Tổng vé: ${e.total_tickets || 0}\nCheck-in: ${e.checked_in || 0}`}
              >
                <td>{e.title}</td>
                <td>{new Date(e.start_time).toLocaleString()}</td>
                <td>{e.location}</td>
                <td>
                  <button
                    className="action-btn btn-edit"
                    onClick={() => setEditing(e)}
                  >
                    Sửa
                  </button>
                  <button
                    className="action-btn btn-delete"
                    onClick={() => remove(e.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

import { useState } from "react";
import { apiPut } from "../api";
import "./EditEventForm.css";

export default function EditEventForm({ event, onDone }) {

  function formatDateTime(value) {
    if (!value) return "";
    return value.slice(0, 16);
  }

  const [form, setForm] = useState({
    ...event,
    start_time: formatDateTime(event.start_time),
    end_time: formatDateTime(event.end_time)
  });

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    await apiPut(`/events/${event.id}`, {
      title: form.title,
      start_time: form.start_time,
      end_time: form.end_time,
      location: form.location
    });

    onDone();
  }

  return (
    <div className="edit-overlay">
      <div className="edit-modal">

        <div className="edit-header">
          <h3>Sửa sự kiện</h3>
          <button className="edit-close" onClick={onDone}>×</button>
        </div>

        <div className="edit-group">
          <label>Tên sự kiện</label>
          <input
            name="title"
            value={form.title || ""}
            onChange={change}
          />
        </div>

        <div className="edit-group">
          <label>Thời gian bắt đầu</label>
          <input
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={change}
          />
        </div>

        <div className="edit-group">
          <label>Thời gian kết thúc</label>
          <input
            type="datetime-local"
            name="end_time"
            value={form.end_time}
            onChange={change}
          />
        </div>

        <div className="edit-group">
          <label>Địa điểm</label>
          <input
            name="location"
            value={form.location || ""}
            onChange={change}
          />
        </div>

        <div className="edit-actions">
          <button className="btn-save" onClick={submit}>
            Lưu
          </button>
          <button className="btn-cancel" onClick={onDone}>
            Hủy
          </button>
        </div>

      </div>
    </div>
  );
}

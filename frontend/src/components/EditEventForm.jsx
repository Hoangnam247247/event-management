import { useState } from "react";
import { apiPut } from "../api";

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

    alert("Cập nhật thành công");
    onDone();
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <h3>Sửa sự kiện</h3>

      <input
        name="title"
        value={form.title || ""}
        onChange={change}
        placeholder="Tên sự kiện"
      /><br/>

      <input
        type="datetime-local"
        name="start_time"
        value={form.start_time}
        onChange={change}
      /><br/>

      <input
        type="datetime-local"
        name="end_time"
        value={form.end_time}
        onChange={change}
      /><br/>

      <input
        name="location"
        value={form.location || ""}
        onChange={change}
        placeholder="Địa điểm"
      /><br/>

      <button onClick={submit}>Lưu</button>
      <button onClick={onDone} style={{ marginLeft: 5 }}>
        Hủy
      </button>
    </div>
  );
}

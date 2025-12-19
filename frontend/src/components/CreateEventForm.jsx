import { useState } from "react";
import { apiPost } from "../api";

export default function CreateEventForm({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    start_time: "",
    end_time: "",
    location: ""
  });

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    try {
      const res = await apiPost("/events", form); // lấy dữ liệu trả về
      alert("Tạo sự kiện thành công");
      onCreated(res); // truyền lên parent
      onClose();
    } catch (err) {
      alert(err.response?.data?.detail || "Lỗi tạo sự kiện");
    }
  }

  const now = new Date().toISOString().slice(0, 16);

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <h3>Tạo sự kiện</h3>

      <input
        name="title"
        placeholder="Tên sự kiện"
        onChange={change}
      /><br/>

      <input
        type="datetime-local"
        name="start_time"
        min={now}
        onChange={change}
      /><br/>

      <input
        type="datetime-local"
        name="end_time"
        min={form.start_time}
        onChange={change}
      /><br/>

      <input
        name="location"
        placeholder="Địa điểm"
        onChange={change}
      /><br/>

      <button onClick={submit}>Lưu</button>
      <button onClick={onClose} style={{ marginLeft: 10 }}>Hủy</button>
    </div>
  );
}

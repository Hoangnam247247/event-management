import { useState } from "react";
import { apiPost } from "../api";
import "./CreateEventForm.css";

export default function CreateEventForm({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    start_time: "",
    end_time: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    setError("");

    if (!form.title || !form.start_time || !form.end_time) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      const res = await apiPost("/events", form);
      onCreated(res);
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Lỗi tạo sự kiện");
    } finally {
      setLoading(false);
    }
  }

  const now = new Date().toISOString().slice(0, 16);

return (
  <div className="modal-overlay">
    <div className="modal">

      <div className="modal-header">
        <h3>Tạo sự kiện mới</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="form-group">
        <label>Tên sự kiện</label>
        <input name="title" onChange={change} />
      </div>

      <div className="form-group">
        <label>Thời gian bắt đầu</label>
        <input type="datetime-local" name="start_time" min={now} onChange={change} />
      </div>

      <div className="form-group">
        <label>Thời gian kết thúc</label>
        <input type="datetime-local" name="end_time" min={form.start_time} onChange={change} />
      </div>

      <div className="form-group">
        <label>Địa điểm</label>
        <input name="location" onChange={change} />
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={onClose}>Hủy</button>
        <button className="btn-primary" onClick={submit}>Tạo sự kiện</button>
      </div>

    </div>
  </div>
);

}

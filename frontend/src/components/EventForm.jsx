import { useState, useEffect } from "react";

function EventForm({ event, onSubmit, onCancel }) {
  const [title, setTitle] = useState(event?.title || "");
  const [location, setLocation] = useState(event?.location || "");
  const [startTime, setStartTime] = useState(event?.start_time || "");
  const [endTime, setEndTime] = useState(event?.end_time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    if (new Date(startTime) < now) {
      alert("Ngày bắt đầu không được là quá khứ!");
      return;
    }
    onSubmit({
      ...event,
      title,
      location,
      start_time: startTime,
      end_time: endTime,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Địa điểm"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <button type="submit">Lưu</button>
      <button type="button" onClick={onCancel}>Hủy</button>
    </form>
  );
}

export default EventForm;

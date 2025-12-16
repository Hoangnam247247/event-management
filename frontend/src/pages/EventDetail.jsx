import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../api";
import RegisterModal from "../components/RegisterModal";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiGet(`/events`).then(events => {
      setEvent(events.find(e => e.id === Number(id)));
    });
  }, [id]);

  if (!event) return <p>Đang tải...</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p><b>Địa điểm:</b> {event.location}</p>
      <p><b>Bắt đầu:</b> {new Date(event.start_time).toLocaleString()}</p>
      <p><b>Kết thúc:</b> {new Date(event.end_time).toLocaleString()}</p>

      {event.detail && (
        <>
          <h3>Mô tả</h3>
          <p>{event.detail.description}</p>
          <h3>Agenda</h3>
          <p>{event.detail.agenda}</p>
          <h3>Diễn giả</h3>
          <p>{event.detail.speaker}</p>
        </>
      )}

      <button onClick={() => setOpen(true)} style={{ marginTop: 20 }}>
        Đăng ký tham gia
      </button>

      {open && <RegisterModal eventId={id} onClose={() => setOpen(false)} />}
    </div>
  );
}

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

  if (!event)
    return (
      <p style={{ padding: 24, color: "#1e40af" }}>
        Đang tải dữ liệu...
      </p>
    );

  return (
    /* ===== FULL BACKGROUND ===== */
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "36px 0",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
      }}
    >
      {/* ===== CONTENT ===== */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px"
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#1e40af",
            marginBottom: 16
          }}
        >
          {event.title}
        </h1>

        {/* INFO */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 20,
            marginBottom: 28,
            boxShadow: "0 8px 20px rgba(30,64,175,0.12)"
          }}
        >
          <p style={{ margin: "6px 0", lineHeight: 1.6 }}>
            <b>📍 Địa điểm:</b> {event.location}
          </p>
          <p style={{ margin: "6px 0", lineHeight: 1.6 }}>
            <b>🕒 Bắt đầu:</b>{" "}
            {new Date(event.start_time).toLocaleString()}
          </p>
          <p style={{ margin: "6px 0", lineHeight: 1.6 }}>
            <b>⏰ Kết thúc:</b>{" "}
            {new Date(event.end_time).toLocaleString()}
          </p>
        </div>

        {/* DETAIL */}
        {event.detail && (
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 8px 20px rgba(30,64,175,0.12)"
            }}
          >
            <Section title="Mô tả">
              {event.detail.description}
            </Section>

            <Section title="Agenda">
              {event.detail.agenda}
            </Section>

            <Section title="Diễn giả">
              {event.detail.speaker}
            </Section>
          </div>
        )}

        {/* REGISTER BUTTON */}
        <button
          onClick={() => setOpen(true)}
          style={{
            marginTop: 28,
            padding: "12px 22px",
            borderRadius: 10,
            border: "none",
            background: "#1e40af",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 8px 18px rgba(30,64,175,0.35)"
          }}
        >
          Đăng ký tham gia
        </button>

        {open && (
          <RegisterModal
            eventId={id}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

/* ===== SECTION COMPONENT ===== */
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3
        style={{
          color: "#1e40af",
          marginBottom: 8,
          fontSize: 18
        }}
      >
        {title}
      </h3>
      <p style={{ lineHeight: 1.7, margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

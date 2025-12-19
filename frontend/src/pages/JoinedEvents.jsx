import { useState } from "react";
import { apiGet } from "../api";

export default function JoinedEvents() {
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!email) return alert("Vui lòng nhập email");
    setLoading(true);
    const res = await apiGet(`/registrations/by-email?email=${email}`);
    setEvents(res);
    setLoading(false);
  }

  return (
    /* FULL BACKGROUND */
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "36px 0"
      }}
    >
      {/* CONTENT */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 24px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1e40af",
            marginBottom: 20
          }}
        >
          Sự kiện đã tham gia
        </h1>

        {/* SEARCH */}
        <div
          style={{
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <input
            placeholder="Nhập email đã đăng ký"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: "11px 16px",
              width: 320,
              borderRadius: 10,
              border: "1px solid #1e40af",
              outline: "none",
              fontSize: 14,
              background: "#fff",
              boxShadow: "0 4px 10px rgba(30,64,175,0.15)"
            }}
          />

          <button
            onClick={search}
            style={{
              padding: "11px 18px",
              borderRadius: 10,
              border: "none",
              background: "#1e40af",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 14px rgba(30,64,175,0.35)",
              transition: "0.2s"
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.background = "#1e3a8a")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.background = "#1e40af")
            }
          >
            Tìm
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p style={{ color: "#1e40af", fontStyle: "italic" }}>
            Đang tải dữ liệu...
          </p>
        )}

        {/* EMPTY */}
        {events.length === 0 && !loading && (
          <p
            style={{
              color: "#1e3a8a",
              background: "#eef2ff",
              padding: 14,
              borderRadius: 10,
              display: "inline-block"
            }}
          >
            Không tìm thấy sự kiện nào
          </p>
        )}

        {/* LIST */}
        <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
          {events.map((e, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(180deg, #ffffff, #f1f5ff)",
                borderRadius: 14,
                padding: 20,
                borderLeft: "6px solid #1e40af",
                boxShadow: "0 10px 25px rgba(30,64,175,0.15)",
                transition: "0.25s"
              }}
              onMouseEnter={el => {
                el.currentTarget.style.transform = "translateY(-4px)";
                el.currentTarget.style.boxShadow =
                  "0 16px 35px rgba(30,64,175,0.25)";
              }}
              onMouseLeave={el => {
                el.currentTarget.style.transform = "translateY(0)";
                el.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(30,64,175,0.15)";
              }}
            >
              <h3 style={{ color: "#1e40af", marginBottom: 10 }}>
                {e.title}
              </h3>

              <p><b>📍 Địa điểm:</b> {e.location}</p>
              <p><b>🕒 Bắt đầu:</b> {new Date(e.start_time).toLocaleString()}</p>
              <p><b>💺 Ghế:</b> {e.seat_number}</p>
              <p>
                <b>📌 Trạng thái:</b>{" "}
                <span
                  style={{
                    color:
                      e.status === "confirmed"
                        ? "#16a34a"
                        : "#dc2626",
                    fontWeight: 600
                  }}
                >
                  {e.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

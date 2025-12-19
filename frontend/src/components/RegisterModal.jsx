import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import SeatMap from "./SeatMap";

export default function RegisterModal({ eventId, onClose }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seat, setSeat] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet(`/events/${eventId}/seats`).then(setBookedSeats);
  }, [eventId]);

  async function submit() {
    if (!window.confirm("Bạn có chắc chắn muốn đăng ký sự kiện này không?")) return;
    setLoading(true);
    const res = await apiPost(`/registrations/${eventId}`, {
      name,
      email,
      seat_number: seat
    });
    setLoading(false);

    if (res.error) alert(res.error);
    else {
      alert("Đăng ký thành công! Kiểm tra email.");
      onClose();
    }
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* HEADER */}
        <h3 style={title}>Đăng ký tham gia</h3>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              placeholder="Họ và tên"
              value={name}
              onChange={e => setName(e.target.value)}
              style={input}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={input}
            />

            <div style={actions}>
              <button
                disabled={!name || !email}
                onClick={() => setStep(2)}
                style={{
                  ...primaryBtn,
                  opacity: !name || !email ? 0.6 : 1
                }}
              >
                Tiếp tục
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <p style={{ marginBottom: 10, fontWeight: 600 }}>
              Chọn ghế
            </p>

            <SeatMap
              bookedSeats={bookedSeats}
              selectedSeat={seat}
              onSelect={setSeat}
            />

            <div style={actions}>
              <button
                onClick={() => setStep(1)}
                style={secondaryBtn}
              >
                Quay lại
              </button>

              <button
                disabled={!seat || loading}
                onClick={submit}
                style={{
                  ...primaryBtn,
                  opacity: !seat || loading ? 0.6 : 1
                }}
              >
                {loading ? "Đang gửi..." : "Đăng ký"}
              </button>
            </div>
          </>
        )}

        {/* CLOSE */}
        <button onClick={onClose} style={closeBtn}>
          Đóng
        </button>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999
};

const modal = {
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  width: 420,
  maxWidth: "90%",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
};

const title = {
  marginBottom: 16,
  fontSize: 20,
  fontWeight: 700,
  color: "#1e40af",
  textAlign: "center"
};

const input = {
  width: "100%",
  padding: "10px 14px",
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #1e40af",
  outline: "none",
  fontSize: 14
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 16
};

const primaryBtn = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  background: "#1e40af",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "1px solid #1e40af",
  background: "#fff",
  color: "#1e40af",
  fontWeight: 600,
  cursor: "pointer"
};

const closeBtn = {
  marginTop: 18,
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  border: "none",
  background: "#e5e7eb",
  cursor: "pointer",
  fontWeight: 500
};

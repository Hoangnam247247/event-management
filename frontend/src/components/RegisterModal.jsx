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
        <h3>Đăng ký tham gia</h3>

        {step === 1 && (
          <>
            <input
              placeholder="Họ tên"
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
            <button disabled={!name || !email} onClick={() => setStep(2)}>
              Tiếp tục
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Chọn ghế:</p>
            <SeatMap
              bookedSeats={bookedSeats}
              selectedSeat={seat}
              onSelect={setSeat}
            />
            <div style={{ marginTop: 20 }}>
              <button onClick={() => setStep(1)}>Quay lại</button>
              <button
                disabled={!seat || loading}
                onClick={submit}
                style={{ marginLeft: 10 }}
              >
                {loading ? "Đang gửi..." : "Đăng ký"}
              </button>
            </div>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: 10 }}>
          Đóng
        </button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modal = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: 420
};

const input = { width: "100%", padding: 8, marginBottom: 10 };

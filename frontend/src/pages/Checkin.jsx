import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { apiPost } from "../api";

export default function CheckIn() {
  const qrRegionId = "qr-reader";
  const scannerRef = useRef(null);

  const [manualCode, setManualCode] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  // =========================
  // Hàm check-in CHUNG
  // =========================
  async function handleCheckin(qrCode) {
    if (!qrCode) return;

    setMessage("Đang check-in...");
    setResult(null);

    try {
      const res = await apiPost(`/tickets/check-in/${qrCode}`, {});
      setResult(res);
      setMessage("✅ Check-in thành công");
    } catch {
      setMessage("❌ QR không hợp lệ hoặc đã check-in");
    }
  }

  // =========================
  // Camera QR
  // =========================
  useEffect(() => {
    const scanner = new Html5Qrcode(qrRegionId);
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        await scanner.stop();
        handleCheckin(decodedText);
      }
    );

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Check-in sự kiện</h2>

      {/* ===== Quét QR ===== */}
      <h4>Quét QR</h4>
      <div id={qrRegionId} style={{ width: 300, marginBottom: 20 }} />

      <hr />

      {/* ===== Nhập tay ===== */}
      <h4>Nhập mã QR thủ công</h4>
      <input
        value={manualCode}
        onChange={e => setManualCode(e.target.value)}
        placeholder="Nhập mã QR"
        style={{ padding: 8, width: 250 }}
      />
      <button
        onClick={() => handleCheckin(manualCode)}
        style={{ marginLeft: 10 }}
      >
        Check-in
      </button>

      {/* ===== Kết quả ===== */}
      {message && <p style={{ marginTop: 15 }}>{message}</p>}

      {result && (
        <div style={{ marginTop: 10 }}>
          <p><b>Tên:</b> {result.name}</p>
          <p><b>Ghế:</b> {result.seat}</p>
        </div>
      )}
    </div>
  );
}

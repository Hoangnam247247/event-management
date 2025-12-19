import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { apiPost } from "../api";

export default function CheckIn() {
  const qrRegionId = "qr-reader";
  const scannerRef = useRef(null);

  const [manualCode, setManualCode] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  async function handleCheckin(qrCode) {
    if (!qrCode) return;

    setMessage("Đang check-in...");
    setResult(null);

    try {
      const res = await apiPost(`/tickets/check-in/${qrCode}`, {});
      setResult(res);
      setMessage("Check-in thành công");
    } catch {
      setMessage("QR không hợp lệ hoặc đã check-in");
    }
  }

  useEffect(() => {
    const scanner = new Html5Qrcode(qrRegionId);
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 240 },
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
    /* ===== CONTENT WRAPPER ===== */
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 24px"
      }}
    >
      {/* ===== CENTER CARD ===== */}
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          padding: 32,
          borderRadius: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
        }}
      >
        <h2
          style={{
            marginBottom: 24,
            color: "#1e40af",
            textAlign: "center"
          }}
        >
          Check-in sự kiện
        </h2>

        {/* CAMERA */}
        <div
          id={qrRegionId}
          style={{
            width: 280,
            margin: "0 auto 24px"
          }}
        />

        {/* MANUAL INPUT */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginBottom: 16
          }}
        >
          <input
            value={manualCode}
            onChange={e => setManualCode(e.target.value)}
            placeholder="Nhập mã QR thủ công"
            style={{
              padding: "10px 14px",
              width: 260,
              borderRadius: 8,
              border: "1px solid #1e40af",
              outline: "none"
            }}
          />

          <button
            onClick={() => handleCheckin(manualCode)}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "none",
              background: "#1e40af",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Check-in
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              textAlign: "center",
              fontWeight: 600,
              color: message.includes("thành công")
                ? "#16a34a"
                : "#dc2626"
            }}
          >
            {message}
          </p>
        )}

        {/* RESULT */}
        {result && (
          <div
            style={{
              marginTop: 16,
              background: "#eef2ff",
              padding: 14,
              borderRadius: 10,
              textAlign: "center"
            }}
          >
            <p><b>Tên:</b> {result.name}</p>
            <p><b>Ghế:</b> {result.seat}</p>
          </div>
        )}
      </div>
    </div>
  );
}

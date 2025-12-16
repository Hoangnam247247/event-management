import { useState } from "react";
import { apiPost } from "../api";

export default function CheckIn() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  async function submit() {
    try {
      const res = await apiPost(`/tickets/check-in/${code}`, {});
      setResult(res);
    } catch (e) {
      setResult({ error: "Invalid QR" });
    }
  }

  return (
    <div>
      <h1>QR Check-in</h1>

      <input
        placeholder="Nhập QR code"
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{ padding: 8, width: 300 }}
      />
      <button onClick={submit} style={{ marginLeft: 10 }}>
        Check-in
      </button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

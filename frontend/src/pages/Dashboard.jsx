export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard (Admin)</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Tổng sự kiện" value="--" />
        <Card title="Tổng vé đã phát hành" value="--" />
        <Card title="Người tham gia" value="--" />
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>Biểu đồ tham gia (sắp làm)</h3>
        <div style={{
          height: 300,
          border: "1px dashed gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          Chart here
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      padding: 20,
      border: "1px solid #ccc",
      borderRadius: 8,
      width: 200
    }}>
      <h4>{title}</h4>
      <p style={{ fontSize: 24 }}>{value}</p>
    </div>
  );
}

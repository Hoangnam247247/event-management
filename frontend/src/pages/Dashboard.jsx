import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { Pie, Bar } from "react-chartjs-2";
import EventManageModal from "../components/EventManageModal";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiGet("/events/admin/stats").then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  const pieData = {
    labels: ["Checked-in", "Not checked-in"],
    datasets: [{
      data: [
        stats.checked_in,
        stats.total_tickets - stats.checked_in
      ],
      backgroundColor: ["#22c55e", "#f97316"]
    }]
  };

  const barData = {
    labels: ["This week", "This month"],
    datasets: [{
      label: "Events",
      data: [stats.events_this_week, stats.events_this_month],
      backgroundColor: "#3b82f6"
    }]
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <StatBox label="Sự kiện" value={stats.total_events} />
        <StatBox label="Tổng vé" value={stats.total_tickets} />
        <StatBox label="Tuần này" value={stats.events_this_week} />
        <StatBox label="Tháng này" value={stats.events_this_month} />
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
        <div style={{ width: 300 }}>
          <Pie data={pieData} />
        </div>
        <div style={{ width: 300 }}>
          <Bar data={barData} />
        </div>
      </div>

      <button onClick={() => setOpen(true)} style={{ marginTop: 30 }}>
        Xem sự kiện
      </button>

      {open && <EventManageModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{
      padding: 20,
      border: "1px solid #ddd",
      borderRadius: 8,
      minWidth: 120
    }}>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

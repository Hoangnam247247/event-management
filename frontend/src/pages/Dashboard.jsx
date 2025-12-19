import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { Pie, Bar } from "react-chartjs-2";
import EventManageModal from "../components/EventManageModal";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiGet("/events/admin/stats").then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  const pieData = {
    labels: ["Checked-in", "Not checked-in"],
    datasets: [
      {
        data: [
          stats.checked_in,
          stats.total_tickets - stats.checked_in
        ],
        backgroundColor: ["#22c55e", "#e5e7eb"]
      }
    ]
  };

  const barData = {
    labels: ["This week", "This month"],
    datasets: [
      {
        label: "Events",
        data: [stats.events_this_week, stats.events_this_month],
        backgroundColor: "#2563eb"
      }
    ]
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">

        {/* ===== HEADER TRÊN CÙNG ===== */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>

          <button
            className="manage-btn"
            onClick={() => setOpen(true)}
          >
            Quản lý sự kiện
          </button>
        </div>

        {/* ===== STAT ===== */}
        <div className="stats-row">
          <StatBox label="Sự kiện" value={stats.total_events} />
          <StatBox label="Tổng vé" value={stats.total_tickets} />
          <StatBox label="Tuần này" value={stats.events_this_week} />
          <StatBox label="Tháng này" value={stats.events_this_month} />
        </div>

        {/* ===== CHART ===== */}
        <div className="chart-row">
          <div className="chart-card">
            <h4>Trạng thái vé</h4>
            <Pie data={pieData} />
          </div>

          <div className="chart-card">
            <h4>Số lượng sự kiện</h4>
            <Bar data={barData} />
          </div>
        </div>

        {open && <EventManageModal onClose={() => setOpen(false)} />}

      </div>
    </div>
  );
}

/* ===== STAT BOX ===== */
function StatBox({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" />
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

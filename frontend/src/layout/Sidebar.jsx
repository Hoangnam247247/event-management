import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: 220,
      background: "#1f2937",
      color: "white",
      padding: 20
    }}>
      <h2>Event Admin</h2>

      <nav style={{ marginTop: 30 }}>
        <p><Link to="/" style={link}>Dashboard</Link></p>
        <p><Link to="/events" style={link}>Events</Link></p>
        <p><Link to="/joined" style={link}>Sự kiện đã tham gia</Link></p>
      </nav>
    </div>
  );
}

const link = {
  color: "white",
  textDecoration: "none"
};

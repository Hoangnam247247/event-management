import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const active = (path) => location.pathname === path;

  return (
    <div
      style={{
        width: 240,
        minHeight: "100vh",
        background: "#1e40af", // xanh doanh nghiệp
        color: "#fff",
        padding: "24px 18px",
        boxSizing: "border-box"
      }}
    >
      {/* LOGO / TITLE */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 36
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 0.5,
            margin: 0
          }}
        >
          Event Management
        </h2>
        <p
          style={{
            fontSize: 12,
            opacity: 0.8,
            marginTop: 4
          }}
        >
          Admin Dashboard
        </p>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <NavItem to="/admin/dashboard" active={active("/admin/dashboard")}>
          Dashboard
        </NavItem>

        <NavItem to="/events" active={active("/events")}>
          Events
        </NavItem>

        <NavItem to="/joined" active={active("/joined")}>
          Sự kiện đã tham gia
        </NavItem>

        <NavItem to="/admin/checkin" active={active("/admin/checkin")}>
          Check-in
        </NavItem>
      </nav>
    </div>
  );
}

/* ===== NAV ITEM ===== */
function NavItem({ to, active, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#fff",
        padding: "10px 16px",
        borderRadius: 8,
        fontSize: 15,
        fontWeight: active ? 600 : 500,
        background: active
          ? "rgba(255,255,255,0.2)"
          : "transparent",
        transition: "background 0.15s ease"
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background =
            "rgba(255,255,255,0.12)";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {children}
    </Link>
  );
}

import { Routes, Route } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import JoinedEvents from "./pages/JoinedEvents";
import EventDetail from "./pages/EventDetail";
import Checkin from "./pages/Checkin";




function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 20 }}>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/joined" element={<JoinedEvents />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/admin/checkin" element={<Checkin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import EventList from "../components/EventList";
import EventDetail from "../components/EventDetail";

const Home = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Danh sách sự kiện</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EventList onView={setSelectedEvent} isAdmin={false}/>
                <EventDetail event={selectedEvent}/>
            </div>
        </div>
    );
};

export default Home;

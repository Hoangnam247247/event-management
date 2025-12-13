import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { fetchEvents, deleteEvent } from "../../scr_old/api";

const EventList = ({ isAdmin, onView, onEdit }) => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    const loadEvents = async () => {
        const res = await fetchEvents(search);
        setEvents(res.data);
    };

    useEffect(() => {
        loadEvents();
    }, [search]);

    const handleDelete = async (id) => {
        if (confirm("Bạn có chắc muốn xóa sự kiện này?")) {
            await deleteEvent(id);
            loadEvents();
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 mb-4 w-full rounded"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map(event => (
                    <EventCard 
                        key={event.id} 
                        event={event} 
                        onView={onView} 
                        onEdit={onEdit} 
                        onDelete={handleDelete} 
                        isAdmin={isAdmin} 
                    />
                ))}
            </div>
        </div>
    );
};

export default EventList;

import React, { useState } from "react";
import EventList from "../../src/components/EventList";
import EventForm from "../../src/components/EventForm";
import { createEvent, updateEvent } from "../api";

const AdminPage = () => {
    const [editingEvent, setEditingEvent] = useState(null);

    const handleSubmit = async (data) => {
        if (editingEvent) {
            await updateEvent(editingEvent.id, data);
        } else {
            await createEvent(data);
        }
        setEditingEvent(null);
        window.location.reload(); // reload để cập nhật danh sách
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Quản lý sự kiện (Admin)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EventList isAdmin={true} onView={() => {}} onEdit={setEditingEvent}/>
                <EventForm event={editingEvent} onSubmit={handleSubmit}/>
            </div>
        </div>
    );
};

export default AdminPage;

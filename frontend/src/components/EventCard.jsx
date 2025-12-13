/*import React from "react";

const EventCard = ({ event, onView, onEdit, onDelete, isAdmin }) => {
    return (
        <div className="border rounded-lg shadow p-4 flex flex-col">
            <img src={event.image_url} alt={event.title} className="h-48 w-full object-cover rounded" />
            <h3 className="text-xl font-bold mt-2">{event.title}</h3>
            <p className="text-gray-600">{event.description?.substring(0, 100)}...</p>
            <p className="text-sm mt-1">{new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}</p>
            <p className="text-sm">{event.location}</p>
            <div className="mt-2 flex gap-2">
                <button onClick={() => onView(event)} className="bg-blue-500 text-white px-2 py-1 rounded">Xem</button>
                {isAdmin && (
                    <>
                        <button onClick={() => onEdit(event)} className="bg-yellow-500 text-white px-2 py-1 rounded">Sửa</button>
                        <button onClick={() => onDelete(event.id)} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventCard;*/

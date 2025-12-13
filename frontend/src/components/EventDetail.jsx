/*import React from "react";

const EventDetail = ({ event }) => {
    if (!event) return <div>Chọn một sự kiện để xem chi tiết</div>;

    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`;

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <img src={event.image_url} alt={event.title} className="h-64 w-full object-cover mt-2 rounded"/>
            <p className="mt-2">{event.description}</p>
            <p className="mt-1"><b>Thời gian:</b> {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}</p>
            <p className="mt-1"><b>Địa điểm:</b> {event.location}</p>
            <p className="mt-1"><b>Sức chứa:</b> {event.capacity}</p>
            <iframe
                title="Google Maps"
                src={mapUrl}
                className="w-full h-64 mt-2 rounded"
            ></iframe>
        </div>
    );
};

export default EventDetail;*/

function EventItem({ event, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa "${event.title}"?`)) {
      onDelete(event.id);
    }
  };

  return (
    <li>
      {event.title} - {event.location} 
      <button onClick={() => onEdit(event)}>Sửa</button>
      <button onClick={handleDelete}>Xóa</button>
    </li>
  );
}

export default EventItem;

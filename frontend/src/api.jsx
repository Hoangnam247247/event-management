import axios from "axios";

const API_URL = "http://localhost:8000/events";

export const fetchEvents = () => axios.get(API_URL);
export const fetchEvent = (id) => axios.get(`${API_URL}/${id}`);
export const createEvent = (data) => axios.post(API_URL, data);
export const updateEvent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${API_URL}/${id}`);

const API_BASE = "https://event-backend.onrender.com";

export async function apiGet(url) {
  const res = await fetch(API_BASE + url);
  return res.json();
}

export async function apiPost(url, data) {
  const res = await fetch(API_BASE + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiPut(url, data) {
  const res = await fetch(API_BASE + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiDelete(url) {
  const res = await fetch(API_BASE + url, {
    method: "DELETE"
  });
  return res.json();
}

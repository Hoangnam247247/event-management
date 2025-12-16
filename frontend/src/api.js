const API_BASE = "http://127.0.0.1:8000";

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

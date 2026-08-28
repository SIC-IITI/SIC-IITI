
const API_BASE = import.meta.env.VITE_API_URL || "";
const SECRET_KEY = "sic_admin_secret";

export function resolveImageUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE}${path}`;
  return path;
}

export function getSecret() {
  return localStorage.getItem(SECRET_KEY);
}
export function setSecret(secret) {
  localStorage.setItem(SECRET_KEY, secret);
}
export function clearSecret() {
  localStorage.removeItem(SECRET_KEY);
}
export function isLoggedIn() {
  return Boolean(getSecret());
}

async function request(path, { method = "GET", body, isFormData = false, auth = false } = {}) {
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (auth) {
    const secret = getSecret();
    if (secret) headers["x-admin-secret"] = secret;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  let json = null;
  const text = await res.text();
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON response (e.g. an Nginx/Express error page) — surface status instead.
  }

  if (!res.ok) {
    if (res.status === 401 && auth) clearSecret();
    throw new Error(json?.error || json?.message || `Request failed (${res.status})`);
  }

  return json;
}

// ---- Auth ----

export async function verifySecret(secret) {
  const headers = { "Content-Type": "application/json", "x-admin-secret": secret };
  const res = await fetch(`${API_BASE}/api/admin/verify`, { method: "POST", headers });
  if (!res.ok) {
    throw new Error(res.status === 401 ? "Incorrect admin secret" : "Could not reach the admin server. Is it running?");
  }
  setSecret(secret);
}

// ---- Instruments ----

export function getInstruments() {
  return request("/api/instruments");
}
export function getInstrument(id) {
  return request(`/api/instruments/${encodeURIComponent(id)}`);
}
export function getCategories() {
  return request("/api/instruments/categories");
}
export function createInstrument(fields) {
  return request("/api/instruments", { method: "POST", auth: true, body: fields });
}
export function updateInstrument(id, fields) {
  return request(`/api/instruments/${encodeURIComponent(id)}`, { method: "PUT", auth: true, body: fields });
}
export function deleteInstrument(id) {
  return request(`/api/instruments/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
}
export function uploadInstrumentImages(id, files) {
  const fd = new FormData();
  files.forEach((f) => fd.append("images", f));
  return request(`/api/instruments/${encodeURIComponent(id)}/images`, {
    method: "POST",
    isFormData: true,
    auth: true,
    body: fd,
  });
}
export function deleteInstrumentImage(id, url) {
  return request(`/api/instruments/${encodeURIComponent(id)}/images`, {
    method: "DELETE",
    auth: true,
    body: { url },
  });
}
export function updateCategoryDescription(category, description) {
  return request(`/api/instruments/categories/${encodeURIComponent(category)}`, {
    method: "PUT",
    auth: true,
    body: { description },
  });
}

// ---- Events ----

export function getEvents() {
  return request("/api/events");
}
export function createEvent(fields, imageFile) {
  return request("/api/events", { method: "POST", isFormData: true, auth: true, body: buildEventFormData(fields, imageFile) });
}
export function updateEvent(id, fields, imageFile) {
  return request(`/api/events/${id}`, { method: "PUT", isFormData: true, auth: true, body: buildEventFormData(fields, imageFile) });
}
export function deleteEvent(id) {
  return request(`/api/events/${id}`, { method: "DELETE", auth: true });
}

function buildEventFormData(fields, imageFile) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields || {})) {
    if (value !== undefined) fd.append(key, value);
  }
  if (imageFile) fd.append("imageFile", imageFile);
  return fd;
}

import { API_BASE } from "./config";
import { getAdminSecret } from "./adminAuth";

async function adminRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "x-admin-secret": getAdminSecret(),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

function adminJson(path, method, body) {
  return adminRequest(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export const verifyAdminSecret = (secret) =>
  fetch(`${API_BASE}/api/admin/verify`, {
    method: "POST",
    headers: { "x-admin-secret": secret },
  }).then((res) => res.ok);

// Instruments
export const createInstrument = (data) => adminJson("/api/instruments", "POST", data);
export const updateInstrument = (id, data) =>
  adminJson(`/api/instruments/${id}`, "PUT", data);
export const deleteInstrument = (id) => adminRequest(`/api/instruments/${id}`, { method: "DELETE" });
export const setCategoryDescription = (category, description) =>
  adminJson(`/api/instruments/categories/${encodeURIComponent(category)}`, "PUT", {
    description,
  });

export const uploadInstrumentImages = (id, files) => {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append("images", f));
  return adminRequest(`/api/instruments/${id}/images`, { method: "POST", body: form });
};

export const deleteInstrumentImage = (id, url) =>
  adminJson(`/api/instruments/${id}/images`, "DELETE", { url });

// Events
export const createEvent = (data, imageFile) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => form.append(k, v ?? ""));
  if (imageFile) form.append("imageFile", imageFile);
  return adminRequest("/api/events", { method: "POST", body: form });
};

export const updateEvent = (id, data, imageFile) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => form.append(k, v ?? ""));
  if (imageFile) form.append("imageFile", imageFile);
  return adminRequest(`/api/events/${id}`, { method: "PUT", body: form });
};

export const deleteEvent = (id) => adminRequest(`/api/events/${id}`, { method: "DELETE" });

// Outreach
export const createOutreach = (data, imageFile) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => form.append(k, v ?? ""));
  if (imageFile) form.append("imageFile", imageFile);
  return adminRequest("/api/outreach", { method: "POST", body: form });
};

export const updateOutreach = (id, data, imageFile) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => form.append(k, v ?? ""));
  if (imageFile) form.append("imageFile", imageFile);
  return adminRequest(`/api/outreach/${id}`, { method: "PUT", body: form });
};

export const deleteOutreach = (id) => adminRequest(`/api/outreach/${id}`, { method: "DELETE" });

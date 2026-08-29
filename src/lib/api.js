import { API_BASE } from "./config";

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const fetchInstruments = () => getJson("/api/instruments");
export const fetchInstrumentCategories = () => getJson("/api/instruments/categories");
export const fetchInstrumentById = (id) => getJson(`/api/instruments/${id}`);
export const fetchEvents = () => getJson("/api/events");
export const fetchEventById = (id) => getJson(`/api/events/${id}`);
export const fetchOutreach = () => getJson("/api/outreach");
export const fetchOutreachById = (id) => getJson(`/api/outreach/${id}`);

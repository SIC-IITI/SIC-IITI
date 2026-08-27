import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../lib/api";
import { deleteEvent } from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";

function resolveImageUrl(path) {
  if (!path) return "";
  return path.startsWith("/uploads/") ? `${API_BASE}${path}` : path;
}

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    fetchEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (event) => {
    if (!window.confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    try {
      await deleteEvent(event.id);
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Events</h1>
        <Link
          to="/admin/events/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm"
        >
          + Add Event
        </Link>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
            >
              {event.image && (
                <img
                  src={resolveImageUrl(event.image)}
                  alt=""
                  className="w-full h-36 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-semibold text-blue-600 mb-1">{event.date}</span>
                <p className="text-sm text-gray-800 font-medium flex-1 line-clamp-3">
                  {event.title}
                </p>
                <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
                  <Link
                    to={`/admin/events/${event.id}/edit`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event)}
                    className="text-red-600 hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-400 col-span-full text-center py-8">No events yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

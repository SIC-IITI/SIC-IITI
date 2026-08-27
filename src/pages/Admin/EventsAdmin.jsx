import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import { fetchEvents } from "../../lib/api";
import { deleteEvent } from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import PageHeader from "./components/PageHeader";
import { SkeletonCardGrid } from "./components/Skeleton";
import EmptyState from "./components/EmptyState";

function resolveImageUrl(path) {
  if (!path) return "";
  return path.startsWith("/uploads/") ? `${API_BASE}${path}` : path;
}

export default function EventsAdmin() {
  const navigate = useNavigate();
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
      <PageHeader title="Events" actionLabel="Add Event" onAction={() => navigate("/admin/events/new")} />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No events yet"
          description="Events and workshops you add will show up here."
          actionLabel="Add your first event"
          onAction={() => navigate("/admin/events/new")}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              {event.image ? (
                <img src={resolveImageUrl(event.image)} alt="" className="w-full h-36 object-cover" />
              ) : (
                <div className="w-full h-36 bg-gray-50 flex items-center justify-center">
                  <CalendarDays size={28} className="text-gray-300" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 mb-1.5">
                  <CalendarDays size={13} />
                  {event.date}
                </span>
                <p className="text-sm text-gray-800 font-medium flex-1 line-clamp-3">{event.title}</p>
                {event.venue && (
                  <span className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                    <MapPin size={12} />
                    {event.venue}
                  </span>
                )}
                <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/admin/events/${event.id}/edit`)}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold min-h-[36px]"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-semibold min-h-[36px]"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
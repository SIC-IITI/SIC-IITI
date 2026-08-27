import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { fetchEvents } from "../../lib/api";
import { deleteEvent } from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import PageHeader from "./components/PageHeader";
import EmptyState from "./components/EmptyState";
import { SkeletonTableRows, SkeletonCards } from "./components/Skeleton";
import { iconButtonClass } from "./components/ui";

function resolveImageUrl(path) {
  if (!path) return "";
  return path.startsWith("/uploads/") ? `${API_BASE}${path}` : path;
}

function Thumb({ event, size = "h-11 w-11" }) {
  if (event.image) {
    return (
      <img
        src={resolveImageUrl(event.image)}
        alt=""
        className={`${size} shrink-0 rounded-xl object-cover`}
      />
    );
  }
  return (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600`}>
      <CalendarDays className="h-5 w-5" />
    </div>
  );
}

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const showEmpty = !loading && events.length === 0;

  return (
    <div>
      <PageHeader
        title="Events"
        subtitle={loading ? undefined : `${events.length} total`}
        actionLabel="Add Event"
        onAction={() => navigate("/admin/events/new")}
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showEmpty ? (
        <EmptyState
          icon={CalendarDays}
          title="No events yet"
          message="Add your first event to get started."
          actionLabel="Add Event"
          onAction={() => navigate("/admin/events/new")}
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Event</th>
                  <th className="px-5 py-3 text-left font-semibold">Date</th>
                  <th className="px-5 py-3 text-left font-semibold">Venue</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <SkeletonTableRows rows={5} cols={4} />
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Thumb event={event} />
                          <p className="line-clamp-2 max-w-md font-semibold text-gray-900">
                            {event.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-gray-600">{event.date}</td>
                      <td className="px-5 py-3 text-gray-600">{event.venue || "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1">
                          <Link
                            to={`/admin/events/${event.id}/edit`}
                            className={iconButtonClass}
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(event)}
                            className={`${iconButtonClass} hover:bg-red-50 hover:text-red-600`}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden">
            {loading ? (
              <SkeletonCards count={4} />
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Thumb event={event} size="h-12 w-12" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-semibold text-gray-900">{event.title}</p>
                        <p className="mt-0.5 text-xs font-medium text-blue-600">{event.date}</p>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="truncate text-xs text-gray-400">
                            {event.venue || "No venue set"}
                          </span>
                          <div className="flex gap-1">
                            <Link
                              to={`/admin/events/${event.id}/edit`}
                              className={iconButtonClass}
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(event)}
                              className={`${iconButtonClass} hover:bg-red-50 hover:text-red-600`}
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

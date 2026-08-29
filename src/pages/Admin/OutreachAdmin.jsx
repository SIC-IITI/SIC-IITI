import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Pencil, Trash2 } from "lucide-react";
import { fetchOutreach } from "../../lib/api";
import { deleteOutreach } from "../../lib/adminApi";
import PageHeader from "./components/PageHeader";
import EmptyState from "./components/EmptyState";
import { SkeletonTableRows, SkeletonCards } from "./components/Skeleton";
import { resolveImageUrl } from "./components/resolveImageUrl";
import { iconButtonClass } from "./components/ui";

function Thumb({ item, size = "h-11 w-11" }) {
  const [failed, setFailed] = useState(false);

  if (item.image && !failed) {
    return (
      <img
        src={resolveImageUrl(item.image)}
        alt=""
        onError={() => setFailed(true)}
        className={`${size} shrink-0 rounded-xl object-cover bg-gray-100`}
      />
    );
  }
  return (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600`}>
      <Users className="h-5 w-5" />
    </div>
  );
}

export default function OutreachAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    fetchOutreach()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This can't be undone.`)) return;
    try {
      await deleteOutreach(item.id);
      setItems((prev) => prev.filter((e) => e.id !== item.id));
    } catch (err) {
      alert(err.message);
    }
  };

  const showEmpty = !loading && items.length === 0;

  return (
    <div>
      <PageHeader
        title="Outreach"
        subtitle={loading ? undefined : `${items.length} total`}
        actionLabel="Add Outreach Entry"
        onAction={() => navigate("/admin/outreach/new")}
      />

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showEmpty ? (
        <EmptyState
          icon={Users}
          title="No outreach entries yet"
          message="Add your first outreach entry to get started. These also appear in the Home page slider."
          actionLabel="Add Outreach Entry"
          onAction={() => navigate("/admin/outreach/new")}
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Entry</th>
                  <th className="px-5 py-3 text-left font-semibold">Date</th>
                  <th className="px-5 py-3 text-left font-semibold">Description</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <SkeletonTableRows rows={5} cols={4} />
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Thumb item={item} />
                          <p className="line-clamp-2 max-w-md font-semibold text-gray-900">
                            {item.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-gray-600">{item.date}</td>
                      <td className="px-5 py-3 max-w-xs truncate text-gray-600">{item.description || "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1">
                          <Link
                            to={`/admin/outreach/${item.id}/edit`}
                            className={iconButtonClass}
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item)}
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
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Thumb item={item} size="h-12 w-12" />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-semibold text-gray-900">{item.title}</p>
                        <p className="mt-0.5 text-xs font-medium text-blue-600">{item.date}</p>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="truncate text-xs text-gray-400">
                            {item.description || "No description"}
                          </span>
                          <div className="flex gap-1">
                            <Link
                              to={`/admin/outreach/${item.id}/edit`}
                              className={iconButtonClass}
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(item)}
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

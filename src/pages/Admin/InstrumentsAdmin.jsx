import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Microscope, Pencil, Trash2, ImageIcon } from "lucide-react";
import { fetchInstruments } from "../../lib/api";
import { deleteInstrument } from "../../lib/adminApi";
import PageHeader from "./components/PageHeader";
import EmptyState from "./components/EmptyState";
import StatusBadge from "./components/StatusBadge";
import { SkeletonTableRows, SkeletonCards } from "./components/Skeleton";
import { inputClass, iconButtonClass } from "./components/ui";

export default function InstrumentsAdmin() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    fetchInstruments()
      .then(setInstruments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (instrument) => {
    if (!window.confirm(`Delete "${instrument.name}"? This can't be undone.`)) return;
    try {
      await deleteInstrument(instrument.id);
      setInstruments((prev) => prev.filter((i) => i.id !== instrument.id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = instruments.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const showEmpty = !loading && filtered.length === 0;

  return (
    <div>
      <PageHeader
        title="Instruments"
        subtitle={loading ? undefined : `${instruments.length} total`}
        actionLabel="Add Instrument"
        onAction={() => navigate("/admin/instruments/new")}
      />

      <div className="relative mb-5 max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} pl-10`}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {showEmpty ? (
        <EmptyState
          icon={search ? Search : Microscope}
          title={search ? "No matches" : "No instruments yet"}
          message={
            search
              ? `Nothing matches "${search}". Try a different search.`
              : "Add your first instrument to get started."
          }
          actionLabel={search ? undefined : "Add Instrument"}
          onAction={() => navigate("/admin/instruments/new")}
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Name</th>
                  <th className="px-5 py-3 text-left font-semibold">Category</th>
                  <th className="px-5 py-3 text-left font-semibold">Status</th>
                  <th className="px-5 py-3 text-left font-semibold">Images</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <SkeletonTableRows rows={6} cols={5} />
                ) : (
                  filtered.map((instrument) => (
                    <tr key={instrument.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-900">{instrument.name}</div>
                        <div className="text-xs text-gray-400">{instrument.id}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{instrument.category}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={instrument.status} />
                      </td>
                      <td className="px-5 py-4 text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <ImageIcon className="h-3.5 w-3.5" />
                          {instrument.images.length}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <Link
                            to={`/admin/instruments/${instrument.id}/edit`}
                            className={iconButtonClass}
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(instrument)}
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
              <SkeletonCards count={5} />
            ) : (
              <div className="space-y-3">
                {filtered.map((instrument) => (
                  <div
                    key={instrument.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Microscope className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">
                              {instrument.name}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {instrument.category}
                            </p>
                          </div>
                          <StatusBadge status={instrument.status} />
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                            <ImageIcon className="h-3.5 w-3.5" />
                            {instrument.images.length} image
                            {instrument.images.length === 1 ? "" : "s"}
                          </span>
                          <div className="flex gap-1">
                            <Link
                              to={`/admin/instruments/${instrument.id}/edit`}
                              className={iconButtonClass}
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(instrument)}
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

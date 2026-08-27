import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Wrench, Pencil, Trash2, ImageIcon } from "lucide-react";
import { fetchInstruments } from "../../lib/api";
import { deleteInstrument } from "../../lib/adminApi";
import PageHeader from "./components/PageHeader";
import { SkeletonCardGrid, SkeletonRow } from "./components/Skeleton";
import EmptyState from "./components/EmptyState";
import StatusBadge from "./components/StatusBadge";

export default function InstrumentsAdmin() {
  const navigate = useNavigate();
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

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

  return (
    <div>
      <PageHeader title="Instruments" actionLabel="Add Instrument" onAction={() => navigate("/admin/instruments/new")} />

      <div className="relative max-w-sm mb-5">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full min-h-[44px] border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <>
          <div className="md:hidden">
            <SkeletonCardGrid count={4} />
          </div>
          <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} columns={5} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title={instruments.length === 0 ? "No instruments yet" : "No matches"}
          description={
            instruments.length === 0
              ? "Instruments you add will show up here."
              : "Try a different name or category."
          }
          actionLabel={instruments.length === 0 ? "Add your first instrument" : undefined}
          onAction={() => navigate("/admin/instruments/new")}
        />
      ) : (
        <>
          {/* Cards — mobile / tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {filtered.map((instrument) => (
              <div key={instrument.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{instrument.name}</p>
                    <p className="text-xs text-gray-400 truncate">{instrument.category}</p>
                  </div>
                  <StatusBadge status={instrument.status} />
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                  <ImageIcon size={13} />
                  {instrument.images.length} image{instrument.images.length === 1 ? "" : "s"}
                </div>
                <div className="flex gap-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/admin/instruments/${instrument.id}/edit`)}
                    className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold min-h-[36px]"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(instrument)}
                    className="flex items-center gap-1.5 text-red-600 text-sm font-semibold min-h-[36px]"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Images</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((instrument) => (
                  <tr key={instrument.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-gray-800">{instrument.name}</div>
                      <div className="text-gray-400 text-xs">{instrument.id}</div>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{instrument.category}</td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={instrument.status} />
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{instrument.images.length}</td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/admin/instruments/${instrument.id}/edit`)}
                        className="text-blue-600 hover:underline font-medium mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(instrument)}
                        className="text-red-600 hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
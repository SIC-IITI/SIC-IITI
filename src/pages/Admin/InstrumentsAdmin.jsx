import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchInstruments } from "../../lib/api";
import { deleteInstrument } from "../../lib/adminApi";

export default function InstrumentsAdmin() {
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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Instruments</h1>
        <Link
          to="/admin/instruments/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md text-sm"
        >
          + Add Instrument
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name or category…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Images</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((instrument) => (
                <tr key={instrument.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-800">{instrument.name}</div>
                    <div className="text-gray-400 text-xs">{instrument.id}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{instrument.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        instrument.status === "Operational"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {instrument.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{instrument.images.length}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/instruments/${instrument.id}/edit`}
                      className="text-blue-600 hover:underline font-medium mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(instrument)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                    No instruments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

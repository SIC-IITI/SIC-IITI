import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Approve or Reject booking
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem("token");
      const normalizedStatus = status.toLowerCase();

      const res = await axios.put(
        `${API_URL}/api/admin/bookings/${id}`,
        { status: normalizedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: normalizedStatus } : b
        )
      );
      setMessage(`✅ Booking ${normalizedStatus} successfully`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Loading state
  if (loading)
    return <p className="text-center text-gray-600 mt-12">Loading bookings...</p>;

  return (
    <section className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Admin Booking Dashboard
      </h1>

      {message && (
        <p
          className={`mb-4 text-sm font-semibold ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No booking requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="p-3 border">User</th>
                <th className="p-3 border">Instrument</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Duration</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border text-center hover:bg-blue-50 transition"
                >
                  <td className="p-3 border">
                    <span className="font-semibold">{b.user?.name}</span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {b.user?.email}
                    </span>
                  </td>
                  <td className="p-3 border">{b.instrumentName}</td>
                  <td className="p-3 border">
                    {new Date(b.preferredDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">{b.durationHours}h</td>

                  {/* Status display */}
                  <td
                    className={`p-3 border font-semibold capitalize ${
                      b.status === "approved"
                        ? "text-green-600"
                        : b.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {b.status}
                  </td>

                  {/* Action buttons */}
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => updateStatus(b._id, "approved")}
                      disabled={updatingId === b._id || b.status === "approved"}
                      className={`px-3 py-1 rounded text-white font-medium transition ${
                        b.status === "approved"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {updatingId === b._id && b.status !== "approved"
                        ? "Updating..."
                        : "Approve"}
                    </button>

                    <button
                      onClick={() => updateStatus(b._id, "rejected")}
                      disabled={updatingId === b._id || b.status === "rejected"}
                      className={`px-3 py-1 rounded text-white font-medium transition ${
                        b.status === "rejected"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {updatingId === b._id && b.status !== "rejected"
                        ? "Updating..."
                        : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;

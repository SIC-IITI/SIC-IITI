import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

function Booking() {
  const [formData, setFormData] = useState({
    instrumentName: "",
    experimentTitle: "",
    description: "",
    preferredDate: "",
    durationHours: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Uncomment if using React Router
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setMessage("❌ Please login to access booking system");
      // Uncomment to redirect to login
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
    fetchUserBookings();
  }, []);

  // Create axios instance with default config
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor to include token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor to handle auth errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setMessage("❌ Session expired. Please login again.");
        // Uncomment to redirect to login
        // navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const fetchUserBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await api.get("/bookings");

      // Handle both response formats
      const bookings = res.data.bookings || res.data;
      setUserBookings(Array.isArray(bookings) ? bookings : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        setMessage(`⚠️ ${error.response?.data?.message || "Error loading bookings"}`);
      }
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setMessage("❌ Please login to make a booking");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/bookings", formData);

      setMessage("✅ Booking request submitted successfully!");
      setFormData({
        instrumentName: "",
        experimentTitle: "",
        description: "",
        preferredDate: "",
        durationHours: "",
      });

      // Refresh bookings list
      fetchUserBookings();
    } catch (error) {
      console.error("Booking error:", error);
      const errorMsg = error.response?.data?.message ||
                       error.response?.data?.errors?.join(", ") ||
                       "Error submitting booking";
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show login message if not authenticated
  if (!isAuthenticated) {
    return (
      <section className="space-y-8 px-4 py-12 max-w-3xl mx-auto">
        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-900 mb-4">
            Authentication Required
          </h1>
          <p className="text-red-700 mb-6">
            Please login to access the booking system.
          </p>
          <button
            onClick={() => window.location.href = "/login"} // Adjust path as needed
            className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 px-4 py-12 max-w-6xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Book Instrumentation Time
        </h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          Fill out this form to request access to an instrument. Provide all
          relevant details so our staff can verify and schedule your session.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            New Booking Request
          </h2>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border-2 border-blue-200 bg-blue-50 p-8 space-y-6"
          >
            <div>
              <label
                htmlFor="instrumentName"
                className="block text-sm font-semibold text-blue-900 mb-2"
              >
                Instrument Name *
              </label>
              <input
                id="instrumentName"
                name="instrumentName"
                type="text"
                value={formData.instrumentName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., NMR Spectrometer"
              />
            </div>

            <div>
              <label
                htmlFor="experimentTitle"
                className="block text-sm font-semibold text-blue-900 mb-2"
              >
                Experiment Title *
              </label>
              <input
                id="experimentTitle"
                name="experimentTitle"
                type="text"
                value={formData.experimentTitle}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., Structural Analysis of Compounds"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-blue-900 mb-2"
              >
                Experiment Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Describe your experiment, samples, and expected outcomes"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-sm font-semibold text-blue-900 mb-2"
                >
                  Preferred Date *
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label
                  htmlFor="durationHours"
                  className="block text-sm font-semibold text-blue-900 mb-2"
                >
                  Duration (hours) *
                </label>
                <input
                  id="durationHours"
                  name="durationHours"
                  type="number"
                  min="1"
                  max="24"
                  value={formData.durationHours}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., 2"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.startsWith("✅")
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Booking Request"}
            </button>
          </form>
        </div>

        {/* My Bookings List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-900">
              My Booking Requests
            </h2>
            <button
              onClick={fetchUserBookings}
              disabled={loadingBookings}
              className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              {loadingBookings ? "Refreshing..." : "🔄 Refresh"}
            </button>
          </div>
          <div className="space-y-4">
            {loadingBookings ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-2">Loading bookings...</p>
              </div>
            ) : userBookings.length === 0 ? (
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-gray-600">
                  No booking requests yet. Submit your first booking above!
                </p>
              </div>
            ) : (
              userBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-lg border-2 border-blue-200 bg-white p-6 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-blue-900">
                      {booking.instrumentName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {booking.experimentTitle}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {booking.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                    <span>📅 {formatDate(booking.preferredDate)}</span>
                    <span>⏱️ {booking.durationHours} hours</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Requested: {formatDate(booking.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;
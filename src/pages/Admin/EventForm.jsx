import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById } from "../../lib/api";
import { createEvent, updateEvent } from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import "./admin.css";

function resolveImageUrl(path) {
  if (!path) return "";
  return path.startsWith("/uploads/") ? `${API_BASE}${path}` : path;
}

const emptyForm = { date: "", title: "", fullDescription: "", venue: "" };

export default function EventForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [existingImage, setExistingImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    fetchEventById(id)
      .then((data) => {
        setForm({
          date: data.date,
          title: data.title,
          fullDescription: data.fullDescription,
          venue: data.venue,
        });
        setExistingImage(data.image);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await updateEvent(id, form, imageFile);
      } else {
        await createEvent(form, imageFile);
      }
      navigate("/admin/events");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "Edit Event" : "Add Event"}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            placeholder="e.g. 18-19 June 2026"
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            rows={2}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Description
          </label>
          <textarea
            value={form.fullDescription}
            onChange={(e) => update("fullDescription", e.target.value)}
            rows={5}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
          <input
            value={form.venue}
            onChange={(e) => update("venue", e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          {existingImage && !imageFile && (
            <img
              src={resolveImageUrl(existingImage)}
              alt=""
              className="w-40 h-24 object-cover rounded-md border border-gray-200 mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-md"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Event"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="px-6 py-2.5 rounded-md border border-gray-300 text-gray-700 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createEvent, updateEvent, resolveImageUrl } from "../../lib/adminApi";

export default function EventFormModal({ event, onClose, onSaved }) {
  const isEdit = Boolean(event);
  const [form, setForm] = useState({
    date: event?.date || "",
    title: event?.title || "",
    fullDescription: event?.fullDescription || "",
    venue: event?.venue || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.date || !form.title) {
      setError("Date and title are required.");
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await updateEvent(event.id, form, imageFile);
      } else {
        await createEvent(form, imageFile);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">{isEdit ? "Edit Event" : "Add Event"}</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5">
              {error}
            </div>
          )}

          <Field label="Date (free text, e.g. '18-19 June 2026')*">
            <input className="input" value={form.date} onChange={(e) => update("date", e.target.value)} required />
          </Field>

          <Field label="Title*">
            <input className="input" value={form.title} onChange={(e) => update("title", e.target.value)} required />
          </Field>

          <Field label="Venue">
            <input className="input" value={form.venue} onChange={(e) => update("venue", e.target.value)} />
          </Field>

          <Field label="Full description">
            <textarea
              className="input"
              rows={5}
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
            />
          </Field>

          {isEdit && event.image && !imageFile && (
            <img src={resolveImageUrl(event.image)} alt="" className="w-full h-32 object-cover rounded-xl border border-gray-200" />
          )}

          <Field label={isEdit ? "Replace image" : "Image"}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-3 file:h-9 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium"
            />
          </Field>

          <div className="flex justify-end gap-3 pt-2 sticky bottom-0 bg-white -mx-5 px-5 pb-1 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="h-11 px-4 rounded-xl border border-gray-300 font-medium text-gray-700">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-11 px-5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-semibold flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

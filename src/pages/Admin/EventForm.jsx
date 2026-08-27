import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { fetchEventById } from "../../lib/api";
import { createEvent, updateEvent } from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import { FormField, inputClass } from "./components/FormField";
import { ImageDropzone, ImageThumb } from "./components/ImageDropzone";
import { SkeletonForm } from "./components/Skeleton";

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
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((fe) => ({ ...fe, [field]: undefined }));
  };

  const handleImageFiles = (fileList) => {
    const file = fileList[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const errs = {};
    if (!form.date.trim()) errs.date = "Date is required.";
    if (!form.title.trim()) errs.title = "Title is required.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setSaving(true);
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

  const title = isEdit ? "Edit Event" : "Add Event";

  return (
    <div className="max-w-2xl">
      {/* Sheet-style sticky header — reads as a slide-up sheet on mobile */}
      <div className="sticky top-14 md:top-0 z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mb-6 bg-gray-50/90 backdrop-blur border-b border-gray-200 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/events")}
          className="w-9 h-9 -ml-1.5 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      {loading ? (
        <SkeletonForm />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pb-24 md:pb-0">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <FormField label="Date" required error={fieldErrors.date}>
              <input
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                placeholder="e.g. 18-19 June 2026"
                className={inputClass}
              />
            </FormField>

            <FormField label="Title" required error={fieldErrors.title}>
              <textarea
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                rows={2}
                className={inputClass}
              />
            </FormField>

            <FormField label="Full Description">
              <textarea
                value={form.fullDescription}
                onChange={(e) => update("fullDescription", e.target.value)}
                rows={5}
                className={inputClass}
              />
            </FormField>

            <FormField label="Venue">
              <input value={form.venue} onChange={(e) => update("venue", e.target.value)} className={inputClass} />
            </FormField>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Image</label>
            {(imagePreview || existingImage) && (
              <ImageThumb src={imagePreview || resolveImageUrl(existingImage)} size="md" />
            )}
            <ImageDropzone onFiles={handleImageFiles} label="Drag & drop an image, or click to browse" />
          </div>

          {/* Action bar: inline on desktop, sticky bottom sheet-footer on mobile */}
          <div className="fixed md:static bottom-0 inset-x-0 md:inset-auto bg-white md:bg-transparent border-t md:border-0 border-gray-200 p-4 md:p-0 flex gap-3 z-20 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:pb-0">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 min-h-[44px] bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 rounded-xl transition-colors"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Event"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="min-h-[44px] px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
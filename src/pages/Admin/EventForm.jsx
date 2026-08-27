import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById } from "../../lib/api";
import { createEvent, updateEvent } from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import FormSheet from "./components/FormSheet";
import FormField from "./components/FormField";
import ImageDropzone from "./components/ImageDropzone";
import {
  inputClass,
  inputErrorClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "./components/ui";

function resolveImageUrl(path) {
  if (!path) return "";
  return path.startsWith("/uploads/") ? `${API_BASE}${path}` : path;
}

const emptyForm = { date: "", title: "", fullDescription: "", venue: "" };

export default function EventForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const close = () => navigate("/admin/events");

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

  const handleImageSelect = (file) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : "");
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

  if (loading) {
    return (
      <FormSheet title="Edit Event" onClose={close}>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-11 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </FormSheet>
    );
  }

  return (
    <FormSheet
      title={isEdit ? "Edit Event" : "Add Event"}
      onClose={close}
      footer={
        <>
          <button type="button" onClick={close} className={`${secondaryButtonClass} flex-1 md:flex-none`}>
            Cancel
          </button>
          <button
            type="submit"
            form="event-form"
            disabled={saving}
            className={`${primaryButtonClass} flex-1 md:flex-none`}
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Event"}
          </button>
        </>
      }
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form id="event-form" onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Date" required error={fieldErrors.date} hint="e.g. 18-19 June 2026">
          <input
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            placeholder="18-19 June 2026"
            className={`${inputClass} ${fieldErrors.date ? inputErrorClass : ""}`}
          />
        </FormField>

        <FormField label="Title" required error={fieldErrors.title}>
          <textarea
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            rows={2}
            className={`${inputClass} ${fieldErrors.title ? inputErrorClass : ""}`}
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
          <input
            value={form.venue}
            onChange={(e) => update("venue", e.target.value)}
            className={inputClass}
          />
        </FormField>

        <FormField label="Image">
          <ImageDropzone
            existingImages={imagePreview ? [] : existingImage ? [existingImage] : []}
            onRemoveExisting={() => setExistingImage("")}
            onFiles={handleImageSelect}
            resolveUrl={resolveImageUrl}
            label="Click to upload"
            hint="PNG, JPG, WEBP up to 8MB"
          />
          {imagePreview && (
            <div className="relative mt-3 h-24 w-40 overflow-hidden rounded-xl border border-gray-200">
              <img src={imagePreview} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleImageSelect(null)}
                className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white"
              >
                Remove
              </button>
            </div>
          )}
        </FormField>
      </form>
    </FormSheet>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { fetchInstrumentById, fetchInstrumentCategories } from "../../lib/api";
import {
  createInstrument,
  updateInstrument,
  uploadInstrumentImages,
  deleteInstrumentImage,
} from "../../lib/adminApi";
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

const STATUS_OPTIONS = ["Operational", "Under Maintenance", "Partially Working", "Not Working"];

const emptyForm = {
  id: "",
  name: "",
  fullName: "",
  category: "",
  model: "",
  status: "Operational",
  showInStatus: true,
  usageCharges: { academic: "", industrial: "", unit: "per sample" },
  features: [""],
  applications: [""],
  handledBy: "",
  email: "",
  location: "",
};

function resolveImageUrl(path) {
  if (!path) return "";
  return path.startsWith("/uploads/") ? `${API_BASE}${path}` : path;
}

export default function InstrumentForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const close = () => navigate("/admin/instruments");

  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchInstrumentCategories().then((cats) => setCategories(cats.map((c) => c.category)));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetchInstrumentById(id)
      .then((data) => {
        setForm({
          id: data.id,
          name: data.name,
          fullName: data.fullName,
          category: data.category,
          model: data.model,
          status: data.status,
          showInStatus: data.showInStatus,
          usageCharges: data.usageCharges,
          features: data.features.length ? data.features : [""],
          applications: data.applications.length ? data.applications : [""],
          handledBy: data.handledBy,
          email: data.email,
          location: data.location,
        });
        setImages(data.images);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((fe) => ({ ...fe, [field]: undefined }));
  };
  const updateCharge = (field, value) =>
    setForm((f) => ({ ...f, usageCharges: { ...f.usageCharges, [field]: value } }));

  const updateListItem = (field, index, value) => {
    setForm((f) => {
      const list = [...f[field]];
      list[index] = value;
      return { ...f, [field]: list };
    });
  };
  const addListItem = (field) => setForm((f) => ({ ...f, [field]: [...f[field], ""] }));
  const removeListItem = (field, index) =>
    setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.category.trim()) errs.category = "Category is required.";
    if (!form.model.trim()) errs.model = "Model is required.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setSaving(true);
    const payload = {
      ...form,
      features: form.features.map((s) => s.trim()).filter(Boolean),
      applications: form.applications.map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await updateInstrument(id, payload);
        navigate("/admin/instruments");
      } else {
        const created = await createInstrument(payload);
        navigate(`/admin/instruments/${created.id}/edit`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const res = await uploadInstrumentImages(id, files);
      setImages(res.images);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (url) => {
    if (!window.confirm("Remove this image?")) return;
    try {
      const res = await deleteInstrumentImage(id, url);
      setImages(res.images);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <FormSheet title="Edit Instrument" onClose={close}>
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
      title={isEdit ? `Edit ${form.name || "Instrument"}` : "Add Instrument"}
      onClose={close}
      footer={
        <>
          <button type="button" onClick={close} className={`${secondaryButtonClass} flex-1 md:flex-none`}>
            Cancel
          </button>
          <button
            type="submit"
            form="instrument-form"
            disabled={saving}
            className={`${primaryButtonClass} flex-1 md:flex-none`}
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Instrument"}
          </button>
        </>
      }
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form id="instrument-form" onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Basics</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Name" required error={fieldErrors.name}>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={`${inputClass} ${fieldErrors.name ? inputErrorClass : ""}`}
              />
            </FormField>
            <FormField label="Full Name">
              <input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Category" required error={fieldErrors.category}>
              <input
                list="category-options"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={`${inputClass} ${fieldErrors.category ? inputErrorClass : ""}`}
                placeholder="e.g. Microscopy"
              />
              <datalist id="category-options">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </FormField>
            <FormField label="Model" required error={fieldErrors.model}>
              <input
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
                className={`${inputClass} ${fieldErrors.model ? inputErrorClass : ""}`}
              />
            </FormField>
            <FormField label="Status">
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className={inputClass}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>
            <label className="mt-1 flex min-h-[44px] items-center gap-2.5 text-sm font-medium text-gray-700 sm:mt-6">
              <input
                type="checkbox"
                checked={form.showInStatus}
                onChange={(e) => update("showInStatus", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show on Facility Status page
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">
            Usage Charges
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Academic">
              <input
                value={form.usageCharges.academic}
                onChange={(e) => updateCharge("academic", e.target.value)}
                className={inputClass}
                placeholder="₹ 1,000 per sample"
              />
            </FormField>
            <FormField label="Industrial">
              <input
                value={form.usageCharges.industrial}
                onChange={(e) => updateCharge("industrial", e.target.value)}
                className={inputClass}
                placeholder="₹ 2,000 per sample"
              />
            </FormField>
            <FormField label="Unit">
              <input
                value={form.usageCharges.unit}
                onChange={(e) => updateCharge("unit", e.target.value)}
                className={inputClass}
                placeholder="per sample"
              />
            </FormField>
          </div>
        </section>

        <ListEditor
          title="Features"
          items={form.features}
          onChange={(i, v) => updateListItem("features", i, v)}
          onAdd={() => addListItem("features")}
          onRemove={(i) => removeListItem("features", i)}
        />

        <ListEditor
          title="Applications"
          items={form.applications}
          onChange={(i, v) => updateListItem("applications", i, v)}
          onAdd={() => addListItem("applications")}
          onRemove={(i) => removeListItem("applications", i)}
        />

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Contact</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField label="Handled By">
              <input
                value={form.handledBy}
                onChange={(e) => update("handledBy", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Email">
              <input
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField label="Location">
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Images</h3>
          {!isEdit ? (
            <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
              Save the instrument first, then you'll be able to upload images.
            </p>
          ) : (
            <ImageDropzone
              multiple
              onFiles={handleImageUpload}
              existingImages={images}
              onRemoveExisting={handleImageDelete}
              resolveUrl={resolveImageUrl}
              uploading={uploading}
              hint="PNG, JPG, WEBP up to 8MB each"
            />
          )}
        </section>
      </form>
    </FormSheet>
  );
}

function ListEditor({ title, items, onChange, onAdd, onRemove }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">{title}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={item}
              onChange={(e) => onChange(i, e.target.value)}
              rows={2}
              className={`${inputClass} flex-1`}
            />
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label={`Remove ${title.toLowerCase()} item`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
      >
        <Plus className="h-4 w-4" />
        Add {title.slice(0, -1)}
      </button>
    </section>
  );
}

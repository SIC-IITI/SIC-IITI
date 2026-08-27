import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, Loader2, Plus, X } from "lucide-react";
import { fetchInstrumentById, fetchInstrumentCategories } from "../../lib/api";
import {
  createInstrument,
  updateInstrument,
  uploadInstrumentImages,
  deleteInstrumentImage,
} from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import { FormField, inputClass } from "./components/FormField";
import { ImageDropzone, ImageThumb } from "./components/ImageDropzone";
import { SkeletonForm } from "./components/Skeleton";

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

  const handleImageFiles = async (fileList) => {
    setUploading(true);
    setError("");
    try {
      const res = await uploadInstrumentImages(id, fileList);
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

  const title = isEdit ? `Edit ${form.name}` : "Add Instrument";

  return (
    <div className="max-w-3xl">
      <div className="sticky top-14 md:top-0 z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mb-6 bg-gray-50/90 backdrop-blur border-b border-gray-200 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/instruments")}
          className="w-9 h-9 -ml-1.5 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft size={19} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{title}</h1>
      </div>

      {loading ? (
        <SkeletonForm />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 pb-24 md:pb-0">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-gray-800">Basics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Name" required error={fieldErrors.name}>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
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
                  className={inputClass}
                  placeholder="e.g. Microscopy"
                />
                <datalist id="category-options">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </FormField>
              <FormField label="Model" required error={fieldErrors.model}>
                <input value={form.model} onChange={(e) => update("model", e.target.value)} className={inputClass} />
              </FormField>
              <FormField label="Status">
                <select value={form.status} onChange={(e) => update("status", e.target.value)} className={inputClass}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </FormField>
              <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 sm:mt-7 min-h-[44px]">
                <input
                  type="checkbox"
                  checked={form.showInStatus}
                  onChange={(e) => update("showInStatus", e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                Show on Facility Status page
              </label>
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-gray-800">Usage Charges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-gray-800">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Handled By">
                <input
                  value={form.handledBy}
                  onChange={(e) => update("handledBy", e.target.value)}
                  className={inputClass}
                />
              </FormField>
              <FormField label="Email">
                <input value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
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

          <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 className="font-bold text-gray-800">Images</h2>
            {!isEdit && (
              <p className="text-sm text-gray-500">
                Save the instrument first, then you'll be able to upload images.
              </p>
            )}
            {isEdit && (
              <>
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {images.map((img) => (
                      <ImageThumb key={img} src={resolveImageUrl(img)} onRemove={() => handleImageDelete(img)} />
                    ))}
                  </div>
                )}
                <ImageDropzone
                  multiple
                  disabled={uploading}
                  onFiles={handleImageFiles}
                  label="Drag & drop images, or click to browse"
                />
              </>
            )}
          </section>

          <div className="fixed md:static bottom-0 inset-x-0 md:inset-auto bg-white md:bg-transparent border-t md:border-0 border-gray-200 p-4 md:p-0 flex gap-3 z-20 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:pb-0">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 min-h-[44px] bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 rounded-xl transition-colors"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Instrument"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/instruments")}
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

function ListEditor({ title, items, onChange, onAdd, onRemove }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
      <h2 className="font-bold text-gray-800">{title}</h2>
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
            aria-label={`Remove ${title.slice(0, -1)}`}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1.5 text-blue-600 text-sm font-semibold min-h-[36px]"
      >
        <Plus size={15} />
        Add {title.slice(0, -1)}
      </button>
    </section>
  );
}
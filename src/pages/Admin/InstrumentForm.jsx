import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchInstrumentById, fetchInstrumentCategories } from "../../lib/api";
import {
  createInstrument,
  updateInstrument,
  uploadInstrumentImages,
  deleteInstrumentImage,
} from "../../lib/adminApi";
import { API_BASE } from "../../lib/config";
import "./admin.css";

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

// Turns a stored image path ("/uploads/..." or "/assets/...") into a
// URL the browser can actually load. Uploaded files live on the API
// server; files under /assets ship with this frontend itself.
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

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
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
        // Go straight to the edit page so images can be uploaded next.
        navigate(`/admin/instruments/${created.id}/edit`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const res = await uploadInstrumentImages(id, files);
      setImages(res.images);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
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

  if (loading) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? `Edit ${form.name}` : "Add Instrument"}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-700">Basics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="input"
                required
              />
            </Field>
            <Field label="Full Name">
              <input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Category" required>
              <input
                list="category-options"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="input"
                placeholder="e.g. Microscopy"
                required
              />
              <datalist id="category-options">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label="Model" required>
              <input
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
                className="input"
                required
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="input"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm text-gray-700 mt-6">
              <input
                type="checkbox"
                checked={form.showInStatus}
                onChange={(e) => update("showInStatus", e.target.checked)}
              />
              Show on Facility Status page
            </label>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-700">Usage Charges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Academic">
              <input
                value={form.usageCharges.academic}
                onChange={(e) => updateCharge("academic", e.target.value)}
                className="input"
                placeholder="₹ 1,000 per sample"
              />
            </Field>
            <Field label="Industrial">
              <input
                value={form.usageCharges.industrial}
                onChange={(e) => updateCharge("industrial", e.target.value)}
                className="input"
                placeholder="₹ 2,000 per sample"
              />
            </Field>
            <Field label="Unit">
              <input
                value={form.usageCharges.unit}
                onChange={(e) => updateCharge("unit", e.target.value)}
                className="input"
                placeholder="per sample"
              />
            </Field>
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

        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-700">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Handled By">
              <input
                value={form.handledBy}
                onChange={(e) => update("handledBy", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Email">
              <input
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="input"
              />
            </Field>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-700">Images</h2>
          {!isEdit && (
            <p className="text-sm text-gray-500">
              Save the instrument first, then you'll be able to upload images.
            </p>
          )}
          {isEdit && (
            <>
              <div className="flex flex-wrap gap-3">
                {images.map((img) => (
                  <div key={img} className="relative group">
                    <img
                      src={resolveImageUrl(img)}
                      alt=""
                      className="w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(img)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="text-sm"
              />
              {uploading && <p className="text-sm text-gray-500">Uploading…</p>}
            </>
          )}
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-md"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Instrument"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/instruments")}
            className="px-6 py-2.5 rounded-md border border-gray-300 text-gray-700 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

function ListEditor({ title, items, onChange, onAdd, onRemove }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
      <h2 className="font-bold text-gray-700">{title}</h2>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={item}
            onChange={(e) => onChange(i, e.target.value)}
            rows={2}
            className="input flex-1"
          />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="text-red-600 text-sm font-semibold px-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="text-blue-600 text-sm font-semibold"
      >
        + Add {title.slice(0, -1)}
      </button>
    </section>
  );
}

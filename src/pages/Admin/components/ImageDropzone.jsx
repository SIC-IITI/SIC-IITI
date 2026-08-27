import React, { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

// Reusable drag-and-drop image zone. Pass `multiple` for a gallery
// (instruments) or leave false for a single cover image (events).
// `existingImages` are already-saved URLs; `onFiles` receives a
// FileList (multiple) or a single File (single mode) for new uploads.
export default function ImageDropzone({
  multiple = false,
  onFiles,
  existingImages = [],
  onRemoveExisting,
  resolveUrl = (u) => u,
  uploading = false,
  label = "Click to upload",
  hint = "PNG, JPG, WEBP up to 8MB",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    onFiles(multiple ? fileList : fileList[0]);
  };

  return (
    <div className="space-y-3">
      {existingImages.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {existingImages.map((img) => (
            <div
              key={img}
              className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 shadow-sm sm:h-24 sm:w-24"
            >
              <img src={resolveUrl(img)} alt="" className="h-full w-full object-cover" />
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(img)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        disabled={uploading}
        className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"
        } ${uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <UploadCloud className="h-6 w-6 text-gray-400" />
        <p className="text-sm text-gray-600">
          {uploading ? (
            "Uploading…"
          ) : (
            <>
              <span className="font-semibold text-blue-600">{label}</span> or drag and drop
            </>
          )}
        </p>
        <p className="text-xs text-gray-400">{hint}</p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

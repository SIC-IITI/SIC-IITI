import React from "react";
import { X } from "lucide-react";

// On mobile this fills the viewport and slides up from the bottom,
// like a native sheet. On desktop (md+) it settles into a normal
// centered, max-width card so it reads as a dialog rather than a
// cramped inline form.
export default function FormSheet({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-white md:static md:z-auto md:mx-auto md:my-2 md:max-w-2xl md:animate-none md:rounded-2xl md:border md:border-gray-200 md:shadow-sm animate-[sheetUp_0.22s_ease-out]">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4 sm:px-6 md:rounded-t-2xl">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">{children}</div>

      {footer && (
        <div className="sticky bottom-0 flex gap-3 border-t border-gray-100 bg-white px-4 py-4 sm:px-6 md:rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
}

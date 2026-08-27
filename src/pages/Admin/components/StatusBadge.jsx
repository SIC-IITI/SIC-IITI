import React from "react";

const STYLES = {
  Operational: "bg-emerald-50 text-emerald-700",
  "Under Maintenance": "bg-amber-50 text-amber-700",
  "Partially Working": "bg-amber-50 text-amber-700",
  "Not Working": "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        STYLES[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

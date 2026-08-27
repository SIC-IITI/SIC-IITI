import React from "react";
import { Plus } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <Icon className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
      </div>
      <h3 className="mb-1 font-semibold text-gray-900">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-gray-500">{message}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <ActionIcon className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

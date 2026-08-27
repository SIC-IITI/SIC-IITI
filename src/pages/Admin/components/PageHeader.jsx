import React from "react";
import { Plus } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  actionIcon: ActionIcon = Plus,
  onAction,
}) {
  return (
    <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 mb-6 border-b border-gray-200 bg-gray-50/90 px-4 py-4 backdrop-blur-sm sm:mb-8 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl">{title}</h1>
          {subtitle && <p className="mt-0.5 truncate text-sm text-gray-500">{subtitle}</p>}
        </div>
        {actionLabel && (
          <button
            onClick={onAction}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            <ActionIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

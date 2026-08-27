// Shared Tailwind class strings so every admin form control looks and
// behaves consistently (44px+ touch targets, rounded-xl, subtle focus ring).

export const inputClass =
  "w-full min-h-[44px] rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-shadow";

export const inputErrorClass = "border-red-400 focus:ring-red-400/30 focus:border-red-400";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100";

export const dangerTextButtonClass =
  "inline-flex items-center justify-center gap-1.5 min-h-[44px] px-2 text-sm font-semibold text-red-600 hover:text-red-700";

export const iconButtonClass =
  "inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors";

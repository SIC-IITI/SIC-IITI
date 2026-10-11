import React from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../i18n";

const OPTIONS = [
  { code: "en", label: "EN", switchKey: "lang.switchToEnglish" },
  { code: "hi", label: "हिं", switchKey: "lang.switchToHindi" },
];

function LanguageToggle({ className = "", large = false, compact = false }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language;

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex shrink-0 items-center overflow-hidden rounded-md border border-blue-600 ${className}`}
    >
      {OPTIONS.map((opt) => {
        const active = current === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            lang={opt.code}
            aria-pressed={active}
            aria-label={t(opt.switchKey)}
            title={t(opt.switchKey)}
            onClick={() => setLanguage(opt.code)}
            className={`font-bold transition-colors ${
              large
                ? "min-w-[3rem] px-4 py-2 text-base"
                : compact
                ? "min-w-[2.25rem] px-2 py-0.5 text-xs"
                : "min-w-[2.5rem] px-2.5 py-1.5 text-sm"
            } ${
              active
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 hover:bg-blue-50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageToggle;

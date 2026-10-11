import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MIN_SCALE = 0.85;
const MAX_SCALE = 1.3;
const STEP = 0.1;
const STORAGE_KEY = "sic-font-scale";

function FontSizeControl() {
  const { t } = useTranslation();
  const [scale, setScale] = useState(1);

  // Load any previously saved preference and apply it on mount
  useEffect(() => {
    const saved = parseFloat(localStorage.getItem(STORAGE_KEY));
    const initialScale = !isNaN(saved) ? saved : 1;
    setScale(initialScale);
    document.documentElement.style.fontSize = `${initialScale * 100}%`;
  }, []);

  const applyScale = (newScale) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    setScale(clamped);
    document.documentElement.style.fontSize = `${clamped * 100}%`;
    localStorage.setItem(STORAGE_KEY, clamped.toString());
  };

  const increase = () => applyScale(scale + STEP);
  const decrease = () => applyScale(scale - STEP);
  const reset = () => applyScale(1);

  return (
    <div className="flex items-center justify-center gap-2" role="group" aria-label={t("fontSize.group")}>
      <button
        type="button"
        onClick={decrease}
        disabled={scale <= MIN_SCALE}
        aria-label={t("fontSize.decrease")}
        title={t("fontSize.decrease")}
        className="w-9 h-9 rounded-md bg-white text-blue-900 font-bold text-sm hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        A-
      </button>
      <button
        type="button"
        onClick={reset}
        aria-label={t("fontSize.reset")}
        title={t("fontSize.reset")}
        className="w-9 h-9 rounded-md bg-white text-blue-900 font-bold text-sm hover:bg-blue-100 transition"
      >
        A
      </button>
      <button
        type="button"
        onClick={increase}
        disabled={scale >= MAX_SCALE}
        aria-label={t("fontSize.increase")}
        title={t("fontSize.increase")}
        className="w-9 h-9 rounded-md bg-white text-blue-900 font-bold text-base hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        A+
      </button>
    </div>
  );
}

export default FontSizeControl;

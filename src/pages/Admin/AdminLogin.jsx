import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { verifyAdminSecret } from "../../lib/adminApi";
import { setAdminSecret } from "../../lib/adminAuth";
import { inputClass, inputErrorClass, primaryButtonClass } from "./components/ui";

export default function AdminLogin() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    try {
      const ok = await verifyAdminSecret(secret);
      if (!ok) {
        setError("Incorrect admin secret.");
        return;
      }
      setAdminSecret(secret);
      const redirectTo = location.state?.from || "/admin";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError("Could not reach the admin server. Is it running?");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <ShieldCheck className="h-7 w-7 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">SIC Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter the admin secret to manage events and instruments.
          </p>
        </div>

        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Admin Secret</label>
        <input
          type="password"
          autoFocus
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className={`${inputClass} ${error ? inputErrorClass : ""} mb-1`}
          placeholder="••••••••••••"
        />
        {error && <p className="mb-4 mt-1.5 text-xs font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={checking || !secret}
          className={`${primaryButtonClass} mt-4 w-full`}
        >
          {checking ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { verifyAdminSecret } from "../../lib/adminApi";
import { setAdminSecret } from "../../lib/adminAuth";
import { inputClass } from "./components/FormField";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm border border-gray-200"
      >
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <ShieldCheck size={22} strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">SIC Admin</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the admin secret to manage events and instruments.
        </p>

        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin secret</label>
        <input
          type="password"
          autoFocus
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className={`${inputClass} mb-4`}
          placeholder="••••••••••••"
        />

        {error && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-red-600 mb-4">
            <AlertCircle size={15} />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={checking || !secret}
          className="w-full flex items-center justify-center gap-2 min-h-[44px] bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
        >
          {checking && <Loader2 size={16} className="animate-spin" />}
          {checking ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
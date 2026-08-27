import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyAdminSecret } from "../../lib/adminApi";
import { setAdminSecret } from "../../lib/adminAuth";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1">SIC Admin</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter the admin secret to manage events and instruments.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin Secret
        </label>
        <input
          type="password"
          autoFocus
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••••••"
        />

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={checking || !secret}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-md transition-colors"
        >
          {checking ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

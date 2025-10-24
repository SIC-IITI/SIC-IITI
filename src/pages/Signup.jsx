import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const BACKEND_URL = "http://localhost:5000/api/user";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    Affiliation: "",
  });

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (value.trim().length > 100) {
          error = "Name cannot exceed 100 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(value)) {
          error = "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(value)) {
          error = "Password must contain at least one number";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      case "Affiliation":
        if (!value || value === "") {
          error = "Please select an affiliation";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Clear general error when user starts typing
    setGeneralError("");

    // Real-time validation
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    if (name === "password" && formData.confirmPassword) {
      const confirmError =
        formData.confirmPassword !== value ? "Passwords do not match" : "";
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setGeneralError("");

    // Validate all fields
    if (!validateForm()) {
      setGeneralError("Please fix all errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          Affiliation: formData.Affiliation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different error scenarios
        switch (response.status) {
          case 400:
            // Validation errors from backend
            if (data.fields) {
              const backendErrors = {};
              Object.keys(data.fields).forEach((field) => {
                if (data.fields[field]) {
                  backendErrors[field] = data.message;
                }
              });
              setFieldErrors(backendErrors);
            }
            throw new Error(
              data.message || "Invalid input. Please check your information."
            );

          case 409:
            if (data.message.includes("email")) {
              setFieldErrors((prev) => ({ ...prev, email: data.message }));
            } else if (
              data.message.includes("username") ||
              data.message.includes("name")
            ) {
              setFieldErrors((prev) => ({ ...prev, name: data.message }));
            }
            throw new Error(data.message);

          case 500:
            throw new Error("Server error. Please try again later.");

          default:
            throw new Error(data.message || "Signup failed. Please try again.");
        }
      }

      // Success
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );

      // Store token if provided
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        Affiliation: "",
      });
      setFieldErrors({});

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = data.token ? "/" : "/login";
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setGeneralError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center px-4 py-12 max-w-7xl mx-auto items-center min-h-[60vh]">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg border border-blue-200 bg-white shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-blue-100">
              Join SIC to access our facilities
            </p>
          </div>

          <form onSubmit={handleSignup} className="p-8 space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            {/* General Error Message */}
            {generalError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">{generalError}</p>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg border ${
                  fieldErrors.name
                    ? "border-red-400 bg-red-50"
                    : "border-blue-300 bg-blue-50"
                } px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 ${
                  fieldErrors.name
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                placeholder="John Doe"
                disabled={loading}
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg border ${
                  fieldErrors.email
                    ? "border-red-400 bg-red-50"
                    : "border-blue-300 bg-blue-50"
                } px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 ${
                  fieldErrors.email
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                placeholder="name@institute.edu"
                disabled={loading}
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Affiliation */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Affiliation <span className="text-red-500">*</span>
              </label>
              <select
                name="Affiliation"
                value={formData.Affiliation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg border ${
                  fieldErrors.Affiliation
                    ? "border-red-400 bg-red-50"
                    : "border-blue-300 bg-blue-50"
                } px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 ${
                  fieldErrors.Affiliation
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-600"
                }`}
                disabled={loading}
              >
                <option value="">Select your affiliation</option>
                <option value="IIT INDORE">IIT Indore</option>
                <option value="Academic Institution">
                  Academic Institution
                </option>
                <option value="Industry">Industry</option>
                <option value="Research Center">Research Center</option>
                <option value="International">International</option>
              </select>
              {fieldErrors.Affiliation && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.Affiliation}
                </p>
              )}
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Create Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-lg border ${
                    fieldErrors.password
                      ? "border-red-400 bg-red-50"
                      : "border-blue-300 bg-blue-50"
                  } px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 ${
                    fieldErrors.password
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-600"
                  }`}
                  placeholder="Create a strong password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-lg border ${
                    fieldErrors.confirmPassword
                      ? "border-red-400 bg-red-50"
                      : "border-blue-300 bg-blue-50"
                  } px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 ${
                    fieldErrors.confirmPassword
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-600"
                  }`}
                  placeholder="Re-enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                loading ||
                Object.keys(fieldErrors).some((key) => fieldErrors[key])
              }
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;

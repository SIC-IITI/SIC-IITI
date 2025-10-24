import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const BACKEND_URL = "http://localhost:5000/api/user";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    Affiliation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setMessage("Signup successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        Affiliation: "",
      });
    } catch (err) {
      setMessage(err.message);
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
            <p className="mt-2 text-blue-100">Join SIC to access our facilities</p>
          </div>
          <form onSubmit={handleSignup} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="name@institute.edu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Affiliation</label>
              <select
                name="Affiliation"
                value={formData.Affiliation}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select your affiliation</option>
                <option value="IIT INDORE">IIT Indore</option>
                <option value="Academic Institution">Academic Institution</option>
                <option value="Industry">Industry</option>
                <option value="Research Center">Research Center</option>
                <option value="International">International</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Create Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Re-enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.includes("successful") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700">
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
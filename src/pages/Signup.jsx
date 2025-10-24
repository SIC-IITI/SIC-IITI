import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-2xl">
        <div className="rounded-lg border border-blue-200 bg-white shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-blue-100">Join SIC to access our facilities</p>
          </div>
          <form className="p-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-blue-900 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-blue-900 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="signupEmail" className="block text-sm font-semibold text-blue-900 mb-2">
                Email Address
              </label>
              <input
                id="signupEmail"
                type="email"
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="name@institute.edu"
              />
            </div>
            <div>
              <label htmlFor="affiliation" className="block text-sm font-semibold text-blue-900 mb-2">
                Affiliation
              </label>
              <select className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                <option>Select your affiliation</option>
                <option>IIT Indore</option>
                <option>Academic Institution</option>
                <option>Industry</option>
                <option>Research Center</option>
                <option>International</option>
              </select>
            </div>
            <div>
              <label htmlFor="signupPassword" className="block text-sm font-semibold text-blue-900 mb-2">
                Create Password
              </label>
              <div className="relative">
                <input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Create a strong password"
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
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-shadow"
            >
              Create Account
            </button>
            <p className="text-center text-gray-600 text-sm">
              Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:text-blue-700">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;

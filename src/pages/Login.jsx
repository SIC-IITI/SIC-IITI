import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex justify-center px-4 py-12  items-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-blue-200 bg-white shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="mt-2 text-blue-100">Access your SIC account</p>
          </div>
          <form className="p-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="name@institute.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-blue-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="••••••••"
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
              Sign In
            </button>
            <p className="text-center text-gray-600 text-sm">
              Don't have an account? <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;

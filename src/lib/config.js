// Base URL of the admin server (see /server in the project root).
// Set VITE_API_URL in a .env file for production, e.g.:
//   VITE_API_URL=https://api.sic.iiti.ac.in
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

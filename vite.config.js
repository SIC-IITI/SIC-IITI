import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["sic.iiti.ac.in"],
  },

  preview: {
    host: "0.0.0.0",
    allowedHosts: ["sic.iiti.ac.in"],
  },
  // Add this 'resolve' block
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
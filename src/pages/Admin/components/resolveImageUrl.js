import { API_BASE } from "../../../lib/config";

export function resolveImageUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${API_BASE}${path}`;
  return path;
}

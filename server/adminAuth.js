import "dotenv/config";
export function requireAdmin(req, res, next) {
  const provided = req.header("x-admin-secret");
  const expected = process.env.ADMIN_SECRET;

  if (!expected) {
    return res.status(500).json({ error: "Server missing ADMIN_SECRET configuration" });
  }

  if (!provided || provided !== expected) {
    return res.status(401).json({ error: "Invalid or missing admin credentials" });
  }

  next();
}

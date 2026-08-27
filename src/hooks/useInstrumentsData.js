import { useEffect, useState } from "react";
import { fetchInstruments } from "../lib/api";

// Replaces the old `import instrumentsData from "../data/instrumentsData"`
// static import. Every page that lists/filters instruments now reads
// from the admin-managed database through this one hook, so anything
// changed in the admin panel shows up everywhere immediately.
export function useInstrumentsData() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchInstruments()
      .then((data) => {
        if (!cancelled) setInstruments(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [...new Set(instruments.map((i) => i.category))];

  return { instruments, categories, loading, error };
}

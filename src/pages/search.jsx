import { useEffect, useRef } from "react";
import "../style/SearchBar.css";

export default function SearchBar({ query, setQuery, setResults, setLoading }) {
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      return;
    }

    // debounce to avoid firing on every keystroke
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          q: query,
          limit: "10",
          type: "hybrid",
        });

        const res = await fetch(
          `http://127.0.0.1:8000/documents/search?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error(`Search failed: ${res.status}`);
        }

        const data = await res.json();
        setResults(data.results); // array of DocumentResponse
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
}

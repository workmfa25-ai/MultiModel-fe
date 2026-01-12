import { useState } from "react";
import "../style/SearchBar.css";

export default function SearchBar({ query, setQuery }) {
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

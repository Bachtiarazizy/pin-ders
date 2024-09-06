"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="w-full px-4 py-2 text-gray-700 bg-white border-none rounded-l-lg focus:outline-none" />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none">
        Search
      </button>
    </form>
  );
}

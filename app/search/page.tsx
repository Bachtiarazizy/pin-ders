"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface SearchResults {
  pins: any[];
  boards: any[];
  users: any[];
  tags: any[];
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [results, setResults] = useState<SearchResults>({ pins: [], boards: [], users: [], tags: [] });

  useEffect(() => {
    if (q) {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }
  }, [q]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Results for &quot;{q}&quot;</h1>

      <h2 className="text-xl font-semibold mt-6">Pins</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.pins.map((pin) => (
          <Card key={pin.id}>
            <CardHeader>
              <h3 className="text-lg font-medium">{pin.title}</h3>
            </CardHeader>
            <CardContent>
              <p>{pin.description}</p>
              <p className="text-sm text-gray-500">
                by {pin.user.firstName} {pin.user.lastName}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Boards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.boards.map((board) => (
          <Card key={board.id}>
            <CardHeader>
              <h3 className="text-lg font-medium">{board.name}</h3>
            </CardHeader>
            <CardContent>
              <p>{board.description}</p>
              <p className="text-sm text-gray-500">
                by {board.user.firstName} {board.user.lastName}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <h3 className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </h3>
            </CardHeader>
            <CardContent>
              <Image src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className="w-16 h-16 rounded-full object-cover" />
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6">Tags</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.tags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader>
              <h3 className="text-lg font-medium">{tag.name}</h3>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

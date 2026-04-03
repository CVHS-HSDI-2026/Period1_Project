"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClubCardSearch, type ClubCardData } from "@/components/club-card-search";

const PAGE_SIZE = 9;

export default function ClubsPage() {
  const [clubs, setClubs] = useState<ClubCardData[] | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ clubs: ClubCardData[]; totalPages: number; currentPage: number }>(
        `/api/clubs?search=${encodeURIComponent(search)}&page=${page}&pageSize=${PAGE_SIZE}`
      )
      .then((res) => {
        setClubs(res.data.clubs);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Failed to fetch clubs:", err);
        setClubs(null);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  const displayClubs = clubs ?? [];
  const displayTotalPages = totalPages;

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-white">Search for Clubs</h1>

        {/* Search + Filters */}
        <div className="flex w-full max-w-xl items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="bg-white pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="gap-2 bg-white">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <p className="px-3 py-4 text-center text-sm text-zinc-400">
                No filters yet
              </p>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Club Cards Grid */}
        {loading ? (
          <p className="py-12 text-lg text-white/70">Loading...</p>
        ) : displayClubs.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayClubs.map((club) => (
              <ClubCardSearch key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-lg text-white/70">No clubs found.</p>
        )}

        {/* Pagination */}
        {displayTotalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: displayTotalPages }, (_, i) => i + 1).map(
              (p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="icon"
                  className={p === page ? "" : "bg-white"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="icon"
              className="bg-white"
              disabled={page >= displayTotalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

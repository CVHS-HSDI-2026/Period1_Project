"use client";

import { useEffect, useMemo, useState } from "react";
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

const PLACEHOLDER_CLUBS: ClubCardData[] = [
  {
    id: "1",
    name: "Robotics Club",
    description: "Build and program robots to compete in regional and national competitions.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Robotics",
    tags: ["STEM", "Engineering"],
  },
  {
    id: "2",
    name: "Key Club",
    description: "Community service organization dedicated to helping others and building character.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Key+Club",
    tags: ["Service", "Leadership"],
  },
  {
    id: "3",
    name: "Drama Club",
    description: "Explore the performing arts through plays, musicals, and improv nights.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Drama",
    tags: ["Arts", "Performance"],
  },
  {
    id: "4",
    name: "Chess Club",
    description: "Sharpen your strategic thinking and compete in tournaments.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Chess",
    tags: ["Strategy", "Competition"],
  },
  {
    id: "5",
    name: "Debate Club",
    description: "Develop public speaking and argumentation skills in a competitive environment.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Debate",
    tags: ["Speaking", "Competition"],
  },
  {
    id: "6",
    name: "Art Club",
    description: "Express yourself through painting, drawing, and mixed media projects.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Art",
    tags: ["Arts", "Creative"],
  },
  {
    id: "7",
    name: "Science Olympiad",
    description: "Compete in science events ranging from biology to engineering.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Science",
    tags: ["STEM", "Competition"],
  },
  {
    id: "8",
    name: "Photography Club",
    description: "Learn photography techniques and showcase your work in exhibitions.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Photo",
    tags: ["Arts", "Creative"],
  },
  {
    id: "9",
    name: "Environmental Club",
    description: "Promote sustainability and organize campus clean-up events.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Eco",
    tags: ["Service", "Environment"],
  },
  {
    id: "10",
    name: "Math Club",
    description: "Tackle challenging problems and prepare for math competitions.",
    photoUrl: "https://placehold.co/600x300/e2e8f0/475569?text=Math",
    tags: ["STEM", "Competition"],
  },
];

export default function ClubsPage() {
  const [clubs, setClubs] = useState<ClubCardData[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // TODO: Uncomment when there is data in the database
  // useEffect(() => {
  //   axios
  //     .get<{ clubs: ClubCardData[]; totalPages: number; currentPage: number }>(
  //       `/api/clubs?search=${encodeURIComponent(search)}&page=${page}&pageSize=${PAGE_SIZE}`
  //     )
  //     .then((res) => {
  //       setClubs(res.data.clubs);
  //       setTotalPages(res.data.totalPages);
  //     })
  //     .catch((err) => console.error("Failed to fetch clubs:", err));
  // }, [search, page]);

  // Placeholder filtering + pagination while fetch is commented out
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PLACEHOLDER_CLUBS.filter((c) => c.name.toLowerCase().includes(q));
  }, [search]);

  const placeholderTotalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const displayClubs =
    clubs.length > 0
      ? clubs
      : filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const displayTotalPages = clubs.length > 0 ? totalPages : placeholderTotalPages;

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
        {displayClubs.length > 0 ? (
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

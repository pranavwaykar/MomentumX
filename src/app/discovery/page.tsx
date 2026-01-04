"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { ProblemCard } from "@/components/molecules/problem-card";
import { useProblemsStore } from "@/store/problems-store";

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [sortChoice, setSortChoice] = useState<"newest" | "oldest" | "likes">(
    "newest"
  );
  const [minMembers, setMinMembers] = useState<number>(0);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const { problems, init } = useProblemsStore();
  useEffect(() => {
    init();
  }, [init]);

  const domains = useMemo(
    () => Array.from(new Set(problems.map((p) => p.domain))),
    [problems]
  );

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain
      ? problem.domain === selectedDomain
      : true;
    const matchesStage = selectedStage ? problem.stage === selectedStage : true;
    const totalRoles = problem.requiredRoles.reduce((a, r) => a + r.count, 0);
    const matchesMembers = totalRoles >= minMembers;
    return matchesSearch && matchesDomain && matchesStage && matchesMembers;
  });
  const sortedProblems =
    sortChoice === "likes"
      ? [...filteredProblems].sort((a, b) => b.likes - a.likes)
      : sortChoice === "oldest"
      ? [...filteredProblems].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      : [...filteredProblems].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Discover Problems
            </h1>
            <p className="text-muted-foreground">
              Find problems that matter to you and join a team to solve them.
            </p>
          </div>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer"
                onClick={() => setFilterOpen((v) => !v)}>
                <Filter className="h-4 w-4" />
              </Button>
              {filterOpen && (
                <div className="absolute right-0 z-40 mt-2 w-64 rounded-md border bg-background p-3 shadow-md">

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Filters</span>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setFilterOpen(false)}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-3 text-sm">
                    <div className="space-y-1">
                      <div className="font-medium">Sort</div>
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="sortChoice"
                            checked={sortChoice === "newest"}
                            onChange={() => setSortChoice("newest")}
                          />
                          Newest
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="sortChoice"
                            checked={sortChoice === "oldest"}
                            onChange={() => setSortChoice("oldest")}
                          />
                          Oldest
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="sortChoice"
                            checked={sortChoice === "likes"}
                            onChange={() => setSortChoice("likes")}
                          />
                          Most Likes
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium">Minimum Team Size</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          value={minMembers}
                          onChange={(e) =>
                            setMinMembers(Number(e.target.value) || 0)
                          }
                          className="w-20 rounded border bg-background px-2 py-1"
                        />
                        <span className="text-muted-foreground">members</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedDomain === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedDomain(null)}>
            All
          </Badge>
          {domains.map((domain) => (
            <Badge
              key={domain}
              variant={selectedDomain === domain ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedDomain(domain)}>
              {domain}
            </Badge>
          ))}
          {["Draft", "Team Formation", "Building", "MVP"].map((stage) => (
            <Badge
              key={stage}
              variant={selectedStage === stage ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                setSelectedStage(selectedStage === stage ? null : stage)
              }>
              {stage}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="cursor-pointer"
            onClick={() => setSortChoice("likes")}>
            Sort by Likes
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h3 className="text-lg font-semibold">No problems found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

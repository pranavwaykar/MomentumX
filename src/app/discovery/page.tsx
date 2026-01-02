"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Badge } from "@/components/atoms/badge"
import { ProblemCard } from "@/components/molecules/problem-card"
import { MOCK_PROBLEMS } from "@/lib/mock-data"

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [sortByLikes, setSortByLikes] = useState<boolean>(false)

  const domains = Array.from(new Set(MOCK_PROBLEMS.map((p) => p.domain)))

  const filteredProblems = MOCK_PROBLEMS.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = selectedDomain ? problem.domain === selectedDomain : true
    const matchesStage = selectedStage ? problem.stage === selectedStage : true
    return matchesSearch && matchesDomain && matchesStage
  })
  const problems = sortByLikes
    ? [...filteredProblems].sort((a, b) => b.likes - a.likes)
    : filteredProblems

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Problems</h1>
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
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedDomain === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedDomain(null)}
          >
            All
          </Badge>
          {domains.map((domain) => (
            <Badge
              key={domain}
              variant={selectedDomain === domain ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedDomain(domain)}
            >
              {domain}
            </Badge>
          ))}
          {["Draft", "Team Formation", "Building", "MVP"].map((stage) => (
            <Badge
              key={stage}
              variant={selectedStage === stage ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
            >
              {stage}
            </Badge>
          ))}
          <Badge
            variant={sortByLikes ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSortByLikes((v) => !v)}
          >
            Sort by Likes
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
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
  )
}

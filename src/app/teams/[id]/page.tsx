"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { MOCK_PROBLEMS } from "@/lib/mock-data";

export default function TeamDetailPage() {
  const params = useParams<{ id: string }>();

  const problem = useMemo(
    () => MOCK_PROBLEMS.find((p) => p.id === String(params.id)),
    [params.id]
  );

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Team not found</h1>
        <p className="text-muted-foreground mt-2">
          The team you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/teams">Back to Teams</Link>
          </Button>
        </div>
      </div>
    );
  }

  const filledMembers = problem.requiredRoles
    .map((r) => ({ role: r.role, count: r.filled }))
    .filter((r) => r.count > 0);
  const openRoles = problem.requiredRoles
    .map((r) => ({ role: r.role, open: r.count - r.filled }))
    .filter((r) => r.open > 0);
  const teamSize = filledMembers.reduce((a, r) => a + r.count, 0);
  const totalNeeded = problem.requiredRoles.reduce((a, r) => a + r.count, 0);
  const progress = (teamSize / totalNeeded) * 100;

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="outline" className="mb-2">
            {problem.domain}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">{problem.title}</h1>
          <p className="text-muted-foreground mt-2">{problem.tagline}</p>
        </div>
        <Badge className="bg-muted text-foreground">{problem.stage}</Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {["Draft", "Team Formation", "Building", "MVP"].map((stage) => (
          <div
            key={stage}
            className={`rounded-md border p-3 text-sm ${
              stage === problem.stage
                ? "bg-primary/10 border-primary"
                : "bg-muted"
            }`}>
            {stage}
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About the Problem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{problem.description}</p>
            <div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Team progress: {teamSize}/{totalNeeded} members
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full"
              onClick={() => alert("Request to join sent")}>
              Request to Join
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/discovery">Explore Other Problems</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filledMembers.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No members yet. Be the first to join!
              </p>
            )}
            {filledMembers.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm border-b last:border-none py-2">
                <span>{m.role}</span>
                <Badge variant="secondary">{m.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Roles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {openRoles.length === 0 && (
              <p className="text-sm text-muted-foreground">No open roles.</p>
            )}
            {openRoles.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm border-b last:border-none py-2">
                <span>{r.role}</span>
                <Badge variant="secondary">{r.open} open</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client"

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";
import { MOCK_PROBLEMS } from "@/lib/mock-data";
import { Heart, Users } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";

export default function ProblemDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const problem = useMemo(
    () => MOCK_PROBLEMS.find((p) => p.id === String(params.id)),
    [params.id]
  );

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Problem not found</h1>
        <p className="text-muted-foreground mt-2">
          The problem you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/discovery">Back to Discovery</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalRoles = problem.requiredRoles.reduce((a, r) => a + r.count, 0);
  const filledRoles = problem.requiredRoles.reduce((a, r) => a + r.filled, 0);
  const progress = (filledRoles / totalRoles) * 100;

  const handleJoin = () => {
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }
    alert("Request to join sent to team lead.");
  };

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

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{problem.description}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Team Progress
            </span>
            <span>
              {filledRoles}/{totalRoles} Members
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {problem.requiredRoles.map((r, i) => (
              <Badge key={i} variant="secondary">
                {r.role} ({r.filled}/{r.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button onClick={handleJoin}>Request to Join</Button>
        <Button variant="outline" asChild>
          <Link href={`/teams/${problem.id}`}>View Team</Link>
        </Button>
        <Button variant="ghost" size="icon" title="Like">
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

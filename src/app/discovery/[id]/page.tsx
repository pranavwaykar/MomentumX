"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Heart, Users, CalendarDays } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { Avatar } from "@/components/atoms/avatar";
import { useToast } from "@/components/toast-provider";
import { formatDate } from "@/lib/utils";
import { useProblemsStore } from "@/store/problems-store";
import { useProfileStore } from "@/store/profile-store";

export default function ProblemDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { show } = useToast();
  const { addJoinRequest, problems, init } = useProblemsStore();
  const { photoUrl, name, init: initProfile } = useProfileStore();

  useEffect(() => {
    init();
    initProfile();
  }, [init, initProfile]);

  const problem = useMemo(
    () => problems.find((p) => p.id === String(params.id)),
    [params.id, problems]
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
    addJoinRequest(problem.id, {
      name: user.displayName || user.email || "User",
      email: user.email || "",
    });
    show("Request to join sent to team lead.", "success");
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center">
        <Button
          className="text-base cursor-pointer"
          variant="ghost"
          size="sm"
          onClick={() => router.back()}>
          ← Back
        </Button>
      </div>
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
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Avatar
              name={
                user?.email && problem.author.email === user.email && name
                  ? name
                  : problem.author.name
              }
              src={
                user?.email && problem.author.email === user.email && photoUrl
                  ? photoUrl
                  : problem.author.avatar
              }
              size={28}
            />
            <span>
              By{" "}
              {user?.email && problem.author.email === user.email && name
                ? name
                : problem.author.name}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />{" "}
              {formatDate(problem.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" /> {problem.likes}
            </span>
          </div>
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
        {user?.email &&
        (problem.author.email === user.email ||
          problem.author.name === (user.displayName || "")) ? (
          <Button variant="default" asChild>
            <Link href={`/notifications`}>Manage Requests</Link>
          </Button>
        ) : (
          <Button onClick={handleJoin}>Request to Join</Button>
        )}
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

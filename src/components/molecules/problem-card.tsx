"use client";

import { Avatar } from "@/components/atoms/avatar";
import { useProfileStore } from "@/store/profile-store";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useProblemsStore } from "@/store/problems-store";
import { Heart, Users } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Problem } from "@/lib/mock-data";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const { user } = useAuth();
  const { pendingCountForProblem, toggleLike } = useProblemsStore();
  const liked = useProblemsStore((state) =>
    state.likedProblemIds.includes(problem.id)
  );
  const { photoUrl, name } = useProfileStore();
  const pending = pendingCountForProblem(problem.id);
  const totalRoles = problem.requiredRoles.reduce((acc, r) => acc + r.count, 0);
  const filledRoles = problem.requiredRoles.reduce(
    (acc, r) => acc + r.filled,
    0
  );
  const progress = (filledRoles / totalRoles) * 100;

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Badge variant="outline" className="mb-2">
              {problem.domain}
            </Badge>
            <CardTitle className="line-clamp-1 text-xl">
              {problem.title}
            </CardTitle>
          </div>
          <Badge
            variant={
              problem.stage === "Team Formation"
                ? "info"
                : problem.stage === "Building"
                ? "warning"
                : problem.stage === "MVP"
                ? "success"
                : "secondary"
            }>
            {problem.stage}
          </Badge>
          {((user?.email && problem.author.name.includes(user.email)) ||
            problem.author.name === "You") &&
            pending > 0 && (
              <Badge variant="secondary" className="ml-2">
                Requests: {pending}
              </Badge>
            )}
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {problem.tagline}
        </p>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> Team Progress
            </span>
            <span>
              {filledRoles}/{totalRoles} Members
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {problem.requiredRoles.slice(0, 3).map((role, i) => (
              <Badge key={i} variant="secondary" className="text-[10px]">
                {role.role}
              </Badge>
            ))}
            {problem.requiredRoles.length > 3 && (
              <Badge variant="secondary" className="text-[10px]">
                +{problem.requiredRoles.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {(() => {
              const isAuthor =
                !!user?.email &&
                ((problem.author.email &&
                  problem.author.email === user.email) ||
                  (!!user.displayName &&
                    problem.author.name === user.displayName) ||
                  (!!user.email && problem.author.name?.includes(user.email)));
              const displayName = isAuthor && name ? name : problem.author.name;
              const displayPhoto =
                isAuthor && photoUrl ? photoUrl : problem.author.avatar;
              return (
                <>
                  <Avatar name={displayName} src={displayPhoto} size={24} />
                  <span className="line-clamp-1 max-w-[120px]">
                    {displayName}
                  </span>
                </>
              );
            })()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`flex h-8 items-center gap-1.5 px-2 transition-colors ${
                liked
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleLike(problem.id);
              }}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{problem.likes}</span>
              <span className="sr-only">Like</span>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/discovery/${problem.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

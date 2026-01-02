"use client";

import Image from "next/image";
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
            className={
              problem.stage === "Team Formation"
                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                : problem.stage === "Building"
                ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
                : problem.stage === "MVP"
                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
            }>
            {problem.stage}
          </Badge>
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
            <Image
              src={problem.author.avatar}
              alt={problem.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="line-clamp-1 max-w-[100px]">{problem.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

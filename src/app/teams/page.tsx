import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/molecules/card";
import { MOCK_PROBLEMS } from "@/lib/mock-data";

export default function TeamsPage() {
  const teams = MOCK_PROBLEMS.map((p) => {
    const total = p.requiredRoles.reduce((a, r) => a + r.count, 0);
    const filled = p.requiredRoles.reduce((a, r) => a + r.filled, 0);
    const openRoles = p.requiredRoles.filter((r) => r.count - r.filled > 0);
    return {
      id: p.id,
      name: p.title,
      domain: p.domain,
      stage: p.stage,
      lead: p.author.name,
      teamSize: filled,
      totalNeeded: total,
      openRoles,
      tagline: p.tagline,
    };
  }).filter((t) => t.teamSize > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground">
          Find a team to join or manage your existing teams.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const progress = (team.teamSize / team.totalNeeded) * 100;
          return (
            <Card key={team.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {team.domain}
                    </Badge>
                    <CardTitle className="line-clamp-1">{team.name}</CardTitle>
                  </div>
                  <Badge className="bg-muted text-foreground">
                    {team.stage}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {team.tagline}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> Team Size
                  </span>
                  <span>
                    {team.teamSize}/{team.totalNeeded} Members
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {team.openRoles.slice(0, 3).map((r, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">
                      {r.role} ({r.count - r.filled} open)
                    </Badge>
                  ))}
                  {team.openRoles.length > 3 && (
                    <Badge variant="secondary" className="text-[10px]">
                      +{team.openRoles.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 p-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Lead: {team.lead}
                  </span>
                  <Button size="sm" asChild>
                    <Link href={`/teams/${team.id}`}>View Team</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

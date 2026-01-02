"use client";

import { useEffect } from "react";
import { useProblemsStore } from "@/store/problems-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";

export default function NotificationsPage() {
  const { problems, joinRequests, init, acceptRequest, rejectRequest } =
    useProblemsStore();
  const { user } = useAuth();
  const { show } = useToast();

  useEffect(() => {
    init();
  }, [init]);

  const myProblemIds = new Set(
    problems
      .filter((p) => {
        const email = user?.email || "";
        return p.author.name.includes(email) || p.author.name === "You";
      })
      .map((p) => p.id)
  );

  const pending = joinRequests.filter(
    (r) => myProblemIds.has(r.problemId) && r.status === "pending"
  );

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Manage join requests for your proposed problems.
        </p>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-xl border p-6 text-center text-muted-foreground">
          No pending requests.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {pending.map((req) => {
            const problem = problems.find((p) => p.id === req.problemId);
            return (
              <Card key={req.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{problem?.title}</span>
                    <Badge variant="outline">Pending</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {req.user.name} ({req.user.email}) wants to join
                    {req.role ? ` as ${req.role}` : ""}.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        acceptRequest(req.id);
                        show("Request accepted.", "success");
                      }}>
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        rejectRequest(req.id);
                        show("Request rejected.", "success");
                      }}>
                      Reject
                    </Button>
                    <Button variant="ghost" asChild>
                      <Link href={`/discovery/${req.problemId}`}>
                        View Problem
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

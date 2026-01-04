"use client";

import { ProblemForm } from "@/components/organisms/problem-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function NewProblemPage() {
  const { user } = useAuth();
  return (
    <div className="px-4 min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="container mx-auto">
        {!user ? (
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Sign In Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                You need to be signed in to propose a problem and form a team.
              </p>
              <Button asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ProblemForm />
        )}
      </div>
    </div>
  );
}

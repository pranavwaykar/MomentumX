import Link from "next/link";
import { ArrowRight, Lightbulb, Users, Rocket } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-background to-muted/50">
        <div className="container max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Don't Just Discuss Ideas. <br />
            <span className="text-primary">Execute Them.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A problem-first collaboration platform where entrepreneurs, developers, and designers
            form committed teams to build real-world solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="w-full sm:w-auto text-base" asChild>
              <Link href="/problems/new">
                Propose a Problem <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base" asChild>
              <Link href="/discovery">
                Explore Problems
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We enforce structure to ensure ideas turn into action. No more endless brainstorming without execution.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-primary mb-2" />
                <CardTitle>1. Propose a Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit a real-world problem using our structured stepper. Define the domain, requirements, and vision.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>2. Form a Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Define roles and attract talent. The project only starts when the minimum team size is met.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Rocket className="h-10 w-10 text-primary mb-2" />
                <CardTitle>3. Execute & Build</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track progress from Draft to MVP using our lifecycle tools. Focus on shipping, not just talking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

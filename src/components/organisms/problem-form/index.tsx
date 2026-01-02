"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Stepper } from "@/components/molecules/stepper";
import { useProblemStore } from "@/store/problem-store";
import { BasicsStep } from "./basics-step";
import { DetailsStep } from "./details-step";
import { ReviewStep } from "./review-step";
import { TeamStep } from "./team-step";
import { useToast } from "@/components/toast-provider";
import { useProblemsStore } from "@/store/problems-store";
import { useAuth } from "@/components/auth-provider";
import { useProfileStore } from "@/store/profile-store";

export function ProblemForm() {
  const { currentStep, steps, nextStep, prevStep } = useProblemStore();
  const { formData, reset } = useProblemStore.getState();
  const { show } = useToast();
  const { addProblem } = useProblemsStore();
  const { user } = useAuth();
  const { photoUrl } = useProfileStore.getState();

  const isLastStep = currentStep === steps.length - 1;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicsStep />;
      case 1:
        return <DetailsStep />;
      case 2:
        return <TeamStep />;
      case 3:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Propose a Problem</h1>
        <p className="text-muted-foreground">
          Turn your observation into a project. Define the problem, not the
          solution.
        </p>
      </div>

      <Stepper
        steps={["Basics", "Details", "Team", "Review"]}
        currentStep={currentStep}
      />

      <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={
            isLastStep
              ? () => {
                  if (!user) {
                    show("Please sign in to submit a proposal.", "error");
                    return;
                  }
                  const problem = addProblem({
                    title: formData.title || "Untitled Problem",
                    tagline: formData.tagline || "",
                    description: formData.description || "",
                    domain: formData.domain || "General",
                    author: {
                      name: user.displayName || user.email || "You",
                      avatar: photoUrl ?? user.photoURL ?? undefined,
                      email: user.email || undefined,
                    },
                    requiredRoles: formData.roles.map((r) => ({
                      role: r.role,
                      count: r.count,
                      filled: 0,
                    })),
                  });
                  show?.("Proposal submitted successfully.", "success");
                  reset();
                }
              : nextStep
          }>
          {isLastStep ? (
            <>
              Submit Proposal <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

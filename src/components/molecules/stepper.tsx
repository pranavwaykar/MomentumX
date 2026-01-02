"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: string[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="relative flex w-full items-center justify-between">
      <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-muted" />
      <div
        className="absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500"
        style={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
        }}
      />
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={step} className="flex flex-col items-center gap-2 bg-background px-2">
            <motion.div
              initial={false}
              animate={{
                scale: isCurrent ? 1.1 : 1,
                backgroundColor: isCompleted || isCurrent ? "var(--primary)" : "var(--muted)",
                borderColor: isCompleted || isCurrent ? "var(--primary)" : "var(--muted)",
              }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-primary-foreground transition-colors duration-300",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </motion.div>
            <span
              className={cn(
                "text-xs font-medium uppercase tracking-wider transition-colors duration-300",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}

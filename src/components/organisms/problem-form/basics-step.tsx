"use client"

import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { useProblemStore } from "@/store/problem-store"

export function BasicsStep() {
  const { formData, updateFormData } = useProblemStore()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Problem Title</Label>
        <Input
          id="title"
          placeholder="e.g. Sustainable Food Delivery for Remote Areas"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Give your problem a clear, catchy title.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">One-Liner</Label>
        <Input
          id="tagline"
          placeholder="e.g. Connecting local farmers with remote communities."
          value={formData.tagline}
          onChange={(e) => updateFormData({ tagline: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Summarize the problem in one sentence.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">Domain / Industry</Label>
        <Input
          id="domain"
          placeholder="e.g. Logistics, FoodTech, Social Impact"
          value={formData.domain}
          onChange={(e) => updateFormData({ domain: e.target.value })}
        />
      </div>
    </div>
  )
}

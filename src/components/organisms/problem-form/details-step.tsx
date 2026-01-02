"use client"

import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { useProblemStore } from "@/store/problem-store"

export function DetailsStep() {
  const { formData, updateFormData } = useProblemStore()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the problem in detail. Who faces it? Why does it matter? What are the existing solutions and why do they fail?"
          className="min-h-[200px]"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">
          Be specific. The better you articulate the problem, the better the team you'll attract.
        </p>
      </div>
    </div>
  )
}

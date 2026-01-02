"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card"
import { useProblemStore } from "@/store/problem-store"

export function ReviewStep() {
  const { formData } = useProblemStore()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Review your Problem</h3>
        <p className="text-sm text-muted-foreground">
          Check everything before submitting. You can edit later, but a good first impression matters.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{formData.title || "Untitled Problem"}</CardTitle>
          <p className="text-sm text-muted-foreground">{formData.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">Domain</h4>
            <p className="text-sm">{formData.domain || "N/A"}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Description</h4>
            <p className="text-sm whitespace-pre-wrap">{formData.description || "No description provided."}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">Team Requirements</h4>
            <ul className="list-disc pl-5 text-sm">
              {formData.roles.map((role, index) => (
                <li key={index}>
                  {role.count}x {role.role || "Unspecified Role"}
                </li>
              ))}
            </ul>
            <p className="text-sm mt-2 text-muted-foreground">
              Min Team Size: {formData.minTeamSize}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

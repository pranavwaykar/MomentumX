"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { useProblemStore } from "@/store/problem-store"

export function TeamStep() {
  const { formData, updateFormData } = useProblemStore()

  const addRole = () => {
    updateFormData({
      roles: [...formData.roles, { role: "", count: 1 }],
    })
  }

  const removeRole = (index: number) => {
    const newRoles = [...formData.roles]
    newRoles.splice(index, 1)
    updateFormData({ roles: newRoles })
  }

  const updateRole = (index: number, field: "role" | "count", value: string | number) => {
    const newRoles = [...formData.roles]
    newRoles[index] = { ...newRoles[index], [field]: value }
    updateFormData({ roles: newRoles })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Required Roles</Label>
        <p className="text-sm text-muted-foreground">
          Define the team composition needed to solve this problem.
        </p>
      </div>

      <div className="space-y-4">
        {formData.roles.map((role, index) => (
          <div key={index} className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label>Role Name</Label>
              <Input
                value={role.role}
                onChange={(e) => updateRole(index, "role", e.target.value)}
                placeholder="e.g. Frontend Developer"
              />
            </div>
            <div className="w-24 space-y-2">
              <Label>Count</Label>
              <Input
                type="number"
                min={1}
                value={role.count}
                onChange={(e) => updateRole(index, "count", parseInt(e.target.value))}
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeRole(index)}
              disabled={formData.roles.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addRole} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Role
      </Button>

      <div className="space-y-2 pt-4">
        <Label htmlFor="minTeamSize">Minimum Team Size to Start</Label>
        <Input
          id="minTeamSize"
          type="number"
          min={2}
          value={formData.minTeamSize}
          onChange={(e) => updateFormData({ minTeamSize: parseInt(e.target.value) })}
        />
        <p className="text-sm text-muted-foreground">
          The project will only move to "Team Formed" state when this many members join.
        </p>
      </div>
    </div>
  )
}

"use client"

import { create } from "zustand";
import { MOCK_PROBLEMS, type Problem } from "@/lib/mock-data";

export type JoinStatus = "pending" | "accepted" | "rejected";
export interface JoinRequest {
  id: string;
  problemId: string;
  user: { name: string; email: string };
  role?: string;
  status: JoinStatus;
  createdAt: string;
}

interface ProblemsState {
  problems: Problem[];
  joinRequests: JoinRequest[];
  init: () => void;
  addProblem: (p: Omit<Problem, "id" | "likes" | "stage" | "createdAt">) => Problem;
  addJoinRequest: (problemId: string, user: { name: string; email: string }, role?: string) => JoinRequest;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  pendingCountForProblem: (problemId: string) => number;
}

const STORAGE_KEY = "momentumx_state_v1";

function save(state: Pick<ProblemsState, "problems" | "joinRequests">) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function load(): { problems: Problem[]; joinRequests: JoinRequest[] } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const useProblemsStore = create<ProblemsState>((set, get) => ({
  problems: [],
  joinRequests: [],
  init: () => {
    const existing = typeof window !== "undefined" ? load() : null;
    if (existing) {
      set({ problems: existing.problems, joinRequests: existing.joinRequests });
    } else {
      set({ problems: MOCK_PROBLEMS.slice(), joinRequests: [] });
      save({ problems: MOCK_PROBLEMS.slice(), joinRequests: [] });
    }
  },
  addProblem: (p) => {
    const id = String(Date.now());
    const problem: Problem = {
      ...p,
      id,
      likes: 0,
      stage: "Draft",
      createdAt: new Date().toISOString(),
    };
    const nextProblems = [problem, ...get().problems];
    set({ problems: nextProblems });
    save({ problems: nextProblems, joinRequests: get().joinRequests });
    return problem;
  },
  addJoinRequest: (problemId, user, role) => {
    const req: JoinRequest = {
      id: String(Date.now()),
      problemId,
      user,
      role,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const nextReqs = [req, ...get().joinRequests];
    set({ joinRequests: nextReqs });
    save({ problems: get().problems, joinRequests: nextReqs });
    return req;
  },
  acceptRequest: (requestId) => {
    const req = get().joinRequests.find((r) => r.id === requestId);
    if (!req) return;
    const nextReqs = get().joinRequests.map((r) =>
      r.id === requestId ? { ...r, status: "accepted" } : r
    );
    // Increment filled count for the first open role or matching role
    const problems = get().problems.map((p) => {
      if (p.id !== req.problemId) return p;
      const roles = p.requiredRoles.map((role) => {
        if (req.role && role.role !== req.role) return role;
        if (role.filled < role.count) {
          return { ...role, filled: role.filled + 1 };
        }
        return role;
      });
      return { ...p, requiredRoles: roles };
    });
    set({ problems, joinRequests: nextReqs });
    save({ problems, joinRequests: nextReqs });
  },
  rejectRequest: (requestId) => {
    const nextReqs = get().joinRequests.map((r) =>
      r.id === requestId ? { ...r, status: "rejected" } : r
    );
    set({ joinRequests: nextReqs });
    save({ problems: get().problems, joinRequests: nextReqs });
  },
  pendingCountForProblem: (problemId) =>
    get().joinRequests.filter((r) => r.problemId === problemId && r.status === "pending").length,
}));


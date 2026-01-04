"use client";

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

export type NotificationType =
  | "like"
  | "join_request"
  | "new_proposal"
  | "request_accepted"
  | "request_rejected";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  targetId?: string;
  isRead: boolean;
  createdAt: string;
}

interface ProblemsState {
  problems: Problem[];
  joinRequests: JoinRequest[];
  likedProblemIds: string[];
  notifications: Notification[];
  initialized: boolean;
  init: () => void;
  addProblem: (
    p: Omit<Problem, "id" | "likes" | "stage" | "createdAt">
  ) => Problem;
  addJoinRequest: (
    problemId: string,
    user: { name: string; email: string },
    role?: string
  ) => JoinRequest;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  pendingCountForProblem: (problemId: string) => number;
  toggleLike: (problemId: string) => void;
  addNotification: (
    n: Omit<Notification, "id" | "isRead" | "createdAt">
  ) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const STORAGE_KEY = "momentumx_state_v1";

function save(state: {
  problems: Problem[];
  joinRequests: JoinRequest[];
  likedProblemIds: string[];
  notifications: Notification[];
}) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function load(): {
  problems: Problem[];
  joinRequests: JoinRequest[];
  likedProblemIds?: string[];
  notifications?: Notification[];
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const useProblemsStore = create<ProblemsState>((set, get) => ({
  problems: MOCK_PROBLEMS.slice(),
  joinRequests: [],
  likedProblemIds: [],
  notifications: [],
  initialized: false,
  init: () => {
    if (get().initialized) return;
    const existing = load();
    if (existing) {
      // one-time avatar migration for Bob/Diana if old pravatar URLs are present
      const migratedProblems = existing.problems.map((p) => {
        if (
          p.author?.name === "Bob Smith" &&
          (p.author.avatar || "").includes("i.pravatar.cc")
        ) {
          return {
            ...p,
            author: {
              ...p.author,
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
          };
        }
        if (
          p.author?.name === "Diana Prince" &&
          (p.author.avatar || "").includes("i.pravatar.cc")
        ) {
          return {
            ...p,
            author: {
              ...p.author,
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
          };
        }
        return p;
      });
      set({
        problems: migratedProblems,
        joinRequests: existing.joinRequests,
        likedProblemIds: existing.likedProblemIds || [],
        notifications: existing.notifications || [],
        initialized: true,
      });
    } else {
      set({
        problems: MOCK_PROBLEMS.slice(),
        joinRequests: [],
        likedProblemIds: [],
        notifications: [],
        initialized: true,
      });
      save({
        problems: MOCK_PROBLEMS.slice(),
        joinRequests: [],
        likedProblemIds: [],
        notifications: [],
      });
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
    get().addNotification({
      type: "new_proposal",
      title: "New Proposal",
      message: `${problem.author.name} just proposed a new problem: ${problem.title}`,
      targetId: id,
    });
    save({
      problems: nextProblems,
      joinRequests: get().joinRequests,
      likedProblemIds: get().likedProblemIds,
      notifications: get().notifications,
    });
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
    const problem = get().problems.find((p) => p.id === problemId);
    if (problem) {
      get().addNotification({
        type: "join_request",
        title: "New Join Request",
        message: `${user.name} wants to join your team for: ${problem.title}${
          role ? ` as ${role}` : ""
        }`,
        targetId: problemId,
      });
    }
    save({
      problems: get().problems,
      joinRequests: nextReqs,
      likedProblemIds: get().likedProblemIds,
      notifications: get().notifications,
    });
    return req;
  },
  acceptRequest: (requestId) => {
    const req = get().joinRequests.find((r) => r.id === requestId);
    if (!req) return;
    const nextReqs: JoinRequest[] = get().joinRequests.map((r) =>
      r.id === requestId ? { ...r, status: "accepted" } : r
    );
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
    const problem = get().problems.find((p) => p.id === req.problemId);
    get().addNotification({
      type: "request_accepted",
      title: "Request Accepted",
      message: `Your request to join "${
        problem?.title || "a team"
      }" has been accepted!`,
      targetId: req.problemId,
    });
    save({
      problems,
      joinRequests: nextReqs,
      likedProblemIds: get().likedProblemIds,
      notifications: get().notifications,
    });
  },
  rejectRequest: (requestId) => {
    const req = get().joinRequests.find((r) => r.id === requestId);
    const nextReqs: JoinRequest[] = get().joinRequests.map((r) =>
      r.id === requestId ? { ...r, status: "rejected" } : r
    );
    set({ joinRequests: nextReqs });
    if (req) {
      const problem = get().problems.find((p) => p.id === req.problemId);
      get().addNotification({
        type: "request_rejected",
        title: "Request Rejected",
        message: `Your request to join "${
          problem?.title || "a team"
        }" was not accepted at this time.`,
        targetId: req.problemId,
      });
    }
    save({
      problems: get().problems,
      joinRequests: nextReqs,
      likedProblemIds: get().likedProblemIds,
      notifications: get().notifications,
    });
  },
  pendingCountForProblem: (problemId) =>
    get().joinRequests.filter(
      (r) => r.problemId === problemId && r.status === "pending"
    ).length,
  toggleLike: (problemId) => {
    const { likedProblemIds, problems } = get();
    const isCurrentlyLiked = likedProblemIds.includes(problemId);

    const nextLikedIds = isCurrentlyLiked
      ? likedProblemIds.filter((id) => id !== problemId)
      : [...likedProblemIds, problemId];

    const nextProblems = problems.map((p) => {
      if (p.id === problemId) {
        return {
          ...p,
          likes: isCurrentlyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
        };
      }
      return p;
    });

    set({ likedProblemIds: nextLikedIds, problems: nextProblems });

    if (!isCurrentlyLiked) {
      const problem = problems.find((p) => p.id === problemId);
      if (problem) {
        get().addNotification({
          type: "like",
          title: "New Like",
          message: `Someone liked your proposal: ${problem.title}`,
          targetId: problemId,
        });
      }
    }

    save({
      problems: nextProblems,
      joinRequests: get().joinRequests,
      likedProblemIds: nextLikedIds,
      notifications: get().notifications,
    });
  },
  addNotification: (n) => {
    const notification: Notification = {
      ...n,
      id: crypto.randomUUID(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    const nextNotifications = [notification, ...get().notifications];
    set({ notifications: nextNotifications });
    save({
      problems: get().problems,
      joinRequests: get().joinRequests,
      likedProblemIds: get().likedProblemIds,
      notifications: nextNotifications,
    });
  },
  markNotificationAsRead: (id) => {
    const nextNotifications = get().notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    set({ notifications: nextNotifications });
    save({
      problems: get().problems,
      joinRequests: get().joinRequests,
      likedProblemIds: get().likedProblemIds,
      notifications: nextNotifications,
    });
  },
  clearNotifications: () => {
    set({ notifications: [] });
    save({
      problems: get().problems,
      joinRequests: get().joinRequests,
      likedProblemIds: get().likedProblemIds,
      notifications: [],
    });
  },
}));

"use client";

import { create } from "zustand";
import { useAuth } from "@/components/auth-provider";

interface ProfileState {
  name?: string;
  email?: string;
  headline?: string;
  photoUrl?: string;
  setProfile: (
    p: Partial<Pick<ProfileState, "name" | "email" | "headline" | "photoUrl">>
  ) => void;
  setPhotoUrl: (url?: string) => void;
  init: () => void;
}

const KEY = "momentumx_profile";

export const useProfileStore = create<ProfileState>((set) => ({
  name: undefined,
  email: undefined,
  headline: undefined,
  photoUrl: undefined,
  setProfile: (p) => {
    set(p);
    try {
      const current = JSON.parse(localStorage.getItem(KEY) || "{}");
      localStorage.setItem(KEY, JSON.stringify({ ...current, ...p }));
    } catch {}
  },
  setPhotoUrl: (url) => {
    set({ photoUrl: url });
    try {
      const current = JSON.parse(localStorage.getItem(KEY) || "{}");
      localStorage.setItem(KEY, JSON.stringify({ ...current, photoUrl: url }));
    } catch {}
  },
  init: () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set(parsed);
      }
    } catch {}
  },
}));

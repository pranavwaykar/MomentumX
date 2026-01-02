"use client"

import { create } from "zustand";

interface ProfileState {
  photoUrl?: string;
  setPhotoUrl: (url?: string) => void;
  init: () => void;
}

const KEY = "momentumx_profile";

export const useProfileStore = create<ProfileState>((set) => ({
  photoUrl: undefined,
  setPhotoUrl: (url) => {
    set({ photoUrl: url });
    try {
      localStorage.setItem(KEY, JSON.stringify({ photoUrl: url }));
    } catch {}
  },
  init: () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        set({ photoUrl: parsed.photoUrl });
      }
    } catch {}
  },
}));

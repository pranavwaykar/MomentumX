import { create } from 'zustand'

export type ProblemStep = 'basics' | 'details' | 'team' | 'review';

export interface ProblemState {
  currentStep: number;
  steps: ProblemStep[];
  formData: {
    title: string;
    tagline: string;
    description: string;
    domain: string;
    skills: string[];
    minTeamSize: number;
    roles: { role: string; count: number }[];
  };
  setStep: (step: number) => void;
  updateFormData: (data: Partial<ProblemState['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useProblemStore = create<ProblemState>((set) => ({
  currentStep: 0,
  steps: ['basics', 'details', 'team', 'review'],
  formData: {
    title: '',
    tagline: '',
    description: '',
    domain: '',
    skills: [],
    minTeamSize: 2,
    roles: [{ role: 'Developer', count: 1 }],
  },
  setStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.steps.length - 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  reset: () =>
    set({
      currentStep: 0,
      formData: {
        title: '',
        tagline: '',
        description: '',
        domain: '',
        skills: [],
        minTeamSize: 2,
        roles: [{ role: 'Developer', count: 1 }],
      },
    }),
}))

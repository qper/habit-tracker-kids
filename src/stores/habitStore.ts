import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings } from '../types';

interface HabitStore {
  settings: Partial<UserSettings>;
  setSettings: (settings: Partial<UserSettings>) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      settings: {
        childName: 'Ребенок',
        theme: 'system',
        accentColor: '#FF6B6B',
      },
      setSettings: (settings) => set({ settings }),
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'habit-store',
    },
  ),
);

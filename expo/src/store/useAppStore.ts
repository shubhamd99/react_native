import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  username: string;
  setUsername: (name: string) => void;
  visitCount: number;
  incrementVisits: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      username: 'Expo User',
      setUsername: (name) => set({ username: name }),
      visitCount: 0,
      incrementVisits: () => set((state) => ({ visitCount: state.visitCount + 1 })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

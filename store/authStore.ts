import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  isCompanion: boolean;
  wallet: number;
}

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (patch: Partial<AuthUser>) => void;
}

// 默认头像池
const AVATARS = [
  "https://picsum.photos/seed/user1/300/300",
  "https://picsum.photos/seed/user2/300/300",
  "https://picsum.photos/seed/user3/300/300",
  "https://picsum.photos/seed/user4/300/300",
];

export function randomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      updateUser: (patch) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...patch } } : {}
        ),
    }),
    {
      name: "pool-mate-auth", // localStorage key
    }
  )
);

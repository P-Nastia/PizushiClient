import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem("jwt");
        set({ user: null });
    },
}));
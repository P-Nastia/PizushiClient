import { create } from "zustand";
import {useCartStore} from "./cartStore";

export const useAuthStore = create((set) => ({
    user: null,
    setUser: async (user) => {
        set ({ user,isAuthenticated: !!user })
        await useCartStore.getState().mergeLocalCartToServer();
    },
    logout: async () => {
        localStorage.removeItem("jwt");
        set({ user: null,isAuthenticated: false });
        await useCartStore.getState().clearCart();
    },
}));
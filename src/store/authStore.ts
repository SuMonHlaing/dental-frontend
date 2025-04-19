import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null, token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user, token) => set({ user, token, isAuthenticated: !!user }),

      login: async (email: string, password: string) => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.access_token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Registration error:", error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // Key for localStorage
    }
  )
);

export default useAuthStore;

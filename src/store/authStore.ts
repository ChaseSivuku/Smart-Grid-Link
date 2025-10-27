import { create } from "zustand"
import type { User } from "@/types"
import { authService } from "@/services/authService"

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: "producer" | "consumer") => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<Pick<User, 'address' | 'isSystemOffline'>>) => Promise<void>
  initialize: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: () => {
    const user = authService.getCurrentUser()
    set({ user, isAuthenticated: !!user })
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const user = await authService.login(email, password)
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      })
      throw error
    }
  },

  signup: async (email: string, password: string, name: string, role: "producer" | "consumer") => {
    set({ isLoading: true, error: null })
    try {
      const user = await authService.signup(email, password, name, role)
      set({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Signup failed",
        isLoading: false,
      })
      throw error
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await authService.logout()
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
    }
  },

  updateProfile: async (updates) => {
    set({ isLoading: true, error: null })
    try {
      const updatedUser = await authService.updateProfile(updates)
      set({ user: updatedUser, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Profile update failed",
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserRole = 'user' | 'provider' | 'business' | 'admin'

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  isVerified: boolean
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
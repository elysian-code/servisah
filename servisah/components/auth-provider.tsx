"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useRealtime } from "@/hooks/use-realtime"
import type { User, UserRole } from "@/lib/types"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  userRole: UserRole | null
  verifyEmail: (token: string) => Promise<void>
  resendVerification: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading, setUser, setLoading } = useAuthStore()

  // Initialize real-time notifications when authenticated
  useRealtime()

  // Protect routes based on authentication and role
  useEffect(() => {
    if (!isLoading) {
      const protectedRoutes = ["/dashboard", "/bookings", "/messages", "/wallet"]
      const authRoutes = ["/login", "/register"]
      const roleSpecificRoutes = {
        provider: ["/dashboard/provider"],
        business: ["/dashboard/business"],
        admin: ["/dashboard/admin"],
      }

      const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route))
      const isAuthRoute = authRoutes.some((route) => pathname === route)
      
      if (isProtectedRoute && !user) {
        router.push("/login")
      } else if (isAuthRoute && user) {
        router.push(`/dashboard/${user.role.toLowerCase()}`)
      } else if (user) {
        // Check role-specific route access
        const currentRole = user.role.toLowerCase() as keyof typeof roleSpecificRoutes
        const allowedRoutes = roleSpecificRoutes[currentRole] || []
        const isAllowedRoute = allowedRoutes.some(route => pathname?.startsWith(route))
        
        if (pathname?.startsWith('/dashboard/') && !isAllowedRoute) {
          router.push(`/dashboard/${currentRole}`)
        }
      }
    }
  }, [isLoading, user, pathname, router])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with real API integration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email,
        role: email.includes("provider")
          ? "provider"
          : email.includes("business")
            ? "business"
            : email.includes("admin")
              ? "admin"
              : "user",
        isVerified: true,
      }

      setUser(mockUser)
      router.push(`/dashboard/${mockUser.role}`)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Partial<User>, password: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with real API integration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name || "New User",
        email: userData.email || "",
        role: userData.role || "user",
        isVerified: false,
      }

      setUser(newUser)
      router.push(`/onboarding/${newUser.role}`)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const verifyEmail = async (token: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with real API integration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (user) {
        setUser({ ...user, isVerified: true })
      }
    } catch (error) {
      console.error("Email verification failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resendVerification = async () => {
    if (!user?.email) throw new Error("No email address found")
    // Mock API call - replace with real API integration
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    try {
      // Mock API call - replace with real API integration
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Password reset failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    setLoading(true)
    try {
      // Mock API call - replace with real API integration
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (user) {
        setUser({ ...user, ...data })
      }
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    useAuthStore.getState().logout()
    router.push("/")
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    userRole: user?.role || null,
    verifyEmail,
    resendVerification,
    resetPassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

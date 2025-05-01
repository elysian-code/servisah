import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserPreferences {
  language: string
  currency: string
  theme: 'light' | 'dark' | 'system'
  notificationPreferences: {
    email: boolean
    push: boolean
    sms: boolean
  }
  locationSharing: boolean
}

interface PreferencesState {
  preferences: UserPreferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  resetPreferences: () => void
}

const defaultPreferences: UserPreferences = {
  language: 'en',
  currency: 'USD',
  theme: 'system',
  notificationPreferences: {
    email: true,
    push: true,
    sms: false,
  },
  locationSharing: false,
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      resetPreferences: () => set({ preferences: defaultPreferences }),
    }),
    {
      name: 'user-preferences',
    }
  )
)
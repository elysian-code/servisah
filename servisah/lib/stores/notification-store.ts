import { create } from "zustand"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  isRead: boolean
  link?: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(7)
    set((state) => ({
      notifications: [
        {
          ...notification,
          id,
          timestamp: new Date().toISOString(),
          isRead: false,
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    }))
  },
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: state.unreadCount - 1,
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.notifications.find((n) => n.id === id)?.isRead
        ? state.unreadCount
        : state.unreadCount - 1,
    })),
  clearAll: () =>
    set({
      notifications: [],
      unreadCount: 0,
    }),
}))
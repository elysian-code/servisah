"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useNotificationStore } from "@/lib/stores/notification-store"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { notifications, markAsRead } = useNotificationStore()

  useEffect(() => {
    // Check if any notifications have links matching the current path
    // and mark them as read
    notifications.forEach((notification) => {
      if (notification.link && !notification.isRead) {
        const notificationPath = notification.link.split("?")[0]
        if (pathname === notificationPath) {
          markAsRead(notification.id)
        }
      }
    })
  }, [pathname, searchParams, notifications, markAsRead])

  return null
}

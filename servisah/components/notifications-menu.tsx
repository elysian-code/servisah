"use client"

import { useRouter } from "next/navigation"
import {
  Bell,
  Check,
  Trash2,
  Info,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotificationStore, Notification } from "@/lib/stores/notification-store"
import { cn } from "@/lib/utils"

const notificationIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const notificationColors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
}

export default function NotificationsMenu() {
  const router = useRouter()
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotificationStore()

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.link) {
      router.push(notification.link)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground"
                onClick={() => markAllAsRead()}
              >
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground"
                onClick={() => clearAll()}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <ScrollArea className="h-[calc(var(--radix-dropdown-menu-content-available-height)-60px)]">
            <DropdownMenuGroup>
              {notifications.map((notification) => {
                const Icon = notificationIcons[notification.type]
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-3 cursor-pointer",
                      !notification.isRead && "bg-muted/50"
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 mt-0.5 flex-shrink-0",
                        notificationColors[notification.type]
                      )}
                    />
                    <div className="space-y-1">
                      <p className="font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto -mr-2 flex-shrink-0 opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
          </ScrollArea>
        ) : (
          <div className="text-center p-4 text-sm text-muted-foreground">
            No notifications to display
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
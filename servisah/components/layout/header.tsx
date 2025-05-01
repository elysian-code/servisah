"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import NotificationsMenu from "@/components/notifications-menu"
import { useNotificationStore } from "@/lib/stores/notification-store"
import { LogIn, LogOut, Settings, User, Bell } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { addNotification } = useNotificationStore()

  // Add some sample notifications for testing
  const addSampleNotifications = () => {
    addNotification({
      title: "New Message",
      message: "You have a new message from Alice Smith regarding your house cleaning appointment.",
      type: "info",
      link: "/messages",
    })
    addNotification({
      title: "Booking Confirmed",
      message: "Your plumbing service appointment has been confirmed for tomorrow at 2 PM.",
      type: "success",
      link: "/dashboard/user",
    })
    addNotification({
      title: "Payment Required",
      message: "Please complete the payment for your recent gardening service.",
      type: "warning",
      link: "/dashboard/user",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 font-bold">
          Servisah
        </Link>

        <nav className="flex items-center space-x-6 ml-6">
          <Link
            href="/search"
            className={pathname === "/search" ? "text-foreground" : "text-muted-foreground"}
          >
            Find Services
          </Link>
          <Link
            href="/onboarding/provider"
            className={pathname.startsWith("/onboarding") ? "text-foreground" : "text-muted-foreground"}
          >
            Become a Provider
          </Link>
        </nav>

        <div className="flex items-center ml-auto space-x-2">
          {user ? (
            <>
              <NotificationsMenu />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name?.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/user" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages" className="flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

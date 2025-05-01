"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  MessageCircle,
  ThumbsUp,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

// Mock data - replace with API calls
const mockUpcomingBookings = [
  {
    id: "1",
    service: "House Cleaning",
    provider: {
      name: "Alice Smith",
      image: "/providers/alice.jpg",
      rating: 4.8,
    },
    date: "2025-05-10T10:00:00",
    duration: 3,
    price: 120,
    status: "confirmed",
    location: "123 Main St, New York, NY",
  },
  {
    id: "2",
    service: "Plumbing Repair",
    provider: {
      name: "Bob Johnson",
      image: "/providers/bob.jpg",
      rating: 4.9,
    },
    date: "2025-05-15T14:00:00",
    duration: 2,
    price: 180,
    status: "pending",
    location: "456 Park Ave, New York, NY",
  },
]

const mockServiceHistory = [
  {
    id: "3",
    service: "House Cleaning",
    provider: {
      name: "Emma Wilson",
      image: "/providers/emma.jpg",
      rating: 4.7,
    },
    date: "2025-04-20T09:00:00",
    duration: 4,
    price: 160,
    status: "completed",
    rating: 5,
    review: "Excellent service! Very thorough and professional.",
  },
  {
    id: "4",
    service: "Gardening",
    provider: {
      name: "David Brown",
      image: "/providers/david.jpg",
      rating: 4.6,
    },
    date: "2025-04-15T13:00:00",
    duration: 3,
    price: 135,
    status: "completed",
    rating: 4,
    review: "Good work, would recommend.",
  },
]

const statuses = {
  confirmed: "bg-green-500/10 text-green-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  completed: "bg-blue-500/10 text-blue-500",
  cancelled: "bg-red-500/10 text-red-500",
}

export default function UserDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">
          Manage your bookings and view your service history
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Booked</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              8 upcoming bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              Average rating given
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="history">Service History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockUpcomingBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={booking.provider.image}
                      alt={booking.provider.name}
                    />
                    <AvatarFallback>
                      {booking.provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{booking.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {booking.provider.name}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "uppercase",
                          statuses[booking.status as keyof typeof statuses]
                        )}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(booking.date).toLocaleDateString()} at{" "}
                          {new Date(booking.date).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.duration} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${booking.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    {booking.status === "pending" && (
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {mockServiceHistory.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={service.provider.image}
                      alt={service.provider.name}
                    />
                    <AvatarFallback>
                      {service.provider.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{service.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {service.provider.name}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "uppercase",
                          statuses[service.status as keyof typeof statuses]
                        )}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(service.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${service.price}</span>
                      </div>
                    </div>
                    {service.review && (
                      <div className="rounded-lg bg-muted p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < service.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            Your Review
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {service.review}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Book Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

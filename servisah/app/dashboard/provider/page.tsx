"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MessageCircle,
  Star,
  ThumbsUp,
  Users,
  Activity,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

// Mock data - replace with API calls
const mockStats = {
  totalEarnings: 2450,
  completedJobs: 18,
  activeBookings: 5,
  rating: 4.8,
}

const mockBookings = [
  {
    id: "1",
    service: "House Cleaning",
    customer: {
      name: "Emily Brown",
      image: "/customers/emily.jpg",
      rating: 4.9,
    },
    date: "2025-05-10T10:00:00",
    duration: 3,
    price: 120,
    status: "pending",
    location: "123 Main St, New York, NY",
  },
  {
    id: "2",
    service: "Deep Cleaning",
    customer: {
      name: "Michael Wilson",
      image: "/customers/michael.jpg",
      rating: 4.7,
    },
    date: "2025-05-12T14:00:00",
    duration: 4,
    price: 160,
    status: "confirmed",
    location: "456 Park Ave, New York, NY",
  },
]

const mockCompletedJobs = [
  {
    id: "3",
    service: "House Cleaning",
    customer: {
      name: "Sarah Johnson",
      image: "/customers/sarah.jpg",
      rating: 4.8,
    },
    date: "2025-04-20T09:00:00",
    duration: 3,
    price: 120,
    status: "completed",
    rating: 5,
    review: "Excellent service! Very professional and thorough.",
  },
  {
    id: "4",
    service: "Office Cleaning",
    customer: {
      name: "David Lee",
      image: "/customers/david.jpg",
      rating: 4.6,
    },
    date: "2025-04-18T13:00:00",
    duration: 4,
    price: 180,
    status: "completed",
    rating: 4,
    review: "Good service, but arrived a bit late.",
  },
]

const statuses = {
  pending: "bg-yellow-500/10 text-yellow-500",
  confirmed: "bg-green-500/10 text-green-500",
  completed: "bg-blue-500/10 text-blue-500",
  cancelled: "bg-red-500/10 text-red-500",
}

export default function ProviderDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("upcoming")

  const handleMessageCustomer = (customerId: string) => {
    router.push("/messages")
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your bookings and track your earnings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalEarnings}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.completedJobs}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeBookings}</div>
            <p className="text-xs text-muted-foreground">
              {mockStats.activeBookings} jobs scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.rating}</div>
            <p className="text-xs text-muted-foreground">
              Based on {mockStats.completedJobs} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {mockBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={booking.customer.image}
                      alt={booking.customer.name}
                    />
                    <AvatarFallback>
                      {booking.customer.name
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
                          Customer: {booking.customer.name}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMessageCustomer(booking.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    {booking.status === "pending" && (
                      <>
                        <Button variant="default" size="sm">
                          Accept
                        </Button>
                        <Button variant="destructive" size="sm">
                          Decline
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {mockCompletedJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={job.customer.image}
                      alt={job.customer.name}
                    />
                    <AvatarFallback>
                      {job.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{job.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          Customer: {job.customer.name}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          "uppercase",
                          statuses[job.status as keyof typeof statuses]
                        )}
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(job.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.duration} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${job.price}</span>
                      </div>
                    </div>
                    {job.review && (
                      <div className="rounded-lg bg-muted p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < job.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            Customer Review
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {job.review}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMessageCustomer(job.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  BarChart,
  ArrowUp,
  Settings,
  UserPlus,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"

// Mock data for team members
const teamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Cleaner",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "ACTIVE",
    bookings: 12,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Cleaner",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "ACTIVE",
    bookings: 8,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Team Lead",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "ACTIVE",
    bookings: 15,
    rating: 4.9,
  },
]

// Mock data for bookings
const upcomingBookings = [
  {
    id: "1",
    service: "Office Cleaning",
    customer: {
      name: "Acme Corp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: "Sarah Johnson",
    date: "2023-05-25",
    time: "10:00 AM - 12:00 PM",
    location: "123 Business Ave, Anytown",
    price: 120,
    status: "CONFIRMED",
  },
  {
    id: "2",
    service: "Deep Office Cleaning",
    customer: {
      name: "TechStart Inc",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: "Michael Chen",
    date: "2023-05-26",
    time: "2:00 PM - 5:00 PM",
    location: "456 Innovation Blvd, Anytown",
    price: 200,
    status: "PENDING",
  },
  {
    id: "3",
    service: "Regular Maintenance",
    customer: {
      name: "Global Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: "Emily Rodriguez",
    date: "2023-05-27",
    time: "9:00 AM - 11:00 AM",
    location: "789 Enterprise St, Anytown",
    price: 100,
    status: "CONFIRMED",
  },
]

// Mock data for business stats
const businessStats = {
  revenue: {
    today: 420,
    week: 2800,
    month: 12000,
    growth: 15,
  },
  bookings: {
    total: 45,
    completed: 32,
    upcoming: 13,
    growth: 8,
  },
  team: {
    total: 5,
    active: 3,
    utilization: 85,
  },
  services: {
    total: 8,
    popular: "Office Cleaning",
    averageRating: 4.8,
  },
}

export default function BusinessDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [isBusinessOpen, setIsBusinessOpen] = useState(true)

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Dashboard</h1>
          <p className="text-muted-foreground">Manage your team, services, and bookings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="business-status" checked={isBusinessOpen} onCheckedChange={setIsBusinessOpen} />
            <Label htmlFor="business-status" className="font-medium">
              {isBusinessOpen ? "Open for Bookings" : "Closed"}
            </Label>
          </div>
          <Button asChild>
            <Link href="/team/invite">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Team Member
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${businessStats.revenue.month}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                {businessStats.revenue.growth}% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessStats.team.utilization}%</div>
            <Progress value={businessStats.team.utilization} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {businessStats.team.active} of {businessStats.team.total} team members active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessStats.bookings.upcoming}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                {businessStats.bookings.growth}% from last week
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {businessStats.services.averageRating}
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 ml-1" />
            </div>
            <p className="text-xs text-muted-foreground">Across all services and team members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Manage your scheduled services and team assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                    <div className="sm:w-16 flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1">
                      <div className="text-sm font-medium">
                        {new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                      <div className="text-xs text-muted-foreground">{booking.time.split(" - ")[0]}</div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-semibold">{booking.service}</h4>
                          <div className="flex items-center mt-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={booking.customer.avatar || "/placeholder.svg"}
                                alt={booking.customer.name}
                              />
                              <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{booking.customer.name}</span>
                          </div>
                        </div>
                        <Badge variant={booking.status === "CONFIRMED" ? "default" : "outline"}>
                          {booking.status === "CONFIRMED" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Assigned: {booking.assignedTo}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>${booking.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                      {booking.status === "PENDING" ? (
                        <>
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" asChild className="flex-1">
                          <Link href={`/bookings/${booking.id}`}>View Details</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/bookings">View All Bookings</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/team">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/services/business">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Manage Services
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/calendar/business">
                  <Calendar className="mr-2 h-4 w-4" />
                  Team Schedule
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/reports">
                  <BarChart className="mr-2 h-4 w-4" />
                  Business Reports
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/settings/business">
                  <Settings className="mr-2 h-4 w-4" />
                  Business Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-muted-foreground mr-3">{member.role}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-xs">{member.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={member.status === "ACTIVE" ? "default" : "outline"} className="mr-2">
                        {member.status === "ACTIVE" ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/team/${member.id}`}>
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Manage team member</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/team/invite">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Business performance chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Office Cleaning", bookings: 24, revenue: 2880 },
                { name: "Deep Cleaning", bookings: 18, revenue: 3600 },
                { name: "Window Cleaning", bookings: 12, revenue: 1440 },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <span>{service.bookings} bookings</span>
                      <span className="mx-2">•</span>
                      <span>${service.revenue} revenue</span>
                    </div>
                  </div>
                  <Progress value={service.bookings * 3} className="w-16 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/services/business">Manage Services</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

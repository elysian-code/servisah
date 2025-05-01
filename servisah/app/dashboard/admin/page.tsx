"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Briefcase,
  Tag,
  DollarSign,
  Ban,
  CheckCircle,
  Shield,
  AlertTriangle,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data - replace with API calls
const mockStats = {
  totalUsers: 1250,
  totalProviders: 380,
  totalServices: 42,
  totalRevenue: 45680,
  pendingVerifications: 15,
  reportedUsers: 8,
}

const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinDate: "2025-01-15",
    lastActive: "2025-05-01",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "provider",
    status: "pending",
    joinDate: "2025-04-28",
    lastActive: "2025-04-30",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "provider",
    status: "suspended",
    joinDate: "2024-12-10",
    lastActive: "2025-04-15",
  },
]

const mockCategories = [
  {
    id: "1",
    name: "House Cleaning",
    providers: 45,
    activeListings: 38,
    averagePrice: 85,
  },
  {
    id: "2",
    name: "Plumbing",
    providers: 28,
    activeListings: 25,
    averagePrice: 120,
  },
  {
    id: "3",
    name: "Electrical",
    providers: 32,
    activeListings: 30,
    averagePrice: 95,
  },
]

const userStatuses = {
  active: "bg-green-500/10 text-green-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  suspended: "bg-red-500/10 text-red-500",
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users, services, and platform settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-muted-foreground">
                {mockStats.totalProviders} Service Providers
              </span>
              <span className="text-xs text-muted-foreground">
                {mockStats.totalUsers - mockStats.totalProviders} Customers
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalServices}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Platform earnings to date
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="destructive" size="sm" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>
              {mockStats.reportedUsers} Reported Users
            </span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Shield className="h-4 w-4" />
            <span>
              {mockStats.pendingVerifications} Pending Verifications
            </span>
          </Button>
        </div>
        <Button>Add New Category</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="categories">Service Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${user.email}`}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            userStatuses[user.status as keyof typeof userStatuses]
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.status === "pending" ? (
                            <Button size="sm" variant="default">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify
                            </Button>
                          ) : user.status === "active" ? (
                            <Button size="sm" variant="destructive">
                              <Ban className="h-4 w-4 mr-1" />
                              Suspend
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Reactivate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Service Providers</TableHead>
                    <TableHead>Active Listings</TableHead>
                    <TableHead>Average Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{category.providers}</TableCell>
                      <TableCell>{category.activeListings}</TableCell>
                      <TableCell>${category.averagePrice}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

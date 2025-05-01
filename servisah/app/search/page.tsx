"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, MapPin, DollarSign, Filter, List } from "lucide-react"
import { cn } from "@/lib/utils"
import MapView from "@/components/map-view"
import ServiceDetailsModal from "@/components/service-details-modal"

// Mock data - replace with API call
const mockServices = [
  {
    id: "1",
    title: "Professional House Cleaning",
    provider: {
      name: "Alice Smith",
      rating: 4.8,
      totalReviews: 156,
      image: "/providers/alice.jpg",
    },
    pricePerHour: 30,
    category: "Cleaning",
    location: "Downtown",
    availability: ["Mon", "Wed", "Fri"],
    distance: 2.4,
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: "2",
    title: "Expert Plumbing Services",
    provider: {
      name: "Bob Johnson",
      rating: 4.9,
      totalReviews: 203,
      image: "/providers/bob.jpg",
    },
    pricePerHour: 45,
    category: "Plumbing",
    location: "Westside",
    availability: ["Mon", "Tue", "Thu", "Sat"],
    distance: 3.1,
    coordinates: {
      lat: 40.7148,
      lng: -73.996,
    },
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 100])
  const [distance, setDistance] = useState(10)
  const [instantBook, setInstantBook] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [view, setView] = useState<"list" | "map">("list")
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null)

  const categories = [
    "Cleaning",
    "Plumbing",
    "Electrical",
    "Moving",
    "Gardening",
    "Tutoring",
  ]

  const mapLocations = mockServices.map((service) => ({
    id: service.id,
    lat: service.coordinates.lat,
    lng: service.coordinates.lng,
    title: service.title,
    price: service.pricePerHour,
  }))

  return (
    <div className="container py-10">
      <div className="grid lg:grid-cols-[300px,1fr] gap-8">
        {/* Filters */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={5}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0]}/hr</span>
                      <span>${priceRange[1]}/hr</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Distance</h3>
                  <div className="space-y-4">
                    <Slider
                      value={[distance]}
                      onValueChange={([value]) => setDistance(value)}
                      max={50}
                      step={1}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>Within {distance} miles</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category,
                              ])
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter((c) => c !== category)
                              )
                            }
                          }}
                        />
                        <Label htmlFor={category}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Instant Book</Label>
                      <div className="text-sm text-muted-foreground">
                        Book without waiting for provider approval
                      </div>
                    </div>
                    <Switch
                      checked={instantBook}
                      onCheckedChange={setInstantBook}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Services in Your Area
              </h2>
              <p className="text-muted-foreground">
                {mockServices.length} services found
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex rounded-lg border p-1">
                <Button
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={view === "map" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView("map")}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Map
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Sort by
              </Button>
            </div>
          </div>

          {view === "list" ? (
            <div className="grid gap-6">
              {mockServices.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span>
                              {service.provider.rating} ({service.provider.totalReviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{service.distance} miles away</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${service.pricePerHour}/hour</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.availability.map((day) => (
                            <span
                              key={day}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button onClick={(e) => {
                        e.stopPropagation()
                        setSelectedService(service)
                      }}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <MapView
              locations={mapLocations}
              onMarkerClick={(location) => {
                const service = mockServices.find((s) => s.id === location.id)
                if (service) {
                  setSelectedService(service)
                }
              }}
            />
          )}
        </div>
      </div>

      <ServiceDetailsModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  )
}
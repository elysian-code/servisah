"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wrench,
  Home,
  Paintbrush,
  Car,
  Sprout,
  Truck,
  GraduationCap,
  Scissors,
} from "lucide-react"

const categories = [
  {
    title: "Home Repair",
    icon: Wrench,
    description: "Plumbing, electrical, and general repairs",
    color: "bg-blue-500/10",
    count: 450,
  },
  {
    title: "Cleaning",
    icon: Home,
    description: "House cleaning and organization",
    color: "bg-green-500/10",
    count: 320,
  },
  {
    title: "Painting",
    icon: Paintbrush,
    description: "Interior and exterior painting",
    color: "bg-yellow-500/10",
    count: 180,
  },
  {
    title: "Auto Services",
    icon: Car,
    description: "Car repair and maintenance",
    color: "bg-red-500/10",
    count: 230,
  },
  {
    title: "Gardening",
    icon: Sprout,
    description: "Landscaping and garden maintenance",
    color: "bg-emerald-500/10",
    count: 150,
  },
  {
    title: "Moving",
    icon: Truck,
    description: "Moving and delivery services",
    color: "bg-purple-500/10",
    count: 190,
  },
  {
    title: "Tutoring",
    icon: GraduationCap,
    description: "Academic and skill tutoring",
    color: "bg-pink-500/10",
    count: 280,
  },
  {
    title: "Beauty & Wellness",
    icon: Scissors,
    description: "Hair, makeup, and wellness services",
    color: "bg-orange-500/10",
    count: 340,
  },
]

export default function CategoryShowcase() {
  const router = useRouter()

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Discover Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our wide range of professional services. From home repairs
            to personal care, find exactly what you need.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group cursor-pointer transition-all hover:shadow-lg"
              onClick={() => router.push(`/search?category=${category.title}`)}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category.count}+ providers
                  </span>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" onClick={() => router.push("/search")}>
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  )
}

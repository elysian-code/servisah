"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Clock,
  Wallet,
  Star,
  CheckCircle,
  Award,
} from "lucide-react"

const features = [
  {
    title: "Verified Professionals",
    description: "Every service provider is thoroughly vetted and background checked",
    icon: Shield,
    color: "text-blue-500",
  },
  {
    title: "Book Instantly",
    description: "Schedule services with real-time availability and instant confirmation",
    icon: Clock,
    color: "text-green-500",
  },
  {
    title: "Secure Payments",
    description: "Payment is released only after your service is completed",
    icon: Wallet,
    color: "text-yellow-500",
  },
  {
    title: "Quality Guaranteed",
    description: "Satisfaction guaranteed or your money back",
    icon: Star,
    color: "text-purple-500",
  },
  {
    title: "Insurance Coverage",
    description: "All services are backed by comprehensive insurance",
    icon: CheckCircle,
    color: "text-red-500",
  },
  {
    title: "Top-Rated Providers",
    description: "Work with the best professionals in your area",
    icon: Award,
    color: "text-emerald-500",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make finding and booking services simple, secure, and satisfactory.
            Here's what sets us apart.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-br from-muted/50 via-transparent to-transparent"
                aria-hidden="true"
              />
              <CardContent className="p-6 relative">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center shadow-sm">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

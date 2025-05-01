"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "/testimonials/sarah.jpg",
    content:
      "I've used this platform multiple times for house cleaning and maintenance. The quality of service and reliability is outstanding. Highly recommended!",
    rating: 5,
    service: "House Cleaning",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    image: "/testimonials/michael.jpg",
    content:
      "As a small business owner, finding reliable contractors was always a challenge. This platform has made it so much easier to find and book quality services.",
    rating: 5,
    service: "Commercial Maintenance",
  },
  {
    name: "Emma Williams",
    role: "Parent",
    image: "/testimonials/emma.jpg",
    content:
      "The tutoring services we found through this platform have been excellent. The booking process is smooth, and the quality of tutors is exceptional.",
    rating: 5,
    service: "Tutoring",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying about
            their experience with our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="relative bg-background/60 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-muted/20" />
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
                <div className="mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Service: {testimonial.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

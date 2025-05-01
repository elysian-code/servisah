"use client"

import { Button } from "@/components/ui/button"
import { Search, Calendar, ThumbsUp, ArrowRight } from "lucide-react"

const steps = [
  {
    title: "Find a Service",
    description:
      "Search for the service you need and browse through our verified professionals.",
    icon: Search,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Book Instantly",
    description:
      "Choose your preferred time slot and book the service with instant confirmation.",
    icon: Calendar,
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Get it Done",
    description:
      "Your professional arrives on time, completes the work, and ensures your satisfaction.",
    icon: ThumbsUp,
    color: "bg-yellow-500/10 text-yellow-500",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting help is easier than ever. Follow these simple steps to book
            your service and get the help you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%-60%)] h-[2px] bg-muted">
                  <ArrowRight className="absolute right-0 -top-[9px] text-muted" />
                </div>
              )}
              <div className="text-center space-y-4">
                <div
                  className={`w-24 h-24 rounded-full ${step.color} mx-auto flex items-center justify-center`}
                >
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="px-8">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

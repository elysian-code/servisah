"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

const benefits = [
  "Keep 90% of your earnings",
  "Choose your own schedule",
  "Get paid quickly and securely",
  "Access to thousands of customers",
  "Free marketing and promotion",
  "Professional liability insurance",
]

export default function CTASection() {
  const router = useRouter()

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Join Our Network of Professional Service Providers
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-[600px]">
              Grow your business with access to our large customer base.
              Set your own rates, choose your schedule, and enjoy the flexibility
              of being your own boss.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary-foreground/70" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push("/register?type=provider")}
              >
                Start Earning Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-background text-foreground">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Monthly Earning Potential
                </h3>
                <p className="text-muted-foreground">
                  Based on average provider earnings on our platform
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="text-sm text-muted-foreground mb-1">
                    Part-time (15-20 hrs/week)
                  </div>
                  <div className="text-2xl font-bold">$2,000 - $3,000</div>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="text-sm text-muted-foreground mb-1">
                    Full-time (35-40 hrs/week)
                  </div>
                  <div className="text-2xl font-bold">$4,000 - $6,000</div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">
                    Top Performers
                  </div>
                  <div className="text-2xl font-bold">$8,000+</div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                * Earnings vary based on service type, location, and hours worked
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

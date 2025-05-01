"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const popularServices = [
  "House Cleaning",
  "Plumbing",
  "Electrical",
  "Moving",
  "Gardening",
]

export default function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [service, setService] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?service=${service}&location=${location}`)
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="container relative pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Find Expert Services <br />
                for Every Need
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Connect with skilled professionals for home services, repairs,
                and more. Quality work, guaranteed satisfaction.
              </p>
            </div>

            <Card className="p-4 bg-background/80 backdrop-blur-sm">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="What service do you need?"
                      className="pl-9"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Your location"
                      className="pl-9"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Find Services
                  </Button>
                </div>
              </form>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Popular:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularServices.map((service) => (
                    <Button
                      key={service}
                      variant="outline"
                      size="sm"
                      onClick={() => setService(service)}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-primary/10"
                  />
                ))}
              </div>
              <p>
                Join <span className="font-bold text-foreground">10,000+</span> satisfied customers
              </p>
            </div>
          </div>

          <div className="relative lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/hero-image.jpg"
              alt="Service professionals at work"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

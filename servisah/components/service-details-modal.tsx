"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface ServiceDetailsModalProps {
  service: {
    id: string
    title: string
    provider: {
      name: string
      rating: number
      totalReviews: number
      image: string
    }
    pricePerHour: number
    category: string
    location: string
    availability: string[]
    distance: number
  } | null
  isOpen: boolean
  onClose: () => void
}

export default function ServiceDetailsModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailsModalProps) {
  const router = useRouter()

  if (!service) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{service.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={service.provider.image} alt={service.provider.name} />
              <AvatarFallback>
                {service.provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{service.provider.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1">
                    {service.provider.rating} ({service.provider.totalReviews} reviews)
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4" />
                  <span className="ml-1">{service.distance} miles away</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                <Clock className="h-4 w-4" />
                Availability
              </div>
              <div className="flex flex-wrap gap-1">
                {service.availability.map((day) => (
                  <Badge key={day} variant="secondary">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-2 text-sm font-medium mb-1">
                <DollarSign className="h-4 w-4" />
                Hourly Rate
              </div>
              <div className="text-2xl font-bold">
                ${service.pricePerHour}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => router.push(`/services/${service.id}/book`)}>
              Book Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
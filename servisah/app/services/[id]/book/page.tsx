"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CalendarDays, Clock, MapPin, CreditCard, ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBookingStore } from "@/lib/stores/booking-store"

// Mock data - replace with API call
const mockService = {
  id: "1",
  title: "House Cleaning",
  provider: {
    id: "p1",
    name: "Alice Smith",
    rating: 4.8,
    totalBookings: 156,
  },
  pricePerHour: 30,
  description: "Professional house cleaning service with eco-friendly products.",
  availableHours: [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
  ],
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [duration, setDuration] = useState(2)
  const { setBookingDetails } = useBookingStore()

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)
    try {
      // Update booking store
      setBookingDetails({
        serviceId: params.id as string,
        providerId: mockService.provider.id,
        date: selectedDate,
        time: selectedTime,
        price: mockService.pricePerHour * duration,
      })

      // Mock API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Booking Confirmed",
        description: "Your service has been scheduled successfully.",
      })

      router.push("/dashboard/user")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      title: "Date & Time",
      description: "Select your preferred date and time",
      icon: CalendarDays,
    },
    {
      title: "Location",
      description: "Where would you like the service?",
      icon: MapPin,
    },
    {
      title: "Payment",
      description: "Review and confirm your booking",
      icon: CreditCard,
    },
  ]

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{mockService.title}</h1>
        <p className="text-muted-foreground">
          by {mockService.provider.name} · {mockService.provider.rating} ★
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={cn(
              "flex-1 flex items-center gap-4 p-4 rounded-lg border",
              step === i + 1
                ? "bg-primary/5 border-primary"
                : "bg-background border-muted"
            )}
          >
            <div
              className={cn(
                "p-2 rounded-full",
                step === i + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <s.icon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-muted-foreground">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step - 1].title}</CardTitle>
          <CardDescription>{steps[step - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) =>
                      date < new Date() || date > new Date(2025, 12, 31)
                    }
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <Label>Available Times</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {mockService.availableHours.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Duration (hours)</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDuration(Math.max(1, duration - 1))}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-20 text-center"
                        min={1}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDuration(duration + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="Street address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <Textarea
                  placeholder="Any special instructions for the service provider..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Rate</span>
                  <span>${mockService.pricePerHour}/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>${Math.round(mockService.pricePerHour * duration * 0.1)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    ${mockService.pricePerHour * duration + Math.round(mockService.pricePerHour * duration * 0.1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Month</Label>
                    <Input placeholder="MM" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Year</Label>
                    <Input placeholder="YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (step < steps.length) {
                  setStep(step + 1)
                } else {
                  handleSubmit()
                }
              }}
              disabled={
                (step === 1 && (!selectedDate || !selectedTime)) ||
                isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : step === steps.length ? (
                "Confirm Booking"
              ) : (
                <>
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

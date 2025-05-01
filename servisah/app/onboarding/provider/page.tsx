"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Upload, DollarSign, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const serviceCategories = [
  { label: "Cleaning", value: "cleaning" },
  { label: "Plumbing", value: "plumbing" },
  { label: "Electrical", value: "electrical" },
  { label: "Gardening", value: "gardening" },
  { label: "Carpentry", value: "carpentry" },
  { label: "Painting", value: "painting" },
  { label: "Moving", value: "moving" },
  { label: "Tutoring", value: "tutoring" },
  { label: "Pet Care", value: "pet-care" },
  { label: "Beauty & Wellness", value: "beauty-wellness" },
]

const skills = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "emergency", label: "Emergency Services" },
  { id: "eco-friendly", label: "Eco-friendly" },
  { id: "specialized", label: "Specialized Equipment" },
  { id: "certified", label: "Certified Professional" },
]

const formSchema = z.object({
  bio: z
    .string()
    .min(50, { message: "Bio must be at least 50 characters" })
    .max(500, { message: "Bio cannot exceed 500 characters" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.object({
    street: z.string().min(1, { message: "Street address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
  serviceRadius: z
    .number()
    .min(1, { message: "Service radius must be at least 1 mile" })
    .max(100, { message: "Service radius cannot exceed 100 miles" }),
  serviceCategory: z.string().min(1, { message: "Please select a service category" }),
  skills: z.array(z.string()).min(1, { message: "Please select at least one skill" }),
  hourlyRate: z.number().min(10, { message: "Hourly rate must be at least $10" }),
  availability: z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
  }),
  identificationDocument: z.any().optional(),
  certifications: z.any().optional(),
  backgroundCheck: z.boolean(),
  termsAgreed: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and conditions" }),
})

export default function ProviderOnboarding() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      serviceRadius: 10,
      serviceCategory: "",
      skills: [],
      hourlyRate: 25,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      backgroundCheck: false,
      termsAgreed: false,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Mock API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Registration Complete",
        description: "Your profile is now under review. We'll notify you once it's approved.",
      })

      router.push("/dashboard/provider")
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
      title: "Personal Information",
      description: "Tell us about yourself",
      fields: ["bio", "phoneNumber"],
    },
    {
      title: "Location & Services",
      description: "Where and what services you provide",
      fields: ["address", "serviceRadius", "serviceCategory", "skills"],
    },
    {
      title: "Rates & Availability",
      description: "Set your working hours and rates",
      fields: ["hourlyRate", "availability"],
    },
    {
      title: "Verification",
      description: "Complete your identity verification",
      fields: ["identificationDocument", "certifications", "backgroundCheck", "termsAgreed"],
    },
  ]

  const currentStep = steps[step - 1]

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Provider Onboarding</h1>
        <p className="text-muted-foreground mt-2">Step {step} of {steps.length}: {currentStep.title}</p>
      </div>

      <div className="flex gap-4 mb-8">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={cn("flex-1 h-2 rounded-full", {
              "bg-primary": i + 1 <= step,
              "bg-muted": i + 1 > step,
            })}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell customers about your experience and expertise..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum 50 characters, maximum 500 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="serviceRadius"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Radius (miles)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum distance you're willing to travel for service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceCategories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Skills & Expertise</FormLabel>
                          <FormDescription>
                            Select all that apply to your services
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {skills.map((skill) => (
                            <FormField
                              key={skill.id}
                              control={form.control}
                              name="skills"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-3">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(skill.id)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || []
                                        if (checked) {
                                          field.onChange([...current, skill.id])
                                        } else {
                                          field.onChange(
                                            current.filter((id) => id !== skill.id)
                                          )
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {skill.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="number"
                              className="pl-8"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set your hourly rate (minimum $10)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Availability</FormLabel>
                      <FormDescription>
                        Select the days you're available to work
                      </FormDescription>
                    </div>
                    <div className="grid gap-2">
                      {Object.entries({
                        monday: "Monday",
                        tuesday: "Tuesday",
                        wednesday: "Wednesday",
                        thursday: "Thursday",
                        friday: "Friday",
                        saturday: "Saturday",
                        sunday: "Sunday",
                      }).map(([key, label]) => (
                        <FormField
                          key={key}
                          control={form.control}
                          name={`availability.${key}` as any}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                </>
              )}

              {step === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="identificationDocument"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Government ID</FormLabel>
                        <FormControl>
                          <div className="grid gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                // Handle file upload
                              }}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload ID
                            </Button>
                            {field.value && (
                              <p className="text-sm text-muted-foreground">
                                File uploaded: {field.value}
                              </p>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a clear photo of your government-issued ID
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Certifications</FormLabel>
                        <FormControl>
                          <div className="grid gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                // Handle file upload
                              }}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Certifications
                            </Button>
                            {field.value && (
                              <p className="text-sm text-muted-foreground">
                                Files uploaded: {field.value}
                              </p>
                            )}
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload any relevant professional certifications (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="backgroundCheck"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Background Check</FormLabel>
                          <FormDescription>
                            I agree to undergo a background check
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAgreed"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Terms & Conditions</FormLabel>
                          <FormDescription>
                            I agree to the terms of service and privacy policy
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                <Button
                  type={step === steps.length ? "submit" : "button"}
                  onClick={() => {
                    if (step < steps.length) {
                      setStep(step + 1)
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : step === steps.length ? (
                    "Complete Registration"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

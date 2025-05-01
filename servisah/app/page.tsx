"use client"

import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import CategoryShowcase from "@/components/landing/category-showcase"
import HowItWorksSection from "@/components/landing/how-it-works-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import CTASection from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryShowcase />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}


'use client';
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { TestimonialSection } from "@/components/sections/testimonial-sections";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <TestimonialSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}


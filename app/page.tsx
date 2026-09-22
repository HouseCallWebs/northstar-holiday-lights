import { Hero } from "@/components/Hero";
import { TrustRow } from "@/components/TrustRow";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Packages } from "@/components/Packages";
import { Gallery } from "@/components/Gallery";
import { HowItWorks } from "@/components/HowItWorks";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustRow />
      <ServicesGrid />
      <Packages />
      <Gallery />
      <HowItWorks />
      <ServiceAreas />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}

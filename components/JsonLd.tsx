import { site } from "@/lib/config";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description:
      "Residential and commercial Christmas light design, installation, maintenance, and takedown serving the Denver metro area.",
    url: site.url,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Denver, CO",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Christmas Light Installation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial & HOA Holiday Lighting",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Holiday Light Takedown & Storage",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      telephone: site.phoneHref.replace("tel:", ""),
      url: site.url,
    },
    areaServed: {
      "@type": "City",
      name: "Denver, CO",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

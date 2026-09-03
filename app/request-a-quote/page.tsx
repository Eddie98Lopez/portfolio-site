import React from "react";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { Metadata } from "next";

const ogImage = {
  url: "/images/og_image.png",
  width: 2500,
  height: 1330,
  alt: "Eddie Lopez — request a quote for identity, design systems, and MVPs",
};
const siteUrl = "https://www.lopezed.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Request a Quote — Visual Identity, Design Systems & MVPs | Eddie Lopez",
  description:
    "Tell me your goals and get a tailored quote for a visual identity, design system, or product MVP. Share your timeline and budget—start your brief in minutes.",
  keywords: [
    "request a quote",
    "design quote",
    "visual identity design",
    "brand identity",
    "design systems",
    "product MVP",
    "MVP design studio",
    "project brief",
    "hire designers",
    "hire freelancers",
  ],
  alternates: {
    canonical: "/request-a-quote",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "website",
    url: "https://www.lopezed.com/request-a-quote",
    siteName: "Eddie Lopez | Design Engineer",
    title: "Request a Quote — Visual Identity, Design Systems & MVPs",
    description:
      "Get a tailored quote for a visual identity, design system, or product MVP. Tell us your timeline and budget—start your brief in minutes.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Quote — Visual Identity, Design Systems & MVPs",
    description:
      "Get a tailored quote for a visual identity, design system, or product MVP. Start your brief in minutes.",
    images: [ogImage.url],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Request a Quote",
  url: "https://www.lopezed.com/request-a-quote",
  description:
    "Request a tailored quote for a visual identity, design system, or product MVP.",
  isPartOf: {
    "@type": "WebSite",
    name: "Eddie Lopez | Design Engineer",
    url: "https://www.lopezed.com",
  },
  about: {
    "@type": "Organization",
    name: "Eddie Lopez | Design Engineer",
    url: "https://www.lopezed.com",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Visual Identity Design" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Design Systems" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Product MVP Development" },
      },
    ],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.lopezed.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Request a Quote",
      item: "https://www.lopezed.com/request-a-quote",
    },
  ],
};

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div
        className="w-full h-[100vh] flex items-center content-center texture bg-(--background-base)"
        data-pattern="dot"
      >
        <div className="mx-auto p-4">
          <div className="flex flex-col items-center justify-center relative w-full h-full mb-8">
            {/* <Image
            src={"/images/estimate.png"}
            width={200}
            height={200}
            alt="estimate"
            className="scale-150 -translate-y-10"
          /> */}
            <h1 className="text-display-small text-center mb-8  w-full">
              <HighlightedText>Request a Quote</HighlightedText>
            </h1>
            <p className="font-bold">
              Get a tailored quote for a visual identity, design system, or
              product MVP
            </p>
          </div>
          <QuoteRequestForm />
        </div>
      </div>
    </>
  );
};

export default Page;

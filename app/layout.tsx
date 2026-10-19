import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { themeToCssVars } from "@/config/ThemeToCSS";
import { business } from "@/config/business";
import { BasketProvider } from "@/components/basket-provider";
import BasketButton from "@/components/basket-button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: business.name,
  description: business.tagline?? "",
};

/* ============================================================
   JSON-LD — structured data for Google and AI answer engines.
   ============================================================ */

// const jsonLd = {
//   "@context": "https://schema.org",
//   "@type": "ProfessionalService",
//   name: business.name,
//   description: business.description,
//   url: "https://gschem.co.zw",
//   telephone: business.contact.phone,
//   email: business.contact.email,
//   address: {
//     "@type": "PostalAddress",
//     streetAddress: "14 Lisburn Road",
//     addressLocality: "Harare",
//     addressCountry: "ZW",
//   },
//   areaServed: {
//     "@type": "Country",
//     name: "Zimbabwe",
//   },
//   serviceType: [
//     "Paints and Coatings",
//     "Adhesives",
//     "Sealants",
//     "Roofing Waterproofing",
//     "Automotive Solvents",
//     "Wood Preservatives",
//   ],
//   sameAs: business.contact.socials?.map((s) => s.href) ?? [],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
      style={themeToCssVars(business.theme)}
    >
      <body className="min-h-full flex flex-col">
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> */}
        <BasketProvider storageKey={`basket:${business.name}`}>
          <Nav />
          {children}
          <Footer />
          <BasketButton variant="floating" />
        </BasketProvider >
      </body>
    </html>
  );
}
// app/contact/page.tsx
import type { Metadata } from "next";
import { business } from "@/config/business";
import Contact from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Road House Cinema. Bookings, private events, and enquiries.",
};

export default function ContactPage() {
  const cinema = business as any;

  return (
    <main>
      <Contact
        phone={cinema.contact.phone}
        email={cinema.contact.email}
        address={cinema.contact.address}
        whatsapp={cinema.contact.whatsapp}
        socials={cinema.contact.socials ?? []}
        form={cinema.contact.form}
      />
    </main>
  );
}
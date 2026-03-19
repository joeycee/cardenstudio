import type { Metadata } from "next";

import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: {
    default: "Carden Studio",
    template: "%s | Carden Studio",
  },
  description:
    "Founder-led web development studio building modern, premium websites and custom digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-background min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

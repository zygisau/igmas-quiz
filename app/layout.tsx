import type { Metadata } from "next";
import { Permanent_Marker, Indie_Flower } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-sketch",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  weight: "400",
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doodle Quiz",
  description: "A fun and quirky quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${permanentMarker.variable} ${indieFlower.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

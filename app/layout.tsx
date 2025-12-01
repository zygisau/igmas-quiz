import type { Metadata } from "next";
import { Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { BackgroundMusic } from "@/components/BackgroundMusic";

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-sketch",
  subsets: ["latin", "latin-ext"],
});

const caveat = Caveat({
  weight: ["400", "700"],
  variable: "--font-handwriting",
  subsets: ["latin", "latin-ext"],
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
        className={`${patrickHand.variable} ${caveat.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <BackgroundMusic />
      </body>
    </html>
  );
}

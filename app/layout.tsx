import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/languageContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Banila Co test",
  description:
    "Discover the cleansing formula crafted for your skin. Take our short quiz and find your best match.",
  icons: {
    icon: "/lotion.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-100">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

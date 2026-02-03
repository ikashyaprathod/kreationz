import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SavedProvider } from "@/context/SavedContext";

const josefinSans = Josefin_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Kreationz – UI Elements & Layouts",
  description: "A premium collection of the best UI/UX design shots. Minimal, functional, and design-led.",
  openGraph: {
    title: "Kreationz",
    description: "UI Elements & Layouts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} antialiased selection:bg-black selection:text-white`} suppressHydrationWarning>
        <SavedProvider>
          <Header />
          <div className="pt-21">
            {children}
          </div>
        </SavedProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { playfair, raleway } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "TREIZE",
  description: "Your Fashion Partner",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

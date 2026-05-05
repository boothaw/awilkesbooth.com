import type { Metadata } from "next";
import { Unbounded, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SunAnimation } from "./components/SunAnimation";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "a. wilkes booth",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="body">
        <SunAnimation />
        <div className="sun-wrapper">
          <div className="sun"></div>
        </div>
        <div className="loading-horizon"></div>
        <div id="smooth-wrapper">
          <div id="smooth-content" className="min-h-full flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

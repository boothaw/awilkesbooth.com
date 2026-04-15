import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="body">
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

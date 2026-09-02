import { Hanken_Grotesk } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ansh Sharma — Full-Stack Developer & Builder",
  description:
    "Portfolio of Ansh Sharma — a student developer at Kalvium building full-stack web applications with React, Next.js, Node.js, Docker and more.",
  keywords: ["Ansh Sharma", "portfolio", "developer", "React", "Next.js"],
  authors: [{ name: "Ansh Sharma" }],
  openGraph: {
    title: "Ansh Sharma — Full-Stack Developer",
    description: "Building innovative web applications with modern technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hanken.variable} ${geistMono.variable} antialiased`}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}


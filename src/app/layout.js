import { Geist, Geist_Mono } from "next/font/google";
import { Arimo } from "next/font/google";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo", // For Tailwind/CSS
});


const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra", // For Tailwind/CSS
});

export const metadata = {
  title: "Ansh Sharma",
  description: "Portfolio of Ansh Sharma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arimo.variable} ${chakra.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

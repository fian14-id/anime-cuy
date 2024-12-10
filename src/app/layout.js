import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utils/Navbar";
import ToTop from "@/components/utils/ToTop";
import { Analytics } from "@vercel/analytics/react"

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Anime-Cuy",
  description: "informated of Anime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={montserrat.className}>
      <Navbar />
      <Analytics />
        {children}
        <ToTop />
        </body>
    </html>
  );
}

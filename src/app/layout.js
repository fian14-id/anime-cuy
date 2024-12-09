import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utils/Navbar";
import ToTop from "@/components/utils/ToTop";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Anime-Cuy",
  description: "informated of Anime",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/animecuy.ico" sizes="any" />
      </head>
      <body className={montserrat.className}>
      <Navbar />
        {children}
        <ToTop />
        </body>
    </html>
  );
}

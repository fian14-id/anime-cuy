import { Montserrat } from "next/font/google";
import "./style/globals.css";
import Navbar from "@/components/utilities/Navbar";
import ToTop from "@/components/utilities/ToTop";
import { page_content } from "@/lib/setting-app";
import { Analytics } from "@vercel/analytics/react";
import { DataProvider } from "@/components/utilities/DataContext";
import ErrorBoundary from "@/components/utilities/ErrorBoundary";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: page_content.name_page,
  description: page_content.description,
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["dev@fianity.com", "fianity.com"],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${montserrat.className} text-palette-secondary bg-palette-primary`}
      >
        <DataProvider>
          <Navbar />
        </DataProvider>
        <Analytics />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <ToTop />
      </body>
    </html>
  );
}

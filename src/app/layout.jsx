// layout.jsx
'use client';
import { Montserrat } from "next/font/google";
import "./style/globals.css";
import dynamic from 'next/dynamic';
import Navbar from "@/components/utilities/Navbar";
import ToTop from "@/components/utilities/ToTop";
import { Analytics } from "@vercel/analytics/react";
import { DataProvider } from "@/components/utilities/DataContext";
import ErrorBoundary from "@/components/utilities/ErrorBoundary";
import Footer from "@/components/utilities/Footer";
import { useState, useEffect } from "react";
import animationData from '@/assets/animations/nexanime.json';

// Dynamically import Preloader with no SSR
const Preloader = dynamic(
  () => import('@/components/utilities/LoadingAnimation').then(mod => mod.Preloader),
  { ssr: false }
);

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => setIsInitialLoading(false), 3000);
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleComplete();
      } else {
        window.addEventListener('load', handleComplete);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleComplete);
      }
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preload" as="image" imageSrcSet="https://cdn.myanimelist.net/images/anime/1015/138006l.jpg" />
        <link rel="preload" as="image" imageSrcSet="/public/nexanime.svg" />
      </head>
      <body className={`${montserrat.className} text-palette-secondary bg-palette-primary`}>
      <Preloader isLoading={isInitialLoading} animationData={animationData} />
        <DataProvider>
          <Navbar />
        </DataProvider>
        <Analytics />
        <ErrorBoundary>{children}</ErrorBoundary>
        <ToTop />
        <Footer />
      </body>
    </html>
  );
}
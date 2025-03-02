"use client"; // Jika menggunakan App Router

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUUpLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ToTop = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Fungsi untuk memantau posisi scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fungsi untuk menggulirkan halaman ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backToPrev = () => {
    router.back()
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-3 transition-all duration-300 rounded-full shadow-xl text-palette-accent bg-palette-secondary bottom-10 right-5 hover:brightness-75"
        >
          <div className="text-palette-accent">
          <ArrowUp weight="bold" />
          </div>
        </button>
      )}
      {(!isVisible && pathname !== "/") && <button onClick={backToPrev} className="fixed z-50 p-3 transition-all duration-300 rounded-full shadow-xl text-palette-accent bg-palette-secondary bottom-10 right-5 hover:brightness-75"><ArrowUUpLeft weight="bold" /></button>}
    </div>
  );
};

export default ToTop;

"use client"; // Jika menggunakan App Router

import { useState, useEffect } from "react";
import { ArrowUp } from "@phosphor-icons/react";

const ToTop = () => {
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

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-3 text-palette-secondary transition-all duration-300 bg-palette-accent rounded-full shadow-lg dark:bg-palette-secondary bottom-5 right-5 hover:brightness-75"
        >
          <div className="text-palette-secondary">
          <ArrowUp weight="bold" />
          </div>
        </button>
      )}
    </div>
  );
};

export default ToTop;

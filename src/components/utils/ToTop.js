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
          className="fixed z-50 p-3 text-white transition-all duration-300 bg-[#242424] rounded-full shadow-lg dark:bg-white bottom-5 right-5 hover:brightness-75"
        >
          <div className="text-white dark:text-[#242424]">
          <ArrowUp weight="bold" />
          </div>
        </button>
      )}
    </div>
  );
};

export default ToTop;

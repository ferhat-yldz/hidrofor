"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-fire-red hover:bg-red-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl shadow-red-200 flex items-center justify-center transition-all transform hover:scale-110 z-50"
          aria-label="Sayfanın başına git"
        >
          <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      )}
    </>
  );
}

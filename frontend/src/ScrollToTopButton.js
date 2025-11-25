import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled down more than 100px, show button
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`scroll-top-btn ${isVisible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="scroll-top-icon" />
    </button>
  );
};

export default ScrollToTopButton;

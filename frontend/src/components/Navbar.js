import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import tfl from "../Assets/tfl.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ for mobile menu toggle

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
    setShowNavbar(currentScrollY < lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sky-funded-navbar ${isScrolled ? "scrolled" : ""} ${
        showNavbar ? "slide-down" : "slide-up"
      }`}
    >
      <div className="sky-funded-logop">
        <Link to="/">
          <img src={tfl} alt="SkyFunded Logo" className="sky-funded-logo-img" />
        </Link>
      </div>

      {/* ✅ Hamburger Button (Visible in Mobile) */}
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
      </div>

      {/* ✅ Nav Links (Hide in mobile when menu closed) */}
      <div className={`sky-funded-nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</Link>

        <div
          className="dropdown"
          onMouseEnter={() => setIsModelOpen(true)}
          onMouseLeave={() => setIsModelOpen(false)}
        >
          <span className="dropdown-title">Model</span>
          {isModelOpen && (
            <div className="dropdown-content">
              <Link to="/skyfunded-challenge" onClick={() => setIsMenuOpen(false)}>Funded</Link>
              <Link to="/express" onClick={() => setIsMenuOpen(false)}>Express</Link>
              <Link to="/evaluation" onClick={() => setIsMenuOpen(false)}>Evaluation</Link>
            </div>
          )}
        </div>

        <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>

        <div className="button-div">
          <div
            className="dropdown"
            onMouseEnter={() => setIsPlatformOpen(true)}
            onMouseLeave={() => setIsPlatformOpen(false)}
          >
            <div className="platform-buttonn">Platform</div>
            {isPlatformOpen && (
              <div className="dropdown-content">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </div>
            )}
          </div>

          <Link to="/login" className="login-buttonss" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

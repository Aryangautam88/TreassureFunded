import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaUser,
  FaTicketAlt,
  FaExchangeAlt,
  FaWallet,
  FaCog,
  FaFileAlt,
  FaPhoneAlt,
  FaIdCard,
  FaBars
} from "react-icons/fa";
import logo from "../Assets/tfl.png"; // ✅ Import your logo
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    { to: "/kyc", label: "KYC", icon: <FaIdCard /> },
    { to: "/withdrawls", label: "Withdrawals", icon: <FaWallet /> },
    { to: "/transaction", label: "Transaction", icon: <FaExchangeAlt /> },
    { to: "/deposit", label: "Deposit", icon: <FaWallet /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    { to: "/certificates", label: "Certificates", icon: <FaFileAlt /> },
    { to: "/support", label: "Support Ticket", icon: <FaPhoneAlt /> },
  ];

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-btn")
      ) {
        setIsOpen(false);
        document.body.classList.remove("sidebar-open");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("sidebar-open");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* ✅ Sidebar Logo */}
        <div className="sidebar-logo">
          <img src={logo} alt="TFL Logo" />
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="icon">{icon}</span>
                <span className="label">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

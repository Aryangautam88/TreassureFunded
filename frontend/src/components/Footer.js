import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        <h3 className="footer-title">Join our community</h3>
        <div className="footer-social">
          <a href="#" className="social-icon"><i className="fab fa-telegram-plane"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-container">
        <div className="footer-section">
          <h3>Markets</h3>
          <ul>
            <li>Stocks</li>
            <li>Currency Pairs (FX)</li>
            <li>Indices</li>
            <li>Commodities</li>
            <li>Cryptocurrencies</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Knowledge Hub</h3>
          <ul>
            <li>Trading Videos</li>
            <li>Ebooks</li>
            <li>Webinars</li>
            <li>Trading Tools</li>
            <li>Pip Calculator</li>
            <li>Blog & Insights</li>
            <li>Market Analysis</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Regulation & Licensing</h3>
          <ul>
            <li>Licensed Broker</li>

            {/* ✅ Clickable Links */}
            <li><Link to="/privacy" className="footer-link">Privacy Statement</Link></li>
            <li><Link to="/cookie" className="footer-link">Cookie Policy</Link></li>
            <li><Link to="/risk-disclosure" className="footer-link">Risk Disclosure</Link></li>
            <li><Link to="/terms-and-conditions" className="footer-link">Terms and Conditions</Link></li>
            <li>AML/KYC Policy</li>
            <li><Link to="/complaint-handling" className="footer-link">Complaint Handling</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li>📞 Contact Us: +44 20 3734 1025</li>
            <li>📧 Email: Support@treassurefunded.com</li>
            <li>📍 Exinity Limited</li>
            <li>🗺️ 5th Floor, 355 NEX Tower, London, UK</li>
          </ul>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <h3>Trading</h3>
          <ul>
            <li>Accounts Overview & Comparison</li>
            <li>Demo Trading</li>
            <li>Islamic Account</li>
            <li>Copy Trading</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Platform</h3>
          <ul>
            <li>MT4</li>
            <li>MT5</li>
            <li>Mobile Trading</li>
            <li>Web Trader</li>
            <li>API Trading</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Live Chat</li>
            <li>FAQ</li>
            <li>Submit a Ticket</li>
            <li>Community Forum</li>
          </ul>
        </div>
      </div>

      <div className="footer-note">
        © 2025 Treassure Funded. All rights reserved. | Designed with ❤️ by Treasure Funded Team
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: September 2025</p>
      </div>

      <div className="privacy-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to TreasureFunded. Your privacy is extremely important to us. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you use our website and services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Personal details (name, email, phone, country, etc.)</li>
            <li>Account credentials (username, password – encrypted)</li>
            <li>Financial information for deposits and withdrawals</li>
            <li>Device and browser details (IP, cookies, usage data)</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use collected data for purposes including:</p>
          <ul>
            <li>Account registration and authentication</li>
            <li>Processing deposits, withdrawals, and transactions</li>
            <li>Sending important updates, notifications, and promotions</li>
            <li>Improving our services and website performance</li>
            <li>Ensuring compliance with legal and regulatory obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing of Information</h2>
          <p>
            We do not sell or trade your personal information. 
            However, we may share your details with:
          </p>
          <ul>
            <li>Trusted service providers (payment processors, hosting partners)</li>
            <li>Regulatory authorities if required by law</li>
            <li>Affiliates and business partners with your consent</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We use advanced encryption, firewalls, and authentication measures to 
            protect your data. However, no method of transmission over the internet 
            is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>6. Cookies & Tracking</h2>
          <p>
            Our website uses cookies to improve user experience, track sessions, and 
            analyze website performance. You may disable cookies in your browser, 
            but some features may not function properly.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of promotional emails anytime</li>
          </ul>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <br />
            📧 <a href="mailto:Support@treassurefunded.com">Support@treassurefunded.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

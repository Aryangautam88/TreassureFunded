import React from "react";
import "./CookiePolicy.css"; // common styling for all policy pages

const CookiePolicy = () => {
  return (
    <div className="policy-container">
      <h1>Cookie Policy</h1>
      <p>
        At <strong>Treassure Funded</strong>, we use cookies to improve your
        browsing experience, provide personalized content, and analyze our
        website traffic. This Cookie Policy explains what cookies are, how we
        use them, and your choices regarding their usage.
      </p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device when you
        visit a website. They help websites function efficiently and provide
        information to the site owners.
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Required for basic site functions
          such as login, security, and account management.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how users
          interact with our website by collecting anonymous usage statistics.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Remember your preferences such as
          language and region to enhance your experience.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> Used to deliver relevant
          advertisements and measure their effectiveness.
        </li>
      </ul>

      <h2>How We Use Cookies</h2>
      <p>
        Treassure Funded uses cookies to enhance user experience, track website
        performance, and deliver targeted services. Cookies may also be used by
        trusted third-party providers, such as analytics or advertising
        partners.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can control or delete cookies through your browser settings. Please
        note that disabling cookies may affect the functionality of our website
        and some features may not work as intended.
      </p>

      <h2>Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or for legal reasons. Please revisit this page regularly
        for the latest updates.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about our Cookie Policy, please contact us at:
        <br />
        📧 <a href="mailto:support@treassurefunded.com">support@treassurefunded.com</a>
      </p>
    </div>
  );
};

export default CookiePolicy;

import React from "react";
import "./CookiePolicy"; // Reuse same CSS

const ComplaintHandling = () => {
  return (
    <div className="policy-container">
      <h1>Complaint Handling Policy</h1>
      <p>
        At <strong>Treasure Funded</strong>, we value transparency and fairness.
        We are committed to addressing and resolving all complaints in a timely,
        fair, and efficient manner. This policy outlines how complaints are
        handled within our platform.
      </p>

      <h2>1. Scope</h2>
      <p>
        This policy applies to all clients, traders, and users of Treasure
        Funded who wish to raise a complaint regarding our services, products,
        or policies.
      </p>

      <h2>2. What Constitutes a Complaint?</h2>
      <p>
        A complaint is defined as any dissatisfaction expressed by a client in
        relation to the services provided by Treasure Funded, including but not
        limited to:
      </p>
      <ul>
        <li>Issues with account management</li>
        <li>Concerns regarding trading challenges</li>
        <li>Technical difficulties</li>
        <li>Disputes regarding payments or withdrawals</li>
        <li>Perceived unfair treatment</li>
      </ul>

      <h2>3. How to Raise a Complaint</h2>
      <p>
        Users can submit their complaints directly through our{" "}
        <strong>Raise Ticket</strong> system available on the platform. Simply
        log in to your account, navigate to the{" "}
        <em>Support → Raise Ticket</em> section, and provide details of your
        issue.
      </p>
      <p>
        Alternatively, you may also contact us via email at{" "}
        <a href="mailto:support@treassurefunded.com">
          support@treassurefunded.com
        </a>
        .
      </p>

      <h2>4. Complaint Handling Process</h2>
      <ol>
        <li>
          <strong>Acknowledgement:</strong> We will acknowledge receipt of your
          complaint within <strong>48 hours</strong>.
        </li>
        <li>
          <strong>Investigation:</strong> Our support team will review the
          details of your complaint, investigate thoroughly, and may contact you
          for additional information.
        </li>
        <li>
          <strong>Resolution:</strong> We aim to provide a fair and transparent
          resolution within <strong>7 business days</strong>.
        </li>
        <li>
          <strong>Escalation:</strong> If you are not satisfied with the
          resolution, you may escalate the matter to our management team for
          further review.
        </li>
      </ol>

      <h2>5. Confidentiality</h2>
      <p>
        All complaints will be treated with strict confidentiality. Information
        shared during the complaint process will only be accessible to
        authorized staff involved in resolution.
      </p>

      <h2>6. Continuous Improvement</h2>
      <p>
        Complaints help us improve our services. Feedback from resolved cases is
        reviewed regularly to enhance our platform and prevent future issues.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        For any complaints, please use the Raise Ticket system or contact us at:
        <br />
        📧{" "}
        <a href="mailto:support@treassurefunded.com">
          support@treassurefunded.com
        </a>
        <br />
        📞 +44 20 3734 1025
      </p>
    </div>
  );
};

export default ComplaintHandling;

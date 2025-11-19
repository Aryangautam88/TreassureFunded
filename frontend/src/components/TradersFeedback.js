import React from "react";
import "./TradersFeedback.css";


const feedbacks = [
  {
    name: "Abdiirsak Faysal",
    daysAgo: "3 days ago",
    title: "Loving this prop firm!",
    message:
      "The tools provided really helped me pass phase one. Looking forward to becoming a funded trader soon.",
    rating: 5,
  },
  {
    name: "Joe T",
    daysAgo: "4 days ago",
    title: "Great support and environment",
    message:
      "The company offers excellent support and a transparent evaluation process.",
    rating: 5,
  },
  {
    name: "Ali Abolhosseini",
    daysAgo: "5 days ago",
    title: "Good experience overall",
    message:
      "Quick support and clear process, though I'd like to see a better profit split for advanced traders.",
    rating: 4,
  },
  {
    name: "Samantha Green",
    daysAgo: "2 days ago",
    title: "Fantastic prop firm",
    message:
      "The platform is very user-friendly and the staff are always helpful. Passed my evaluation with ease.",
    rating: 5,
  },
  {
    name: "Carlos Mendez",
    daysAgo: "1 week ago",
    title: "Very professional and supportive",
    message:
      "Appreciate the tools and resources that make trading smoother. Great company culture too!",
    rating: 4,
  },
  {
    name: "Leila Ahmed",
    daysAgo: "3 days ago",
    title: "Great learning experience",
    message:
      "Learned a lot during the evaluation phase. The feedback was constructive and encouraging.",
    rating: 5,
  },
  {
    name: "Nate Rogers",
    daysAgo: "4 days ago",
    title: "Highly recommend",
    message:
      "If you're serious about trading, this firm offers everything you need to succeed.",
    rating: 5,
  },
  {
    name: "Maya Patel",
    daysAgo: "6 days ago",
    title: "Smooth evaluation process",
    message:
      "The evaluation was challenging but fair. The support team was very responsive to my queries.",
    rating: 4,
  },
  {
    name: "Ethan Brooks",
    daysAgo: "5 days ago",
    title: "Excellent platform",
    message:
      "Clean interface, helpful tools, and reliable payouts. I’m happy to be part of this prop firm.",
    rating: 5,
  },
  {
    name: "Isabella Chen",
    daysAgo: "2 days ago",
    title: "Professional and transparent",
    message:
      "Everything was clear from day one, and the profit splits are competitive. Would definitely recommend.",
    rating: 5,
  },
  {
    name: "Liam Johnson",
    daysAgo: "1 week ago",
    title: "Great community",
    message:
      "Besides good tools, the trader community is very supportive, which makes a difference.",
    rating: 4,
  },
  {
    name: "Sophia Martinez",
    daysAgo: "3 days ago",
    title: "Impressed with customer service",
    message:
      "The team helped me through every step. Very patient and knowledgeable staff.",
    rating: 5,
  },
  {
    name: "James O'Connor",
    daysAgo: "1 day ago",
    title: "Smooth onboarding",
    message:
      "From signup to the first trade, everything went smoothly. Instructions were clear and onboarding was fast.",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    daysAgo: "2 days ago",
    title: "Great dashboard tools",
    message:
      "The tools on the dashboard are intuitive and very helpful. Love the real-time metrics.",
    rating: 4,
  },
  {
    name: "Dmitry Ivanov",
    daysAgo: "4 days ago",
    title: "Best prop firm so far",
    message:
      "I’ve tried a few firms, but this one stands out in terms of transparency and community support.",
    rating: 5,
  },
  {
  name: "Sarah Thompson",
  daysAgo: "2 days ago",
  title: "Excellent experience!",
  message:
    "The platform is user-friendly, payouts are on time, and customer support is top-notch. Highly recommended!",
  rating: 5,
}
];

const FeedbackSection = () => {
  return (
    <div className="feedback-container">
      <div className="feed-back-div">
        <h2 className="feedback-title-1">Traders Feedback</h2>
        <p className="feedback-subtitle">
          Treassure Funded stands out with traders like you! Discover what real
          traders are saying about our top-tier prop trading firm.
        </p>
        {/* <p className="rating">
          <span className="stars">★★★★★</span> Excellent - Rated 4.9 / 5 based on
          6230 reviews on Trustpilot
        </p> */}

        <div className="feedback-grid">
          {feedbacks.map((feedback, index) => (
            <div className="feedback-card" key={index}>
              <div className="feedback-stars">
                {"★".repeat(feedback.rating)}
                {"☆".repeat(5 - feedback.rating)}
              </div>
              <p className="feedback-name">
                {feedback.name}, {feedback.daysAgo}
              </p>
              <h3 className="feedback-title">{feedback.title}</h3>
              <p className="feedback-message">{feedback.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;

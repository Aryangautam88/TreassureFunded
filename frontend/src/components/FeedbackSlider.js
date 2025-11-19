import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeedbackSlider.css";

const feedbacks = [
  {
    name: "Devon Lane",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I've been with this company for a long time, and it’s been an incredibly rewarding journey.",
  },
  {
    name: "Jane Cooper",
    role: "Operation Manager",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote:
      "The policies ensure a secure and transparent working environment, making it a great place to grow both professionally and personally.",
  },
  {
    name: "Guy Hawkins",
    role: "Sales Manager",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    quote:
      "The leadership fosters a collaborative and positive environment where everyone is empowered to succeed.",
  },
  {
    name: "Alice Johnson",
    role: "Product Designer",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    quote:
      "The benefits provided to employees are outstanding, creating a productive and fulfilling workspace.",
  },
  {
    name: "Michael Scott",
    role: "Regional Manager",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    quote:
      "Working here has been a fantastic experience. The company culture promotes creativity and innovation at every level.",
  },
  {
    name: "Emily Adams",
    role: "Senior Developer",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    quote:
      "I've found this company to be incredibly supportive of career development, with opportunities for growth in every department.",
  },
];

const FeedbackSlider = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title">
        Feedback from our Employees
      </h2>
      <p className="slider-subtitle">
        Discover insights from our employees as they reflect on their journey and growth.
      </p>

      <Slider {...settings}>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-card1">
            <div className="feedback-header">
              <img src={feedback.image} alt={feedback.name} className="profile-pic" />
              <div>
                <h3 className="feedback-name">{feedback.name}</h3>
                <p className="feedback-role">{feedback.role}</p>
              </div>
            </div>
            <p className="feedback-quote"> {feedback.quote} </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeedbackSlider;

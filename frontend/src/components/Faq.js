import React, { useState } from 'react';
import "./Faq.css";
import faqimg1 from "../Assets/faq1.jpg";
import faqimg2 from "../Assets/faq2.jpg";
import faqimg3 from "../Assets/faq3.jpg";
import faqoverlay from "../Assets/faqoverlay.jpg"; 
import faqoverlay2 from "../Assets/faqoverlay2.jpg"; 
import faqoverlay3 from "../Assets/faqoverlay3.jpg"; 
import money from "../Assets/money.png";

const FAQItem = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const faqData = [
    {
      question: "What is Treassure Funded?",
      answer: "Treassure Funded is a prop firm that allows traders to get funded by passing an evaluation phase and proving their trading skills."
    },
    {
      question: "How does the Evaluation work?",
      answer: "You need to trade and achieve the profit target within the specified rules to pass the evaluation phase."
    },
    {
      question: "How do I get paid?",
      answer: "Once you are funded, your profits will be shared based on our profit split policy through secure payment methods."
    },
    {
      question: "What payment methods do you support?",
      answer: "We support various payment methods including Crypto, and E-wallets."
    },
    {
      question: "Can I trade news events?",
      answer: "Yes, we allow trading during news events unless specified otherwise in the rules of a particular challenge."
    },
    {
      question: "Is there any minimum trading day requirement?",
      answer: "Yes, traders are required to trade a minimum number of days during the evaluation phase."
    },
    {
      question: "What is the maximum drawdown allowed?",
      answer: "Our maximum drawdown rule ensures risk management and varies depending on the account size and type."
    },
    {
      question: "Can I use Expert Advisors (EAs)?",
      answer: "Yes, you can use EAs provided they comply with our rules and do not exploit platform bugs."
    },
    {
      question: "How long does it take to review my evaluation results?",
      answer: "Once you complete the evaluation, our team typically reviews it within 24-48 hours."
    },
    {
      question: "Is there a refund policy?",
      answer: "Unfortunately, evaluation fees are non-refundable as they cover operational and platform costs."
    },
  ];

  return (
    <div className='faq-main-container'>

      <div className='faq-1-container'>
        <h1 className='faq-1-heading'>Your Guide to Everything You Need to Know!</h1>
        <div className='moneydiv'>
        <img src={money} alt="overlay" className='money' /></div>
      </div>

      <div className='faq-2-container'>
        GET THE ASSISTANCE YOU’RE LOOKING FOR!
      </div>

      <div className='faq-box-container'>

        <div className='faq-box-container1'>
          <img src={faqoverlay} alt="overlay" className='faq-overlay-img' />
          <div className='faq-box-container1-content'>
            <img src={faqimg1} alt='faq' className='faq-image' />
            <h3>FAQ</h3>
            <p>Check out our frequently asked questions below to find the information you need. If you need further help, feel free to contact us!</p>
          </div>
        </div>

        <div className='faq-box-container1'>
          <img src={faqoverlay2} alt="overlay" className='faq-overlay-img' />
          <div className='faq-box-container1-content'>
            <img src={faqimg2} alt='support' className='faq-image' />
            <h3>Support Request</h3>
            <p>Our dedicated team is ready to assist you anytime, with an average response time of just 60 seconds. Reach out whenever you need help, and we’ll be there to support you!</p>
          </div>
        </div>

        <div className='faq-box-container1'>
          <img src={faqoverlay3} alt="overlay" className='faq-overlay-img' />
          <div className='faq-box-container1-content'>
            <img src={faqimg3} alt='email' className='faq-image' />
            <h3>Email Us!</h3>
            <p>We welcome new ideas, suggestions, and affiliate partnerships. Reach out today and let’s explore exciting opportunities together!</p>
          </div>
        </div>

      </div>

      {/* QNA SECTION START */}
      {faqData.map((item, index) => (
        <div className='qna-div' key={index}>
          <div className='faq-qna-box'>
            <div className="faq-question" onClick={() => toggleDropdown(index)}>
              <h3>{item.question}</h3>
              <span className={`faq-icon ${openIndex === index ? 'rotate' : ''}`}>&#9660;</span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        </div>
      ))}

    </div>
  )
}

export default FAQItem;

import React, { useState, useEffect } from "react";

const LandingSection = ({ setDashboardOpen }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [typingText, setTypingText] = useState("");

  const cards = [
    {
      country: "Spain",
      img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop",
    },
    {
      country: "Switzerland",
      img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    },
    {
      country: "Bali",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const word = "TrailTales";
    const animate = () => {
      setTypingText("");
      setTimeout(() => setTypingText(word), 100);
    };
    animate();
    const interval = setInterval(animate, word.length * 200 + 2000);
    return () => clearInterval(interval);
  }, []);

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % cards.length);
  const prevCard = () =>
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);

  const renderTypingText = () => {
    if (!typingText) return null;
    return typingText.split("").map((letter, idx) => (
      <span
        key={idx}
        className="trail-letter"
        style={{ animationDelay: `${idx * 0.2}s` }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <main className="hero-section">
      <div className="content-box">
        <h4>Start your journey</h4>
        <div className="title-container">
          <h1>
            Welcome to <span className="typing-text">{renderTypingText()}</span>
            <span className="cursor"></span>
          </h1>
        </div>
        <p>
          Pin your moments, share your adventures, and turn your travels into a
          timeless journal.
        </p>
        <button className="cta-btn" onClick={() => setDashboardOpen(true)}>
          Start Journaling
        </button>
      </div>

      <div className="carousel-container">
        <button id="prevBtn" className="nav-arrow" onClick={prevCard}>
          &#10094;
        </button>
        <div className="card-stack">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${index === currentCard ? "active" : ""}`}
              style={{ backgroundImage: `url('${card.img}')` }}
            >
              <div className="card-info">{card.country}</div>
            </div>
          ))}
        </div>
        <button id="nextBtn" className="nav-arrow" onClick={nextCard}>
          &#10095;
        </button>
      </div>
    </main>
  );
};

export default LandingSection;

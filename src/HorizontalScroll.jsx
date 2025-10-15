import React, { useState, useRef, useEffect } from "react";
import "./HorizontalScroll.css";
import exploreEpicImg from "Z:/portfolio new/portfolio-react/src/assets/exploreepic2.png";
import filmRave from "Z:/portfolio new/portfolio-react/src/assets/filmrave.png";

const cardImages = {
  exploreEpic: exploreEpicImg,
  ulearnx: "https://placehold.co/800x600/4D716A/E0E0E0?text=Ulearnx",
  filmRave: filmRave,
};

const cardsData = [
  {
    id: 1,
    header: "Explore Epic : Travel Planning Platform",
    hoverText: "<strong>Explore Epic : Travel Planning Platform</strong><br/> A travel planning app to create and share personalized trips.",
    content:
      "Explore Epic is a platform designed to let users create and share personalized travel experiences. It allows users to customize tour plans with sharing and liking features, providing a user-friendly interface that makes trip planning enjoyable and interactive. The project is developed using React.js, Spring Boot, and MySQL to ensure a smooth and responsive experience for travelers.",
    image: cardImages.exploreEpic,
  },
  {
    id: 2,
    header: "Ulearnx : Learning Management System",
    hoverText:
      "<strong>Ulearnx : Learning Management System</strong><br />An LMS offering real-time progress tracking and secure payments.",
    content:
      "Ulearnx is a modern Learning Management System (LMS) designed to revolutionize online learning. It offers real-time progress tracking for seamless user engagement and includes secure payment integration with Stripe for hassle-free transactions. Built entirely using Next.js and Prisma ORM, it ensures speed, scalability, and data security for learners and educators.",
    image: cardImages.ulearnx,
  },
  {
    id: 3,
    header: "Film Rave : Movie Review Application",
    hoverText: "<strong>Film Rave : Movie Review Application</strong><br />A movie review platform with trending analytics and insights.",
    content:
      "Film Rave is a dynamic platform for sharing and exploring movie reviews. It provides trending analytics for popular reviews and offers personalized dashboards for better user engagement. The platform encourages interaction among users while delivering an intuitive movie discovery experience. It is built using React.js, Spring Boot, and MySQL to ensure high performance and scalability.",
    image: cardImages.filmRave,
  },
];

const Card = ({ image, content, hoverText, header, onClick, isSelected, showDetails }) => {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      setDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  const mousePX = mouse.x / dimensions.width;
  const mousePY = mouse.y / dimensions.height;

  const cardStyle = {
    transform: isSelected
      ? ""
      : `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
    transition: "transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  };

  const cardBgTransform = {
    transform: isSelected
      ? ""
      : `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
    transition:
      "transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 0.5s",
  };

  const handleMouseMove = (e) => {
    if (isSelected) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left - dimensions.width / 2,
      y: e.clientY - rect.top - dimensions.height / 2,
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    setIsHover(false);
  };

  return (
    <div
      className={`card-wrap ${isSelected ? "selected-card-wrap" : ""} ${
        showDetails ? "" : "vanish"
      }`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHover(true)}
      onClick={!isHover ? onClick : undefined}
    >
      <div className="card" style={cardStyle}>
        {/* Card Background with Screenshot */}
        <div
          className="card-bg"
          style={{ ...cardBgTransform, backgroundImage: `url(${image})` }}
        >
          {/* Overlay Project Name */}
          <div className="card-title-overlay">
            <h3>{header}</h3>
          </div>
        </div>

        {/* Hover Text & Button */}
        <div className="card-info">
          {isHover && (
            <>
              <p
  className="hover-text"
  dangerouslySetInnerHTML={{ __html: hoverText }}
></p>

              {!isSelected && (
                <div className="hover-button">
                  <a className="btn btn-1" onClick={onClick}>
                    <svg>
                      <rect x="0" y="0" fill="none" width="100%" height="100%" />
                    </svg>
                    View Details
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    if (!selectedCard) {
      setSelectedCard(card);
    }
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  const getCardOffset = (id) => {
    if (id === 1) return "move-little-left";
    if (id === 2) return "move-more-left";
    if (id === 3) return "move-most-left";
    return "";
  };

  return (
    <div className="page">
      <section id="projects">
        <h1 className="projectheading">Projects</h1>
        <div
          className={`projects-container ${
            selectedCard ? "show-details-view" : ""
          }`}
        >
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`card-wrapper-outer ${
                selectedCard && selectedCard.id === card.id
                  ? getCardOffset(card.id)
                  : ""
              }`}
            >
              <Card
                image={card.image}
                content={card.content}
                hoverText={card.hoverText}
                onClick={() => handleCardClick(card)}
                isSelected={selectedCard && selectedCard.id === card.id}
                showDetails={!selectedCard || selectedCard.id === card.id}
              />
            </div>
          ))}
          {selectedCard && (
            <div className="card-details-wrapper">
              <div className="card-details">
                <h2>{selectedCard.header}</h2>
                <p className="card-description">{selectedCard.content}</p>
                <button className="back-btn" onClick={handleBackClick}>
                  &larr; Back to Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

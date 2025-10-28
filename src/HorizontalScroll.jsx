import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./HorizontalScroll.css";
import exploreEpicImg from "./assets/exploreepic2.png";
import filmRave from "./assets/filmrave.png";

/* ================= Tooltip Component ================= */
const Tooltip = ({ visible, x, y, text }) => {
  if (!visible) return null;
  const style = {
    left: x + 10 + "px", // Slight offset from the mouse
    top: y + 10 + "px",
  };

  return createPortal(
    <div className="floating-tooltip" style={style}>
      {text}
    </div>,
    document.body
  );
};

/* ================= Image Assets ================= */
const cardImages = {
  exploreEpic: exploreEpicImg,
  ulearnx: "https://placehold.co/800x600/4D716A/E0E0E0?text=Ulearnx",
  filmRave: filmRave,
};

/* ================= Project Cards Data ================= */
const cardsData = [
  {
    id: 1,
    header: "Explore Epic : Travel Planning Platform",
    role: "Full-Stack Travel App",
    content:
      "Explore Epic is a platform designed to let users create and share personalized travel experiences. It allows users to customize tour plans with sharing and liking features, providing a user-friendly interface that makes trip planning enjoyable and interactive. The project is developed using React.js, Spring Boot, and MySQL to ensure a smooth and responsive experience for travelers.",
    image: cardImages.exploreEpic,
    github: "https://github.com/Vineethgm-Projects/ExploreEpic--Travel_Application-",
  },
  {
    id: 2,
    header: "Ulearnx : Learning Management System",
    role: "Next.js LMS Platform",
    content:
      "Ulearnx is a modern Learning Management System (LMS) designed to revolutionize online learning. It offers real-time progress tracking for seamless user engagement and includes secure payment integration with Stripe for hassle-free transactions. Built entirely using Next.js and Prisma ORM, it ensures speed, scalability, and data security for learners and educators.",
    image: cardImages.ulearnx,
    github: "https://github.com/Vineethgm-Projects/UlearnX-LMS--Platform",
  },
  {
    id: 3,
    header: "Film Rave : Movie Review Application",
    role: "React Movie Review App",
    content:
      "Film Rave is a dynamic platform for sharing and exploring movie reviews. It provides trending analytics for popular reviews and offers personalized dashboards for better user engagement. The platform encourages interaction among users while delivering an intuitive movie discovery experience. It is built using React.js, Spring Boot, and MySQL to ensure high performance and scalability.",
    image: cardImages.filmRave,
    github: "https://github.com/Vineethgm-Projects/FilmRave",
  },
];

/* ================= Main Component ================= */
const VerticalProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const trackRef = useRef(null);
  const membersCount = cardsData.length;

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = (newIndex + membersCount) % membersCount;
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") updateCarousel(currentIndex - 1);
      else if (e.key === "ArrowDown") updateCarousel(currentIndex + 1);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isAnimating]);

  const handleTouchStart = (e) => {
    if (isAnimating) return;
    const touchStartY = e.changedTouches[0].screenY;

    const onTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) updateCarousel(currentIndex + 1);
        else updateCarousel(currentIndex - 1);
      }
    };

    document.addEventListener("touchend", onTouchEnd, { once: true });
  };

  const getCardClass = (index) => {
    const offset = (index - currentIndex + membersCount) % membersCount;
    if (offset === 0) return "center";
    if (offset === 1) return "down-1";
    if (offset === 2) return "down-2";
    if (offset === membersCount - 1) return "up-1";
    if (offset === membersCount - 2) return "up-2";
    return "hidden";
  };

  const currentProject = cardsData[currentIndex];

  return (
    <div className="main-container-carousel">
      <section id="projects-carousel">
        <div className="project-header-unique">
          <h2>
            <span className="project-accent-unique">Projects</span>
          </h2>
        </div>

        <div className="content-wrapper">
          <div className="carousel-section-new">
            <div className="carousel-container-new">
              <div className="carousel-track-new" ref={trackRef} onTouchStart={handleTouchStart}>
                {cardsData.map((card, index) => (
                  <div
                    key={card.id}
                    className={`card-new ${getCardClass(index)}`}
                    onClick={() => window.open(card.github, "_blank")}
                    onMouseMove={(e) =>
                      setTooltip({
                        visible: true,
                        x: e.clientX,
                        y: e.clientY,
                        text: "Click to view the project on GitHub",
                      })
                    }
                    onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, text: "" })}
                    style={{ backgroundImage: `url(${card.image})` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="controls-section-new">
            <div className={`member-info-new ${isAnimating ? "fade-out" : ""}`}>
              <h2 className="member-name-new">{currentProject.header}</h2>
              <p className="member-role-new">{currentProject.role}</p>
              <p className="project-content-new">{currentProject.content}</p>
            </div>

            <div className="nav-text-controls">
              <button className="nav-text-button previous" onClick={() => updateCarousel(currentIndex - 1)}>
                Previous
              </button>
              <button className="nav-text-button next" onClick={() => updateCarousel(currentIndex + 1)}>
                Next
              </button>
            </div>

            <div className="dots-new">
              {cardsData.map((_, index) => (
                <div
                  key={index}
                  className={`dot-new ${index === currentIndex ? "active" : ""}`}
                  onClick={() => updateCarousel(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tooltip rendered via portal */}
      <Tooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} text={tooltip.text} />
    </div>
  );
};

export default VerticalProjectCarousel;

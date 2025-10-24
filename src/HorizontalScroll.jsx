import React, { useState, useEffect, useRef } from "react";
import "./HorizontalScroll.css"; // The separate CSS file
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
    role: "Full-Stack Travel App", // Added a 'role' for the small text
    content:
      "Explore Epic is a platform designed to let users create and share personalized travel experiences. It allows users to customize tour plans with sharing and liking features, providing a user-friendly interface that makes trip planning enjoyable and interactive. The project is developed using React.js, Spring Boot, and MySQL to ensure a smooth and responsive experience for travelers.",
    image: cardImages.exploreEpic,
  },
  {
    id: 2,
    header: "Ulearnx : Learning Management System",
    role: "Next.js LMS Platform",
    content:
      "Ulearnx is a modern Learning Management System (LMS) designed to revolutionize online learning. It offers real-time progress tracking for seamless user engagement and includes secure payment integration with Stripe for hassle-free transactions. Built entirely using Next.js and Prisma ORM, it ensures speed, scalability, and data security for learners and educators.",
    image: cardImages.ulearnx,
  },
  {
    id: 3,
    header: "Film Rave : Movie Review Application",
    role: "React Movie Review App",
    content:
      "Film Rave is a dynamic platform for sharing and exploring movie reviews. It provides trending analytics for popular reviews and offers personalized dashboards for better user engagement. The platform encourages interaction among users while delivering an intuitive movie discovery experience. It is built using React.js, Spring Boot, and MySQL to ensure high performance and scalability.",
    image: cardImages.filmRave,
  },
];

const VerticalProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);
  const membersCount = cardsData.length;

  // Handles moving the carousel up or down
  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (newIndex + membersCount) % membersCount;
    setCurrentIndex(nextIndex);

    // End animation after CSS transition duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Must match the CSS transition duration
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowDown") {
        updateCarousel(currentIndex + 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isAnimating]);

  // Swipe gesture handling
  const handleTouchStart = (e) => {
    if (isAnimating) return;
    const touchStartY = e.changedTouches[0].screenY;

    const onTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].screenY;
      const swipeThreshold = 50;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe Up -> Next card (Down in the view)
          updateCarousel(currentIndex + 1);
        } else {
          // Swipe Down -> Previous card (Up in the view)
          updateCarousel(currentIndex - 1);
        }
      }
      document.removeEventListener("touchend", onTouchEnd);
    };

    document.addEventListener("touchend", onTouchEnd, { once: true });
  };

  // Function to determine the class for each card
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
              {/* Arrow navigation is removed here for desktop, but kept for mobile in CSS */}
              
              <div
                className="carousel-track-new"
                ref={trackRef}
                onTouchStart={handleTouchStart}
              >
                {cardsData.map((card, index) => (
                  <div
                    key={card.id}
                    className={`card-new ${getCardClass(index)}`}
                    onClick={() => updateCarousel(index)}
                    style={{
                      backgroundImage: `url(${card.image})`,
                    }}
                  >
                    {/* The image is set as background for the parallax effect */}
                  </div>
                ))}
              </div>
              
            </div>
          </div>

          <div className="controls-section-new">
            {/* The previous nav-controls-new div is removed */}

            <div className={`member-info-new ${isAnimating ? "fade-out" : ""}`}>
              <h2 className="member-name-new">{currentProject.header}</h2>
              <p className="member-role-new">{currentProject.role}</p>
              <p className="project-content-new">{currentProject.content}</p>
            </div>

            {/* NEW: Previous and Next Buttons */}
            <div className="nav-text-controls">
              <button
                className="nav-text-button previous"
                onClick={() => updateCarousel(currentIndex - 1)}
              >
                Previous
              </button>
              <button
                className="nav-text-button next"
                onClick={() => updateCarousel(currentIndex + 1)}
              >
                Next
              </button>
            </div>
            {/* END NEW Buttons */}

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
    </div>
  );
};

export default VerticalProjectCarousel;
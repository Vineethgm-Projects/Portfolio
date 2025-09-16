// App.js
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [text, setText] = useState("");

  const aboutContent = "WEB DESIGNER + FRONT-END DEVELOPER";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < aboutContent.length) {
        setText((prev) => prev + aboutContent.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector("#about")?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      {/* Header/Nav */}
      <header id="myHeader" className={`header ${isSticky ? "sticky" : ""}`}>
        <nav aria-label="Main Navigation">
          <ul>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                Stack
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                Achievements
              </a>
            </li>
          </ul>
          <button id="openmenu" onClick={() => setMenuOpen((prev) => !prev)}>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Page */}
      <div id="page" className={`page ${menuOpen ? "menuopen" : ""}`}>
        {/* About Section */}
        <section id="about" className="aboutme">
          <div className="opaque-bg animated fadeInDown">
            <h1 style={{ color: "white" }}>
              M<span style={{ color: "#FF6363" }}>.</span>VINEETH
            </h1>
            <p>
              <span>{text}</span>
              <span className="blinking-cursor">|</span>
            </p>
          </div>
          <FaChevronDown
            id="moveDown"
            className="fa-chevron-down fa-3x bounce"
            onClick={handleScrollDown}
          />
        </section>

        {/* Placeholder Sections */}
        <section id="projects">
          <h1>Projects</h1>
        </section>
        <section id="contact">
          <h1>Contact</h1>
        </section>
      </div>
    </div>
  );
}

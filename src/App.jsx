import HorizontalScroll from "./HorizontalScroll";
import MyStack from "./My_stack";
import Contact from "./Contact";
import DownloadImageButton from "./cvdownload";
import React, { useEffect, useState, useRef } from "react";
import {
  FaChevronDown,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaFileDownload,
  FaDownload,
} from "react-icons/fa";
import "./App.css";
import GridBackground from "./GridBackground";

// GSAP and Plugins
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const dynamicRoles = [
  "FRONT-END DEVELOPER",
  "UI/UX ENTHUSIAST",
  "REACT SPECIALIST",
  "JAVASCRIPT CRAFTSMAN",
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [currentRole, setCurrentRole] = useState(dynamicRoles[0]);
  const roleRef = useRef(null);

  // --- Dynamic Role Animation Effect ---
  useEffect(() => {
    let index = 0;
    const animateText = () => {
      index = (index + 1) % dynamicRoles.length;
      const nextRole = dynamicRoles[index];

      gsap.to(roleRef.current.children, {
        y: -20,
        opacity: 0,
        rotationX: 90,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentRole(nextRole);
          setTimeout(() => {
            gsap.fromTo(
              roleRef.current.children,
              { y: 20, opacity: 0, rotationX: -90 },
              {
                y: 0,
                opacity: 1,
                rotationX: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.out",
              }
            );
          }, 50);
        },
      });
    };

    gsap.fromTo(
      roleRef.current.children,
      { y: 20, opacity: 0, rotationX: -90 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.05,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      }
    );

    const interval = setInterval(animateText, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- Split Text into Spans ---
  const splitText = (text) => {
    if (!text) return [];
    return text.split("").map((char, index) => (
      <span
        key={index}
        style={{ display: "inline-block", transformOrigin: "bottom center" }}
        className={char === " " ? "char-space" : "char-letter"}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // --- Initialize ScrollSmoother ---
  useEffect(() => {
    if (ScrollSmoother.get()) ScrollSmoother.get().kill();

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3,
      effects: true,
      normalizeScroll: true,
    });

    return () => smoother.kill();
  }, []);

  // --- Header Animation ---
  useEffect(() => {
    const headerAnimation = setTimeout(() => {
      gsap.to("nav", {
        opacity: 1,
        y: 0,
        scale: 1,
        height: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "bottom 80%",
          scroller: "#smooth-wrapper",
          toggleActions: "play none none reverse",
        },
      });
    }, 100);

    return () => clearTimeout(headerAnimation);
  }, []);

  // --- Scroll Functions ---
  const handleNavClick = (e, id) => {
    e.preventDefault();
    ScrollSmoother.get().scrollTo(id, true, "top top");
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector("#about")?.nextElementSibling;
    if (nextSection) {
      ScrollSmoother.get().scrollTo(nextSection, true, "top top");
    }
  };

  const handleContactClick = (e) => {
    handleNavClick(e, "#contact");
  };

  // --- Active Nav Link ---
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let current = "#about";
      const smootherScrollY = ScrollTrigger.scrollerProxy.scrollTop();
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = smootherScrollY + rect.top - 120;
        const sectionHeight = section.clientHeight;
        if (
          smootherScrollY >= sectionTop &&
          smootherScrollY < sectionTop + sectionHeight
        ) {
          current = `#${section.id}`;
        }
      });
      setActiveSection(current);
    };

    ScrollTrigger.addEventListener("scroll", handleScroll);
    return () => ScrollTrigger.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <GridBackground />
      <header id="myHeader" className="header">
        <nav aria-label="Main Navigation">
          <ul>
            <li>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className={activeSection === "#about" ? "active" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projectsmain"
                onClick={(e) => handleNavClick(e, "#projectsmain")}
                className={activeSection === "#projectsmain" ? "active" : ""}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#stack"
                onClick={(e) => handleNavClick(e, "#stack")}
                className={activeSection === "#stack" ? "active" : ""}
              >
                Stack
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className={activeSection === "#contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
          </ul>
          <button id="openmenu" onClick={() => setMenuOpen((prev) => !prev)}>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div id="page" className={`page ${menuOpen ? "menuopen" : ""}`}>
            {/* About Section */}
            <section id="about" className="aboutme">
              <div
                className="opaque-bg animated fadeInDown"
                data-speed="1.05"
                data-lag="0.1"
              >
                <div className="about-content-wrapper">
                  <h1 className="hero-name" data-speed="1.08">
                    M<span style={{ color: "#FF6363" }}>.</span>VINEETH
                  </h1>

                  <p
                    className="hero-role-container"
                    data-speed="1.1"
                    ref={roleRef}
                  >
                    {splitText(currentRole)}
                  </p>

                  <p className="about-description">
                    I'm a passionate Full Stack Developer who loves building
                    efficient, scalable, and visually engaging web applications.
                    With strong skills in both front-end technologies like React
                    and Next.js, and back-end tools such as Java and MySQL, I
                    enjoy bringing ideas to life from concept to deployment. I'm
                    always eager to learn, improve performance, and craft
                    seamless user experiences that combine clean design with
                    powerful functionality.
                  </p>

                  {/* Social Links */}
                  <div className="social-links">
                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href="https://linkedin.com/in/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedinIn />
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      aria-label="Send Email"
                    >
                      <FaEnvelope />
                    </a>
                    <DownloadImageButton />
                  </div>

                  <button className="contact-button" onClick={handleContactClick}>
                    Get in Touch
                  </button>

                  <FaChevronDown
                    id="moveDown"
                    className="fa-chevron-down fa-3x bounce"
                    onClick={handleScrollDown}
                  />
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <section id="projectsmain" data-speed="0.9">
                  <HorizontalScroll />
                </section>
              </div>
            </div>

            {/* Stack Section */}
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <section id="stack" data-speed="1.1">
                  <MyStack />
                </section>
              </div>
            </div>

            {/* Contact Section */}
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <section id="contact" data-speed="0.85">
                  <Contact />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

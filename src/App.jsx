import HorizontalScroll from "./HorizontalScroll";
import AnimatedDownloadButton from "./Downloadbutton";
import MyStack from "./My_stack";
import Contact from "./Contact";
import DownloadImageButton from "./cvdownload";
import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { FaChevronDown, FaGithub, FaLinkedinIn, FaEnvelope, FaFileDownload, FaDownload } from "react-icons/fa";
import "./App.css";
import img from "./assets/file.png";
import img2 from "./assets/cv3.png";

// 1. Import GSAP and necessary plugins
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother"; 

// 2. Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Roles for the dynamic text change
const dynamicRoles = [
  "FRONT-END DEVELOPER",
  "UI/UX ENTHUSIAST",
  "REACT SPECIALIST",
  "JAVASCRIPT CRAFTSMAN"
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  // State and Ref for Dynamic Role Text
  const [currentRole, setCurrentRole] = useState(dynamicRoles[0]);
  const roleRef = useRef(null); // Ref for the element containing the dynamic role

  // --- Dynamic Role Animation Effect ---
  useEffect(() => {
    let index = 0;
    const animateText = () => {
      // 1. Update the role for the next cycle
      index = (index + 1) % dynamicRoles.length;
      const nextRole = dynamicRoles[index];
      
      // 2. Animate out (fade and roll up)
      gsap.to(roleRef.current.children, {
        y: -20, // Move characters up
        opacity: 0,
        rotationX: 90,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // 3. Update the content in React State 
          setCurrentRole(nextRole);
          
          // 4. Wait for the DOM to update with the new characters, then animate in
          setTimeout(() => {
            gsap.fromTo(roleRef.current.children, 
              { y: 20, opacity: 0, rotationX: -90 }, // Start position (from bottom/back)
              { y: 0, opacity: 1, rotationX: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" } // End position
            );
          }, 50); // Small delay to ensure render
        }
      });
    };

    // Set the initial animation for the first load
    gsap.fromTo(roleRef.current.children, 
        { y: 20, opacity: 0, rotationX: -90 }, 
        { y: 0, opacity: 1, rotationX: 0, stagger: 0.05, duration: 0.8, delay: 0.5, ease: "power2.out" }
    );


    // Start the cycling loop after the initial animation
    const interval = setInterval(animateText, 4000); // Change role every 4 seconds

    return () => clearInterval(interval);
  }, []); // Run only once on mount

  // --- Utility to split text into spans (Crucial for GSAP character animation) ---
  const splitText = (text) => {
    // If text is empty (during transition), return an empty array
    if (!text) return [];
    
    // Split text into an array of characters and map them to spans
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        className={char === ' ' ? 'char-space' : 'char-letter'} // Helper class for spaces
      >
        {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for spaces */}
      </span>
    ));
  };


  // 3. Initialize ScrollSmoother (Keep as is)
  useEffect(() => {
    if (ScrollSmoother.get()) {
      ScrollSmoother.get().kill();
    }

    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 3, 
      effects: true, 
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  // 4. GSAP ScrollTrigger for Header Animation (Keep as is)
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




  // Scroll functions (Keep as is)
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
  

  // Update active nav link based on scroll (Keep as is)
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let current = "#about";
      const smootherScrollY = ScrollTrigger.scrollerProxy.scrollTop(); 
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = smootherScrollY + rect.top - 120; 
        const sectionHeight = section.clientHeight;

        if (smootherScrollY >= sectionTop && smootherScrollY < sectionTop + sectionHeight) {
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
      <header id="myHeader" className="header">
        {/* ... Nav Code ... */}
        <nav aria-label="Main Navigation">
          <ul>
            <li><a href="#about" onClick={(e) => handleNavClick(e, "#about")} className={activeSection === "#about" ? "active" : ""}>About</a></li>
            <li><a href="#projectsmain" onClick={(e) => handleNavClick(e, "#projectsmain")} className={activeSection === "#projectsmain" ? "active" : ""}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className={activeSection === "#contact" ? "active" : ""}>Contact</a></li>
            <li><a href="#stack" onClick={(e) => handleNavClick(e, "#stack")} className={activeSection === "#stack" ? "active" : ""}>Stack</a></li>
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
            
            {/* About Section - UPDATED CONTENT */}
            <section id="about" className="aboutme">

              <div 
                className="opaque-bg animated fadeInDown"
                data-speed="1.05"
                data-lag="0.1"
              >
                <div className="about-content-wrapper">


                  
                  {/* Avatar/Placeholder - REMOVED */}

                  {/* Main Title */}
                  <h1 className="hero-name" data-speed="1.08">
                    M<span style={{ color: "#FF6363" }}>.</span>VINEETH
                  </h1>

                  {/* Dynamic Role Text - NEW STRUCTURE */}
                  <p className="hero-role-container"> <span className="hero-role-text-gsap" ref={roleRef} aria-live="polite">
                        {splitText(currentRole)}
                    </span>
                  </p>  
                  {/* Social Media Links */}
                  <div className="social-links">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                      <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                      <FaLinkedinIn />
                    </a>
                    <a href="mailto:your.email@example.com" aria-label="Send Email">
                      <FaEnvelope />
                    </a>
                    <DownloadImageButton/>
                    </div>

                  {/* Download Button */}
{/*<AnimatedDownloadButton 
  resumeUrl="path/to/your/resume.pdf" // <-- IMPORTANT: Replace this with the actual URL/path
  onClick={(url) => {
    // In a real app, you would initiate the download here, e.g.:
    // window.open(url, '_blank');
    console.log(`Downloading resume from: ${url}`);
  }}
/>*/}

{/* Contact Button */}
<button className="contact-button" onClick={handleContactClick}>
  Get in Touch
</button>


                  {/* Scroll Down Indicator */}
                  <FaChevronDown
                    id="moveDown"
                    className="fa-chevron-down fa-3x bounce"
                    onClick={handleScrollDown}
                  />
                </div>
              </div>
            </section>

            {/* ... Other Sections ... */}
            <section id="projectsmain" data-speed="0.9"><HorizontalScroll /></section>
            <section id="stack" data-speed="1.1"><MyStack /></section>
            <section id="contact" data-speed="0.85"><Contact /></section>

          </div> 
        </div> 
      </div> 
    </div>
  );
}
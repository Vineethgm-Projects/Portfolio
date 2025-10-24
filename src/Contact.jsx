import React, { useState, useEffect, useRef } from 'react';
import {
    FaPaperPlane,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaEnvelope,
} from 'react-icons/fa';
import './Contact.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const Contact = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const svgRef = useRef(null);
    
    const handleFlip = () => setIsFlipped(true);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        e.target.elements.contactName.value = '';
        e.target.elements.contactEmail.value = '';
        e.target.elements.contactMessage.value = '';
        alert('Thank you for your message!');
    };

    const flipContainerClass = `contact-flip-container ${isFlipped ? 'flipped' : ''}`;

    const SocialIconItem = ({ Icon, link }) => (
    <li>
        <a href={link} target="_blank" className="contact-icon" rel="noopener noreferrer">
            <Icon aria-hidden="true" />
        </a>
    </li>
);

    
    // Dynamically calculate SVG paths
    const [paths, setPaths] = useState([]);
    const sectionRef = useRef(null);
const cardRef = useRef(null);
    
    useEffect(() => {
        const updatePaths = () => {
            const scene = document.querySelector('.contact-scene');
            const button = document.querySelector('.contact-button-container button');
            if (!scene || !button) return;
            
            const sceneRect = scene.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            
            const corners = [
                document.querySelector('.corner-icon-tl li'),
                document.querySelector('.corner-icon-tr li'),
                document.querySelector('.corner-icon-bl li'),
                document.querySelector('.corner-icon-br li'),
            ];

            const newPaths = corners.map((corner) => {
                if (!corner) return '';
                const cRect = corner.getBoundingClientRect();

                const startX = cRect.left + cRect.width / 2 - sceneRect.left;
                const startY = cRect.top + cRect.height / 2 - sceneRect.top;
                const endX = buttonRect.left + buttonRect.width / 2 - sceneRect.left;
                const endY = buttonRect.top + buttonRect.height / 2 - sceneRect.top;
                
                // Control points for a smooth curve
                const ctrlX1 = startX;
                const ctrlY1 = startY + (endY - startY) / 2;
                const ctrlX2 = endX;
                const ctrlY2 = endY - (endY - startY) / 2;

                
                return `M${startX},${startY} C${ctrlX1},${ctrlY1} ${ctrlX2},${ctrlY2} ${endX},${endY}`;
            });

            setPaths(newPaths);
        };

        updatePaths();
        window.addEventListener('resize', updatePaths);
        return () => window.removeEventListener('resize', updatePaths);
    }, [isFlipped]);

    

    return (
        <section id="contact-section" className="contact-section-root">
            <div className="techstack-header-unique">
                <h2>
                    <span className="techstack-accent-unique">Contact</span>
                </h2>
                <p>
                    I’d love to hear from you! Whether it’s a project collaboration, a question, 
                    or just a friendly hello, feel free to reach out.
                </p>
            </div>

            <div className="contact-scene">
                {/* Animated SVG Curved Lines */}
                
                <div className={flipContainerClass}>
                <svg className="contact-curved-lines" ref={svgRef}>
    <defs>
        <linearGradient id="glowGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A2BE2">
                <animate attributeName="stop-color" values="#8A2BE2; #00FFFF; #FF00FF; #8A2BE2" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#00FFFF">
                <animate attributeName="stop-color" values="#00FFFF; #FF00FF; #8A2BE2; #00FFFF" dur="4s" repeatCount="indefinite" />
            </stop>
        </linearGradient>

        <filter id="glowFilter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>

    {paths.map((path, idx) => (
        <path
            key={idx}
            d={path}
            stroke="url(#glowGradient)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glowFilter)"
            strokeDasharray="1000"
            strokeDashoffset="1000"
        >
            <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="1.2s"
                begin={`${idx * 0.3}s`}
                fill="freeze"
            />
        </path>
    ))}
</svg>

                {/* FRONT FACE */}
                <div className="contact-card contact-card-face contact-card-front">
                        <div className="contact-front-content-wrapper">
                            <ul className="contact-social-media-list corner-icon-tl">
                                <SocialIconItem Icon={FaGithub} link="https://github.com/Vineethgm-Projects"/>
                            </ul>
                            <ul className="contact-social-media-list corner-icon-tr">
                                <SocialIconItem Icon={FaLinkedin} link="https://www.linkedin.com/in/vineethgm/"/>
                            </ul>
                            <div className="contact-button-container">
                                <button 
                                    className="cta contact-toggle-button"
                                    onClick={handleFlip}
                                >
                                    <span>Let's Get in Touch &nbsp;</span>
                                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                            </div>
                            <ul className="contact-social-media-list corner-icon-bl">
                                <SocialIconItem Icon={FaTwitter} />
                            </ul>
                            <ul className="contact-social-media-list corner-icon-br">
                                <SocialIconItem Icon={FaEnvelope} link="mailto:vineeth.gmhub@gmail.com"/>
                            </ul>
                        </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="contact-card contact-card-face contact-card-back">
                        <div className="contact-wrapper">
                            <form
                                id="contact-form"
                                className="contact-form-horizontal"
                                role="form"
                                onSubmit={handleSubmit}
                            >
                                <div className="contact-form-group">
                                    <div className="contact-col-sm-12">
                                        <input
                                            type="text"
                                            className="contact-form-control"
                                            id="contact-name"
                                            placeholder="NAME"
                                            name="contactName"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="contact-form-group">
                                    <div className="contact-col-sm-12">
                                        <input
                                            type="email"
                                            className="contact-form-control"
                                            id="contact-email"
                                            placeholder="EMAIL"
                                            name="contactEmail"
                                            required
                                        />
                                    </div>
                                </div>
                                <textarea
                                    className="contact-form-control contact-textarea"
                                    rows="10"
                                    placeholder="MESSAGE"
                                    name="contactMessage"
                                    required
                                ></textarea>
                                <button
                                    className="contact-btn contact-btn-primary contact-send-button"
                                    id="contact-submit"
                                    type="submit"
                                >
                                    <div className="contact-alt-send-button">
                                        <FaPaperPlane size={14} />
                                        <span className="contact-send-text">SEND</span>
                                    </div>
                                </button>
                            </form>
                        </div>
                        <div className="contact-social-media-container">
                            <ul className="contact-social-media-list">
                                <SocialIconItem Icon={FaGithub} link="https://github.com/Vineethgm-Projects"/>
                                <SocialIconItem Icon={FaLinkedin} link="https://www.linkedin.com/in/vineethgm/"/>
                                <SocialIconItem Icon={FaTwitter} />
                                <SocialIconItem Icon={FaEnvelope} link="mailto:vineeth.gmhub@gmail.com"/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

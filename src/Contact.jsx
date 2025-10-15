import React, { useState } from 'react';
import {
    FaPaperPlane,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    // State to track if the card should be flipped (showing the back/form)
    const [isFlipped, setIsFlipped] = useState(false);

    // Function to initiate the flip
    const handleFlip = () => {
        setIsFlipped(true);
    };

    // Basic form submission handler remains the same
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!');

        e.target.elements.contactName.value = '';
        e.target.elements.contactEmail.value = '';
        e.target.elements.contactMessage.value = '';

        alert('Thank you for your message!');
    };

    // Use isFlipped state to apply the necessary CSS class for rotation
    const flipContainerClass = `contact-flip-container ${
        isFlipped ? 'flipped' : ''
    }`;

    return (
        <section id="contact-section" className="contact-section-root">
            <h1 className="contact-section-header">Contact</h1>
            
            {/* The main card wrapper with perspective */}
            <div className="contact-scene">
                
                {/* The element that will actually rotate */}
                <div className={flipContainerClass}>

                    {/* === FRONT FACE: The Button === */}
                    <div className="contact-card contact-card-face contact-card-front">
                        <div className="contact-button-container">
                            
                            {/* NEW CTA BUTTON */}
                            <button 
                                className="cta contact-toggle-button" // Added contact-toggle-button for a consistent selector
                                onClick={handleFlip} // Triggers the flip
                            >
                                <span>Let's Get in Touch &nbsp;</span>
                                <svg viewBox="0 0 13 10" height="10px" width="15px">
                                    <path d="M1,5 L11,5"></path>
                                    <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                            </button>
                            {/* END NEW CTA BUTTON */}
                            
                        </div>
                    </div>

                    {/* === BACK FACE: The Form and Icons === */}
                    <div className="contact-card contact-card-face contact-card-back">
                        
                        <div className="contact-wrapper">
                            {/* Contact Form */}
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
                                    value="SEND"
                                >
                                    <div className="contact-alt-send-button">
                                        <FaPaperPlane size={14} />
                                        <span className="contact-send-text">SEND</span>
                                    </div>
                                </button>
                            </form>
                        </div>

                        {/* Social Media Icons */}
                        <div className="contact-social-media-container">
                            <ul className="contact-social-media-list">
                                <li>
                                    <a href="#" target="_blank" className="contact-icon" rel="noopener noreferrer">
                                        <FaGithub aria-hidden="true" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" className="contact-icon" rel="noopener noreferrer">
                                        <FaLinkedin aria-hidden="true" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" className="contact-icon" rel="noopener noreferrer">
                                        <FaTwitter aria-hidden="true" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" className="contact-icon" rel="noopener noreferrer">
                                        <FaInstagram aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> 
                    {/* END: Back Face */}

                </div> 
                {/* END: Flip Container */}
            </div> 
            {/* END: Scene */}

        </section>
    );
};

export default Contact;
import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Downloadbutton.css'; // Updated CSS filename

// Unique class prefix: dlbtn-

const AnimatedDownloadButton3 = ({ resumeUrl = '#' }) => {
  const [status, setStatus] = useState('idle'); // 'idle', 'active', 'done'
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  // --- Utility Functions (Translating jQuery Logic) ---

  const setLabel = useCallback((oldElement, newElement, callback) => {
    const labelDiv = buttonRef.current.querySelector('.dlbtn-label');
    
    // 1. Get the target width
    // Temporarily show the new element to measure its width
    newElement.classList.add('dlbtn-show'); 
    newElement.classList.remove('dlbtn-hide');
    const targetWidth = newElement.offsetWidth;
    newElement.classList.remove('dlbtn-show');
    
    // 2. Hide the old element instantly
    oldElement.classList.add('dlbtn-hide');

    // Animate the container width (simulating jQuery's .animate)
    labelDiv.style.width = `${targetWidth}px`; 

    // Use a short delay for the animation to complete
    setTimeout(() => {
      oldElement.classList.remove('dlbtn-show', 'dlbtn-hide');
      newElement.classList.add('dlbtn-show');
      newElement.classList.remove('dlbtn-hide');
      labelDiv.style.width = ''; // Remove inline style
      if (typeof callback === 'function') {
        callback();
      }
    }, 200); 
  }, []);

  // --- Click Handlers ---

  const handleDownloadClick = (e) => {
    e.preventDefault();

    const btn = buttonRef.current;
    if (status === 'active' || status === 'done') return;

    setStatus('active');

    const label = btn.querySelector('.dlbtn-label');
    const defaultLabel = label.querySelector('.dlbtn-default');
    const stateLabel = label.querySelector('.dlbtn-state');

    setLabel(defaultLabel, stateLabel);

    // Get the duration from CSS variable (converted to milliseconds)
    const durationMs = parseInt(
      getComputedStyle(btn).getPropertyValue('--duration')
    );

    // Timer for the animation to complete
    setTimeout(() => {
      const counter = label.querySelector('.dlbtn-counter');
      
      // Simulate the counter collapse animation
      counter.classList.add('dlbtn-hide');
      counter.style.width = '0px'; 
      
      setTimeout(() => {
          counter.style.width = '';
          setStatus('done');
          
          // Fix label width to fit "Done" text
          const doneTextWidth = label.querySelector('.dlbtn-state > span:last-child').offsetWidth;
          label.style.width = `${doneTextWidth}px`;
      }, 400); 

    }, durationMs);
  };
  
  const handleRestartClick = (e) => {
    e.preventDefault();

    const btn = buttonRef.current;
    const label = btn.querySelector('.dlbtn-label');
    const defaultLabel = label.querySelector('.dlbtn-default');
    const stateLabel = label.querySelector('.dlbtn-state');
    const counter = label.querySelector('.dlbtn-counter');

    // Reset the button state, then swap labels
    setLabel(stateLabel, defaultLabel, () => {
      counter.classList.remove('dlbtn-hide');
      btn.querySelector('.dlbtn-label').style.width = ''; 
      setStatus('idle');
    });
  };

  // --- Rendering ---
  
  // Combine CSS classes based on state
  const buttonClass = `dlbtn-button ${status === 'active' ? 'dlbtn-active' : ''} ${status === 'done' ? 'dlbtn-done' : ''}`;

  return (
    // Unique wrapper class
    <div className="dlbtn-wrapper" ref={wrapperRef}>
      <a
        ref={buttonRef}
        className={buttonClass}
        href={resumeUrl}
        onClick={handleDownloadClick}
      >
        <div>
          <div className='dlbtn-icon'>
            <div>
              <svg
                className='dlbtn-arrow'
                viewBox='0 0 20 18'
                fill='currentColor'
              >
                <polygon points='8 0 12 0 12 9 15 9 10 14 5 9 8 9' />
              </svg>
              <svg
                className='dlbtn-shape'
                viewBox='0 0 20 18'
                fill='currentColor'
              >
                <path d='M4.82668561,0 L15.1733144,0 C16.0590479,0 16.8392841,0.582583769 17.0909106,1.43182334 L19.7391982,10.369794 C19.9108349,10.9490677 19.9490212,11.5596963 19.8508905,12.1558403 L19.1646343,16.3248465 C19.0055906,17.2910371 18.1703851,18 17.191192,18 L2.80880804,18 C1.82961488,18 0.994409401,17.2910371 0.835365676,16.3248465 L0.149109507,12.1558403 C0.0509788145,11.5596963 0.0891651114,10.9490677 0.260801785,10.369794 L2.90908938,1.43182334 C3.16071592,0.582583769 3.94095214,0 4.82668561,0 Z' />
              </svg>
              <span />
            </div>
          </div>
          <div className='dlbtn-label'>
            <div className='dlbtn-show dlbtn-default'>&nbsp;Download Resume</div>
            <div className='dlbtn-state'>
              <div className='dlbtn-counter'>
                <ul>
                  <li></li>
                  <li>1</li>
                </ul>
                <ul>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((val) => (
                    <li key={val}>{val}</li>
                  ))}
                </ul>
                <ul>
                  {[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
                  ].map((val, index) => (
                    <li key={index}>{val}</li>
                  ))}
                </ul>
                <span>%</span>
              </div>
              <span>Resume Downloaded</span>
            </div>
          </div>
          <div className='dlbtn-progress' />
        </div>
      </a>
      
      {/* Restart Button */}
      
      
      {/* Dribbble Link */}
      <a
        className='dlbtn-dribbble'
        href='https://dribbble.com/shots/6766237-Download-Button-Animation'
        target='_blank'
      >
      </a>
    </div>
  );
};

export default AnimatedDownloadButton3;
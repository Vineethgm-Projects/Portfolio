import React, { useState } from "react";
import img2 from "./assets/file.png";
import img from "./assets/cv3.png";
import resume from "../public/VineethM_resume.pdf";

function DownloadImageButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={resume}
      download="Vineeth_Resume.pdf"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={hovered ? img : img2}
        alt="Download Resume"
        style={{
          cursor: "pointer",
          width: "29px",
          height: "28px",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      />
    </a>
  );
}

export default DownloadImageButton;

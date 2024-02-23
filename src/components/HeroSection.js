import React from "react";
import "./HeroSection.css";
import planetImage from "../images/planet-edu.jpg";

export default function HeroSection() {
  return (
    <div className="main_container">
      <div className="hero-section_desc">
        <div className="hero-section_desc1 hsd_child">
          <h1>Elevate Your Research with SciCollab's Collaborative Platform</h1>
          <p>
            Join a thriving community of researchers and scientists worldwide.
            Connect, explore, and innovate with fellow collaborators. Access a
            vast repository of shared data, models, and insights for your next
            breakthrough.
          </p>
        </div>

        <div className="hero-section_desc2 hsd_child">
          <h1>Tackle your next project with SciCollab</h1>
          <p>
            Discover the boundless resources and collaborative expertise on
            SciCollab for your next groundbreaking scientific endeavor.
          </p>
        </div>

        <div className="registerBtn ms-5">
          <button className="google_regBtn btn p-3">
            <i class="fa-brands fa-google"></i>Register using Google
          </button>
          <button className="email_regBtn btn ms-5">
            <i class="fa-solid fa-envelope"></i>Register using Email
          </button>
        </div>
      </div>
      <div className="hero-section_img">
        <img src={planetImage} alt="Planet" />
      </div>
    </div>
  );
}

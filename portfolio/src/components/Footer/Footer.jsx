import React from "react";
import "./Footer.css";

import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUp
} from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-left">
          <h2 className="logo">MyPortfolio</h2>
          <p>
            Building modern web experiences with React, Node.js & creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
  <h3>Quick Links</h3>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</div>

        {/* Social Links */}
        <div className="footer-social">
          <h3>Connect</h3>
          <div className="icons">
            <a href="https://github.com/mamtakurdia808-code" target="_blank" rel="noreferrer">
              <FiGithub />
            </a>

            <a href="https://linkedin.com/in/mamta-kurdia808" target="_blank" rel="noreferrer">
              <FiLinkedin />
            </a>

            <a href="mailto:mamtakurdia808@gmail.com">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyPortfolio. All rights reserved.</p>

        <button className="scroll-top" onClick={scrollToTop}>
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
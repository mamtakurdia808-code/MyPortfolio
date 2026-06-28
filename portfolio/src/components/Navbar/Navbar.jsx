import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiBookOpen,
  FiFolder,
  FiMail,
  FiDownload,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./Navbar.css";

const NAV_LINKS = [
  { path: "/", label: "Home", icon: <FiHome /> },
  { path: "/about", label: "About", icon: <FiUser /> },
  { path: "/skills", label: "Skills", icon: <FiCode /> },
  { path: "/projects", label: "Projects", icon: <FiFolder /> },
  { path: "/journey", label: "Journey", icon: <FiBriefcase /> },
  { path: "/education", label: "Education", icon: <FiBookOpen /> },
  { path: "/contact", label: "Contact", icon: <FiMail /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);

  /* Navbar shadow */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close drawer on outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.classList.toggle("nav-no-scroll", menuOpen);

    return () => {
      document.body.classList.remove("nav-no-scroll");
    };
  }, [menuOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`nav-overlay ${
          menuOpen ? "nav-overlay--visible" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Navbar */}
      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <nav className="navbar__inner">

          {/* Logo */}
          <NavLink
            to="/"
            className="navbar__brand"
            onClick={() => setMenuOpen(false)}
          >
            <span className="navbar__brand-first">Mamta</span>
            <span className="navbar__brand-last">Kurdia</span>
          </NavLink>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ path, label, icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    `navbar__link ${
                      isActive ? "navbar__link--active" : ""
                    }`
                  }
                >
                  <span className="navbar__link-icon">
                    {icon}
                  </span>

                  <span className="navbar__link-label">
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Resume + Mobile */}
          <div className="navbar__actions">
            <a
              href="/resume.pdf"
              download
              className="navbar__resume-btn"
            >
              <FiDownload />
              <span>Resume</span>
            </a>

            <button
              className={`navbar__hamburger ${
                menuOpen ? "navbar__hamburger--open" : ""
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="navbar__hamburger-icon">
                {menuOpen ? <FiX /> : <FiMenu />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <aside
        ref={menuRef}
        className={`nav-drawer ${
          menuOpen ? "nav-drawer--open" : ""
        }`}
      >
        <div className="nav-drawer__header">
          <div className="nav-drawer__brand">
            <span className="navbar__brand-first">Mamta</span>{" "}
            <span className="navbar__brand-last">Kurdia</span>
          </div>

          <button
            className="nav-drawer__close"
            onClick={() => setMenuOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <ul className="nav-drawer__links">
          {NAV_LINKS.map(({ path, label, icon }, i) => (
            <li
              key={path}
              className="nav-drawer__item"
              style={{ "--i": i }}
            >
              <NavLink
                to={path}
                end={path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `nav-drawer__link ${
                    isActive
                      ? "nav-drawer__link--active"
                      : ""
                  }`
                }
              >
                <span className="nav-drawer__icon">
                  {icon}
                </span>

                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-drawer__footer">
          <a
            href="/resume.pdf"
            download
            className="navbar__resume-btn navbar__resume-btn--full"
            onClick={() => setMenuOpen(false)}
          >
            <FiDownload />
            <span>Download Resume</span>
          </a>
        </div>
      </aside>
    </>
  );
}
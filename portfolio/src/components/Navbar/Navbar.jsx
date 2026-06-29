import { useState, useEffect, useRef } from "react";
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiBookOpen,
  FiFolder,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./Navbar.css";

const NAV_LINKS = [
  { id: "home", label: "Home", icon: <FiHome /> },
  { id: "about", label: "About", icon: <FiUser /> },
  { id: "skills", label: "Skills", icon: <FiCode /> },
  { id: "projects", label: "Projects", icon: <FiFolder /> },
  { id: "experience", label: "Journey", icon: <FiBriefcase /> },
  { id: "education", label: "Education", icon: <FiBookOpen /> },
  { id: "contact", label: "Contact", icon: <FiMail /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    document.body.classList.toggle("nav-no-scroll", menuOpen);

    return () => {
      document.body.classList.remove("nav-no-scroll");
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Overlay */}
      <div
        className={`nav-overlay ${
          menuOpen ? "nav-overlay--visible" : ""
        }`}
        onClick={closeMenu}
      />

      {/* Navbar */}
      <header
        className={`navbar ${
          scrolled ? "navbar--scrolled" : ""
        }`}
      >
        <nav className="navbar__inner">

          {/* Logo */}
          <a
            href="#home"
            className="navbar__brand"
            onClick={closeMenu}
          >
            <span className="navbar__brand-first">Mamta</span>
            <span className="navbar__brand-last">Kurdia</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ id, label, icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="navbar__link"
                >
                  <span className="navbar__link-icon">
                    {icon}
                  </span>

                  <span className="navbar__link-label">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="navbar__actions">
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
            <span className="navbar__brand-first">Mamta</span>
            <span className="navbar__brand-last">Kurdia</span>
          </div>

          <button
            className="nav-drawer__close"
            onClick={closeMenu}
          >
            <FiX />
          </button>
        </div>

        <ul className="nav-drawer__links">
          {NAV_LINKS.map(({ id, label, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={closeMenu}
                className="navbar__link"
              >
                <span className="navbar__link-icon">
                  {icon}
                </span>

                <span className="navbar__link-label">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
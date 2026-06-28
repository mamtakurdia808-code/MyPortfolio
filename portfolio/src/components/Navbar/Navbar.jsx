import { useState, useEffect, useRef } from "react";
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
  { id: "home",       label: "Home",       icon: <FiHome />       },
  { id: "about",      label: "About",      icon: <FiUser />       },
  { id: "skills",     label: "Skills",     icon: <FiCode />       },
  { id: "projects",   label: "Projects",   icon: <FiFolder /> },
  { id: "experience", label: "Experience", icon: <FiBriefcase />  },
  { id: "education",  label: "Education",  icon: <FiBookOpen />   },
  { id: "contact",    label: "Contact",    icon: <FiMail />       },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen,     setMenuOpen]     = useState(false);
  const menuRef = useRef(null);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Close menu on outside click ── */
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [menuOpen]);

  /* ── Prevent body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.classList.toggle("nav-no-scroll", menuOpen);
    return () => document.body.classList.remove("nav-no-scroll");
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`nav-overlay${menuOpen ? " nav-overlay--visible" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`} role="banner">
        <nav className="navbar__inner" aria-label="Primary navigation">

          {/* ── Brand ── */}
          <a
            href="#home"
            className="navbar__brand"
            onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
            aria-label="Mamta Kurdia – back to top"
          >
            <span className="navbar__brand-first">Mamta</span>
            <span className="navbar__brand-last">Kurdia</span>
          </a>

          {/* ── Desktop links ── */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map(({ id, label, icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`navbar__link${activeSection === id ? " navbar__link--active" : ""}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  <span className="navbar__link-icon" aria-hidden="true">{icon}</span>
                  <span className="navbar__link-label">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA + Hamburger ── */}
          <div className="navbar__actions">
            <a
              href="/resume.pdf"
              download
              className="navbar__resume-btn"
              aria-label="Download resume PDF"
            >
              <FiDownload aria-hidden="true" />
              <span>Resume</span>
            </a>

            <button
              className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="navbar__hamburger-icon">
                {menuOpen ? <FiX /> : <FiMenu />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      <aside
        id="mobile-menu"
        ref={menuRef}
        className={`nav-drawer${menuOpen ? " nav-drawer--open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
      >
        <div className="nav-drawer__header">
          <span className="nav-drawer__brand">
            <span className="navbar__brand-first">Mamta</span>
            <span className="navbar__brand-last"> Kurdia</span>
          </span>
          <button
            className="nav-drawer__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <nav aria-label="Mobile navigation links">
          <ul className="nav-drawer__links" role="list">
            {NAV_LINKS.map(({ id, label, icon }, i) => (
              <li
                key={id}
                className="nav-drawer__item"
                style={{ "--i": i }}
              >
                <a
                  href={`#${id}`}
                  className={`nav-drawer__link${activeSection === id ? " nav-drawer__link--active" : ""}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  <span className="nav-drawer__icon" aria-hidden="true">{icon}</span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-drawer__footer">
          <a
            href="/resume.pdf"
            download
            className="navbar__resume-btn navbar__resume-btn--full"
            aria-label="Download resume PDF"
            onClick={() => setMenuOpen(false)}
          >
            <FiDownload aria-hidden="true" />
            <span>Download Resume</span>
          </a>
        </div>
      </aside>
    </>
  );
}
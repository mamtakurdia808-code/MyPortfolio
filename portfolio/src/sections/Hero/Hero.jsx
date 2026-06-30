import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiTypescript,
  SiFigma,
  SiGit,
} from "react-icons/si";
import { socials } from "../../data/socials";
import "./Hero.css";

/* ────────────────────────────────────────────
   REDUCED MOTION — native matchMedia hook
   (avoids Framer Motion's useReducedMotion
    which can cause duplicate-React conflicts)
──────────────────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/* ────────────────────────────────────────────
   STATIC HERO CONTENT
──────────────────────────────────────────── */
const HERO_CONTENT = {
  greeting:    "Hello, I'm",
  name:        "Mamta Kurdia",
  titles:      ["Full Stack Developer"],
  description:
    "I craft responsive, accessible web applications with pixel-perfect UIs and build AI-powered full-stack products that turn complex ideas into real-world experiences.",
  buttons: [
    { label: "View Projects", to: "/projects", variant: "primary" },
    { label: "Download Resume", href: "/resume.pdf", variant: "outline", download: true  },
  ],
  image: "/profile.jpg",
};

/* ── Tech pills for the orbit ── */
const TECH_PILLS = [
  { label: "React",      icon: <SiReact      />, color: "#61DAFB" },
  { label: "Node.js",    icon: <SiNodedotjs  />, color: "#6CC24A" },
  { label: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { label: "Figma",      icon: <SiFigma      />, color: "#A259FF" },
  { label: "Git",        icon: <SiGit        />, color: "#F05032" },
];

/* ── Clock positions for the 6 pills ── */
const ORBIT_POSITIONS = [
  { top: "-12%",  left:  "50%",  right: undefined, translate: "-50%, 0",      delay: 0   },
  { top: "18%",   right: "-14%", left:  undefined,  translate: "0, -50%",     delay: 0.4 },
  { top: "62%",   right: "-10%", left:  undefined,  translate: "0, -50%",     delay: 0.8 },
  { top: "108%",  left:  "50%",  right: undefined,  translate: "-50%, -100%", delay: 1.2 },
  { top: "62%",   left:  "-12%", right: undefined,  translate: "0, -50%",     delay: 0.6 },
  { top: "18%",   left:  "-8%",  right: undefined,  translate: "0, -50%",     delay: 1.0 },
];

/* ────────────────────────────────────────────
   FRAMER MOTION VARIANTS
──────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ────────────────────────────────────────────
   TYPEWRITER HOOK
──────────────────────────────────────────── */
function useTypingCycle(titles, typingSpeed = 90, pause = 1600, deletingSpeed = 55) {
  const [displayed, setDisplayed] = useState("");
  const [titleIdx,  setTitleIdx]  = useState(0);
  const [phase,     setPhase]     = useState("typing");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplayed(titles[0]);
      return;
    }

    const current = titles[titleIdx];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pause);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 200);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      }
      setTitleIdx((i) => (i + 1) % titles.length);
      setPhase("typing");
    }
  }, [displayed, phase, titleIdx, titles, typingSpeed, pause, deletingSpeed, reduced]);

  return displayed;
}

/* ════════════════════════════════════════════
   HERO COMPONENT
════════════════════════════════════════════ */
export default function Hero() {
  const reduced    = usePrefersReducedMotion();
  const typedTitle = useTypingCycle(HERO_CONTENT.titles);

  /* Shared motion props helper */
  const fadeIn = (delay = 0) =>
    reduced
      ? {}
      : {
          initial:     "hidden",
          whileInView: "visible",
          viewport:    { once: true, amount: 0.2 },
          variants:    fadeUp(delay),
        };

  return (
    <section id="home" className="hero" aria-label="Hero introduction">

      {/* ── Background decoration ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-blob hero__bg-blob--1" />
        <div className="hero__bg-blob hero__bg-blob--2" />
        <div className="hero__bg-blob hero__bg-blob--3" />
      </div>

      <div className="hero__container">

        {/* ════════════════
            LEFT — TEXT
            ════════════════ */}
        <motion.div
          className="hero__content"
          {...(reduced
            ? {}
            : {
                variants:    staggerContainer,
                initial:     "hidden",
                whileInView: "visible",
                viewport:    { once: true, amount: 0.2 },
              })}
        >
          {/* Greeting */}
          <motion.p className="hero__greeting" {...fadeIn(0)}>
            <span className="hero__greeting-wave" aria-hidden="true"></span>
            {HERO_CONTENT.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1 className="hero__name" {...fadeIn(0.1)}>
            {HERO_CONTENT.name}
          </motion.h1>

          {/* Animated title */}
          <motion.div
            className="hero__title-wrap"
            {...fadeIn(0.2)}
            aria-label={`Role: ${typedTitle}`}
          >
            <span className="hero__title-prefix">I'm a </span>
            <span className="hero__title-typed" aria-live="polite">
              {typedTitle}
              <span className="hero__cursor" aria-hidden="true">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p className="hero__description" {...fadeIn(0.3)}>
            {HERO_CONTENT.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero__buttons" {...fadeIn(0.4)}>
  <a
    href="#projects"
    className="hero__btn hero__btn--primary"
  >
    View Projects
    <FiArrowRight aria-hidden="true" />
  </a>

  <a
    href="/resume.pdf"
    download
    className="hero__btn hero__btn--outline"
  >
    Download Resume
    <FiDownload aria-hidden="true" />
  </a>
</motion.div>

          {/* Socials — from src/data/socials.js */}
          <motion.div className="hero__socials" {...fadeIn(0.5)}>
            <span className="hero__socials-label">Find me on</span>
            <div className="hero__socials-icons" role="list">
              {socials.map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target={name !== "Email" ? "_blank" : undefined}
                  rel={name !== "Email" ? "noopener noreferrer" : undefined}
                  className="hero__social-link"
                  aria-label={name}
                  role="listitem"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ════════════════
            RIGHT — VISUAL
            ════════════════ */}
        <motion.div
          className="hero__visual"
          {...(reduced
            ? {}
            : {
                initial:     { opacity: 0, scale: 0.92 },
                whileInView: { opacity: 1, scale: 1 },
                viewport:    { once: true, amount: 0.3 },
                transition:  { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              })}
        >
          <motion.div
            className="hero__image-orbit"
            {...(reduced
              ? {}
              : {
                  animate: {
                    y: [-10, 10, -10],
                    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  },
                })}
          >
            <div className="hero__ring hero__ring--outer" aria-hidden="true" />
            <div className="hero__ring hero__ring--inner" aria-hidden="true" />

            {/* Profile image */}
            <div className="hero__avatar-frame">
              <img
                src={HERO_CONTENT.image}
                alt="Portrait of Mamta Kurdia, Frontend Developer"
                className="hero__avatar-img"
                loading="eager"
                draggable="false"
              />
              <div className="hero__avatar-glare" aria-hidden="true" />
            </div>

            {/* Floating tech pills */}
            {TECH_PILLS.map(({ label, icon, color }, i) => {
              const pos = ORBIT_POSITIONS[i % ORBIT_POSITIONS.length];
              return (
                <motion.div
                  key={label}
                  className="hero__tech-pill"
                  style={{
                    top:            pos.top,
                    left:           pos.left,
                    right:          pos.right,
                    "--translate":  pos.translate,
                    "--tech-color": color,
                  }}
                  {...(reduced
                    ? {}
                    : {
                        initial:     { opacity: 0, scale: 0.5 },
                        whileInView: { opacity: 1, scale: 1 },
                        viewport:    { once: true },
                        transition:  {
                          duration: 0.5,
                          delay:    0.5 + pos.delay,
                          ease:     [0.34, 1.56, 0.64, 1],
                        },
                        animate: {
                          y: [0, -6, 0],
                          transition: {
                            duration: 3 + i * 0.5,
                            repeat:   Infinity,
                            ease:     "easeInOut",
                            delay:    i * 0.3,
                          },
                        },
                      })}
                  title={label}
                  aria-label={label}
                >
                  <span className="hero__tech-icon" aria-hidden="true">{icon}</span>
                  <span className="hero__tech-label">{label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="hero__visual-blob hero__visual-blob--a" aria-hidden="true" />
          <div className="hero__visual-blob hero__visual-blob--b" aria-hidden="true" />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-hint"
        aria-hidden="true"
        {...(reduced
          ? {}
          : {
              initial:     { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport:    { once: true },
              transition:  { delay: 1.4, duration: 0.6 },
            })}
      >
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">scroll</span>
      </motion.div>

    </section>
  );
}
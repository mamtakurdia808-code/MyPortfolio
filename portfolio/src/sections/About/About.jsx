import { useEffect, useRef, useState } from "react";
import {
  FiFolder,
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiZap,
  FiLayout,
  FiCpu,
  FiLock,
  FiCode,
  FiTrendingUp,
} from "react-icons/fi";
import { education } from "../../data/education";
import { projects } from "../../data/projects";
import { experience } from "../../data/experience";
import { certificates } from "../../data/certificates";
import "./About.css";

/* ─── Stat cards derived from real data ─── */
function buildStats(edu, proj, exp, certs) {
  const grad = edu[0]?.duration?.split("–")[1]?.trim() ?? "2027";
  return [
    {
      icon:  <FiFolder aria-hidden="true" />,
      value: `${proj.length}+`,
      label: "Projects Completed",
    },
    {
      icon:  <FiBriefcase aria-hidden="true" />,
      value: `${exp.length}`,
      label: "Internship Experience",
    },
    {
      icon:  <FiAward aria-hidden="true" />,
      value: `${certs.length}+`,
      label: "Certifications",
    },
    {
      icon:  <FiCalendar aria-hidden="true" />,
      value: grad,
      label: "Expected Graduation",
    },
  ];
}

/* ─── Developer card identity lines ─── */
const devCardItems = [
  { emoji: "👩‍💻", text: "Full Stack Developer" },
  { emoji: "📍", text: "India" },
  { emoji: "🎓", text: "Bachelors of Computer Applications" },
  { emoji: "💼", text: "Open to Work" },
  { emoji: "🤖", text: "AI & MERN Enthusiast" },
  { emoji: "⚡", text: "Building scalable web applications" },
];

/* ─── Tech stack chips ─── */
const techChips = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "JavaScript",
  "Git",
  "GitHub",
  "REST APIs",
  "AI Integration",
];

/* ─── Core strength cards ─── */
const coreStrengths = [
  { icon: <FiZap aria-hidden="true" />, label: "Problem Solving" },
  { icon: <FiLayout aria-hidden="true" />, label: "Responsive UI" },
  { icon: <FiCpu aria-hidden="true" />, label: "AI Integration" },
  { icon: <FiLock aria-hidden="true" />, label: "Authentication" },
  { icon: <FiCode aria-hidden="true" />, label: "REST APIs" },
  { icon: <FiTrendingUp aria-hidden="true" />, label: "Continuous Learning" },
];

/* ─── Intersection-observer reveal hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ════════════════════════════════
   ABOUT COMPONENT
════════════════════════════════ */
export default function About() {
  const stats = buildStats(education, projects, experience, certificates);
  const [secRef,     secVis]     = useReveal(0.08);
  const [cardRef,    cardVis]    = useReveal(0.1);
  const [textRef,    textVis]    = useReveal(0.1);
  const [strengthRef, strengthVis] = useReveal(0.1);

  return (
    <section id="about" className="about" aria-labelledby="about-heading" ref={secRef}>

      {/* background accent */}
      <div className="about__bg" aria-hidden="true">
        <div className="about__bg-blob about__bg-blob--1" />
        <div className="about__bg-blob about__bg-blob--2" />
      </div>

      <div className="about__container">

        {/* ── Section label ── */}
        <div className={`about__eyebrow${secVis ? " about__eyebrow--visible" : ""}`}>
          <span className="about__eyebrow-line" aria-hidden="true" />
          <span className="about__eyebrow-text">Get to know me</span>
          <span className="about__eyebrow-line" aria-hidden="true" />
        </div>

        <div className="about__grid">

          {/* ════════════
              LEFT — DEVELOPER CARD
              ════════════ */}
          <div
            ref={cardRef}
            className={`about__card-wrap${cardVis ? " about__card-wrap--visible" : ""}`}
          >
            <div className="about__dev-card" role="group" aria-label="Developer profile summary">
              <ul className="about__dev-list">
                {devCardItems.map(({ emoji, text }) => (
                  <li className="about__dev-item" key={text}>
                    <span className="about__dev-emoji" aria-hidden="true">{emoji}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <hr className="about__dev-divider" aria-hidden="true" />

              <div
                className="about__chip-row"
                role="list"
                aria-label="Technologies I work with"
              >
                {techChips.map((chip, i) => (
                  <span
                    role="listitem"
                    key={chip}
                    className="about__chip"
                    style={{ "--chip-delay": `${0.5 + i * 0.05}s` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════
              RIGHT — TEXT
              ════════════ */}
          <div
            ref={textRef}
            className={`about__content${textVis ? " about__content--visible" : ""}`}
          >
            <h2 id="about-heading" className="about__heading about__reveal about__reveal--1">
              About <span className="about__heading-accent">Me</span>
            </h2>

            <div className="about__bio about__reveal about__reveal--2">
              <p>
                I'm a <strong>Full Stack Developer</strong> focused on building
                production-grade web applications with <strong>React</strong> on
                the frontend and robust, scalable systems on the backend. My
                work spans the entire stack — from designing REST APIs and
                authentication flows to crafting interfaces that are fast,
                accessible, and responsive across devices.
              </p>
              <p>
                I enjoy solving hard problems: structuring databases for
                performance, optimizing render cycles, and architecting code
                that stays maintainable as projects grow. Every feature I
                ship is built with both the user experience and the
                underlying system in mind.
              </p>
              <p>
                I'm also actively exploring <strong>AI integration</strong> in
                real products — using tools like the Groq API to power
                features such as ATS resume analysis and intelligent
                feedback systems. I'm looking for an internship where I can
                bring this combination of full-stack engineering and applied
                AI to a team solving meaningful problems.
              </p>
            </div>

            {/* ── Stat cards ── */}
            <div
              className="about__stats about__reveal about__reveal--3"
              role="list"
              aria-label="Quick stats"
            >
              {stats.map(({ icon, value, label }, i) => (
                <article
                  key={label}
                  className="about__stat-card"
                  role="listitem"
                  style={{ "--card-delay": `${0.55 + i * 0.08}s` }}
                >
                  <div className="about__stat-icon">{icon}</div>
                  <div className="about__stat-value">{value}</div>
                  <div className="about__stat-label">{label}</div>
                </article>
              ))}
            </div>
          </div>

        </div>

        {/* ════════════
            CORE STRENGTHS
            ════════════ */}
        <div
          ref={strengthRef}
          className={`about__strengths${strengthVis ? " about__strengths--visible" : ""}`}
        >
          <h3 className="about__strengths-heading">Core Strengths</h3>
          <div className="about__strengths-grid" role="list" aria-label="Core strengths">
            {coreStrengths.map(({ icon, label }, i) => (
              <article
                key={label}
                className="about__strength-card"
                role="listitem"
                style={{ "--strength-delay": `${i * 0.07}s` }}
              >
                <div className="about__strength-icon">{icon}</div>
                <div className="about__strength-label">{label}</div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
import { useEffect, useRef, useState } from "react";
import { FiFolder, FiBriefcase, FiAward, FiCalendar } from "react-icons/fi";
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
  const [secRef,  secVis]  = useReveal(0.08);
  const [imgRef,  imgVis]  = useReveal(0.1);
  const [textRef, textVis] = useReveal(0.1);

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
              LEFT — IMAGE
              ════════════ */}
          <div
            ref={imgRef}
            className={`about__image-wrap${imgVis ? " about__image-wrap--visible" : ""}`}
          >
            {/* decorative card stack */}
            <div className="about__img-stack" aria-hidden="true">
              <div className="about__img-card about__img-card--back" />
              <div className="about__img-card about__img-card--mid"  />
            </div>

            <div className="about__img-frame">
              <img
                src="/profile.jpg"
                alt="Mamta Kurdia — Full Stack Developer"
                className="about__img"
                loading="lazy"
                draggable="false"
              />
              <div className="about__img-glare" aria-hidden="true" />
            </div>

            {/* floating badge */}
            <div className="about__badge" aria-label="Open to work">
              <span className="about__badge-dot" aria-hidden="true" />
              Open to Work
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
                I'm a passionate <strong>Full Stack Developer</strong> 
                who loves turning ideas into polished, performant web 
                experiences. Building products that are both beautiful 
                and functional is what drives me every day.
              </p>
              <p>
                I've developed real-world full-stack applications — from
                authentication systems and REST APIs to responsive dashboards
                — gaining hands-on experience that goes well beyond the
                classroom.
              </p>
              <p>
                I'm deeply interested in <strong>AI-powered solutions</strong>,
                having integrated tools like the Groq API to build intelligent
                features such as ATS resume analysis and AI-driven feedback
                systems. I believe great software solves real problems, and I'm
                always looking for the next one worth solving.
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
      </div>
    </section>
  );
}
import { useRef, useState, useEffect } from "react";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import { experience } from "../../data/experience";
import "./Experience.css";

/* ─── Intersection-observer reveal (reusable) ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Spine draw progress (tracks how far user has scrolled into the list) ─── */
function useSpineProgress(listRef) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = listRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const scrolled = winH - top;
      const pct = Math.min(Math.max(scrolled / (height + winH * 0.3), 0), 1);
      setProgress(pct);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [listRef]);
  return progress;
}

/* ─── Tech badge ─── */
function TechBadge({ name }) {
  return <span className="exp__badge">{name}</span>;
}

/* ─── Single experience card ─── */
function ExperienceCard({ exp, index }) {
  const [ref, visible] = useReveal(0.1);
  const isLeft = index % 2 === 0; // even → card on left side

  const {
    role, company, location, duration,
    type, description, technologies, current,
  } = exp;

  return (
    <div
      ref={ref}
      className={[
        "exp__item",
        isLeft  ? "exp__item--left"    : "exp__item--right",
        visible ? "exp__item--visible" : "",
      ].filter(Boolean).join(" ")}
      style={{ "--item-delay": `${index * 0.1}s` }}
    >
      {/* ── Timeline node ── */}
      <div className="exp__node" aria-hidden="true">
        <div className={`exp__dot${current ? " exp__dot--current" : ""}`}>
          <FiBriefcase className="exp__dot-icon" />
        </div>
        {current && <div className="exp__pulse" />}
      </div>

      {/* ── Card ── */}
      <article className="exp__card" aria-label={`${role} at ${company}`}>

        {/* current badge */}
        {current && (
          <span className="exp__current-badge" aria-label="Current position">
            Current
          </span>
        )}

        {/* header */}
        <header className="exp__card-header">
          <h3 className="exp__role">{role}</h3>
          <div className="exp__meta">
            <span className="exp__company">
              <FiBriefcase className="exp__meta-icon" aria-hidden="true" />
              {company}
            </span>
            {location && (
              <span className="exp__location">
                <FiMapPin className="exp__meta-icon" aria-hidden="true" />
                {location}
              </span>
            )}
            <span className="exp__duration">
              <FiCalendar className="exp__meta-icon" aria-hidden="true" />
              {duration}
            </span>
            {type && (
              <span className="exp__type">{type}</span>
            )}
          </div>
        </header>

        {/* description bullets */}
        {description?.length > 0 && (
          <ul className="exp__bullets" aria-label="Responsibilities and achievements">
            {description.map((point, i) => (
              <li key={i} className="exp__bullet">{point}</li>
            ))}
          </ul>
        )}

        {/* tech stack */}
        {technologies?.length > 0 && (
          <div className="exp__tech" aria-label="Technologies used">
            <span className="exp__tech-label">Stack</span>
            <div className="exp__badges">
              {technologies.map((t) => <TechBadge key={t} name={t} />)}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}

/* ════════════════════════════════
   EXPERIENCE SECTION
════════════════════════════════ */
export default function Experience() {
  const [headRef, headVis] = useReveal(0.1);
  const listRef = useRef(null);
  const spineProgress = useSpineProgress(listRef);

  return (
    <section id="experience" className="experience" aria-labelledby="exp-heading">

      {/* background blobs */}
      <div className="experience__bg" aria-hidden="true">
        <div className="experience__bg-blob experience__bg-blob--1" />
        <div className="experience__bg-blob experience__bg-blob--2" />
      </div>

      <div className="experience__container">

        {/* ── Section heading ── */}
        <div
          ref={headRef}
          className={`experience__header${headVis ? " experience__header--visible" : ""}`}
        >
          <div className="experience__eyebrow">
            <span className="experience__eyebrow-line" aria-hidden="true" />
            <span className="experience__eyebrow-text">Where I've worked</span>
            <span className="experience__eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="exp-heading" className="experience__heading">
            Work <span className="experience__heading-accent">Experience</span>
          </h2>
          <p className="experience__subheading">
            My professional journey — building products, shipping features,
            and growing across diverse teams.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="exp__timeline" ref={listRef} role="list">

          {/* animated spine */}
          <div className="exp__spine" aria-hidden="true">
            <div
              className="exp__spine-fill"
              style={{ transform: `scaleY(${spineProgress})` }}
            />
          </div>

          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id ?? i} exp={exp} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
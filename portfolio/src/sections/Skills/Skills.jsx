import { useRef, useState, useEffect } from "react";
import { skills } from "../../data/skills";
import "./Skills.css";

/* ─── category accent colours ─── */
const CATEGORY_META = {
  "Frontend":          { color: "#5b50e8", glow: "rgba(91,80,232,0.18)"  },
  "Backend":           { color: "#0ea5e9", glow: "rgba(14,165,233,0.18)" },
  "Database":          { color: "#22c55e", glow: "rgba(34,197,94,0.18)"  },
  "AI & Integrations": { color: "#a855f7", glow: "rgba(168,85,247,0.18)" },
  "Tools & Platforms": { color: "#f59e0b", glow: "rgba(245,158,11,0.18)" },
};

/* ─── Intersection-observer reveal (no Framer Motion) ─── */
function useReveal(threshold = 0.12) {
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

/* ─── Individual skill chip ─── */
function SkillChip({ name, icon: Icon, accentColor }) {
  return (
    <li
      className="skill__chip"
      style={{ "--chip-accent": accentColor }}
    >
      {Icon && (
        <span className="skill__chip-icon" aria-hidden="true">
          <Icon />
        </span>
      )}
      <span className="skill__chip-name">{name}</span>
    </li>
  );
}

/* ─── Category card ─── */
function CategoryCard({ category, items, index }) {
  const meta   = CATEGORY_META[category] ?? { color: "#5b50e8", glow: "rgba(91,80,232,0.18)" };
  const [ref, visible] = useReveal(0.1);

  return (
    <article
      ref={ref}
      className={`skills__card${visible ? " skills__card--visible" : ""}`}
      style={{
        "--card-accent": meta.color,
        "--card-glow":   meta.glow,
        "--card-delay":  `${index * 0.11}s`,
      }}
      aria-label={`${category} skills`}
    >
      {/* card top bar */}
      <div className="skills__card-bar" aria-hidden="true" />

      <header className="skills__card-header">
        <h3 className="skills__card-title">{category}</h3>
        <span className="skills__card-count" aria-label={`${items.length} skills`}>
          {items.length}
        </span>
      </header>

      <ul className="skills__chip-list" role="list">
        {items.map(({ name, icon }) => (
          <SkillChip
            key={name}
            name={name}
            icon={icon}
            accentColor={meta.color}
          />
        ))}
      </ul>
    </article>
  );
}

/* ════════════════════════════════
   SKILLS SECTION
════════════════════════════════ */
export default function Skills() {
  const [headRef, headVis] = useReveal(0.1);

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">

      {/* background */}
      <div className="skills__bg" aria-hidden="true">
        <div className="skills__bg-blob skills__bg-blob--1" />
        <div className="skills__bg-blob skills__bg-blob--2" />
        <div className="skills__bg-blob skills__bg-blob--3" />
      </div>

      <div className="skills__container">

        {/* ── heading ── */}
        <div
          ref={headRef}
          className={`skills__header${headVis ? " skills__header--visible" : ""}`}
        >
          <div className="skills__eyebrow">
            <span className="skills__eyebrow-line" aria-hidden="true" />
            <span className="skills__eyebrow-text">What I work with</span>
            <span className="skills__eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="skills-heading" className="skills__heading">
            My <span className="skills__heading-accent">Skills</span>
          </h2>
          <p className="skills__subheading">
            A curated toolkit I use to build fast, accessible, and
            AI-powered web products from design to deployment.
          </p>
        </div>

        {/* ── cards grid ── */}
        <div className="skills__grid" role="list">
          {skills.map(({ category, items }, i) => (
            <CategoryCard
              key={category}
              category={category}
              items={items}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
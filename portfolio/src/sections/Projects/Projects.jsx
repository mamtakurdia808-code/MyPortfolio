import { useRef, useState, useEffect } from "react";
import { FiGithub, FiExternalLink, FiStar, FiZap } from "react-icons/fi";
import { projects } from "../../data/projects";
import "./Projects.css";

/* ─── Intersection-observer reveal ─── */
function useReveal(threshold = 0.1) {
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

/* ─── Tech badge ─── */
function TechBadge({ name }) {
  return <span className="project__badge">{name}</span>;
}

/* ─── Feature tag ─── */
function FeatureTag({ name }) {
  return (
    <span className="project__feature">
      <FiZap className="project__feature-icon" aria-hidden="true" />
      {name}
    </span>
  );
}

/* ─── Single project card ─── */
function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal(0.08);
  const isEven         = index % 2 === 0;

  const {
    title, image, description,
    technologies, features,
    github, live, status, featured,
  } = project;

  return (
    <article
      ref={ref}
      className={[
        "project__card",
        featured   ? "project__card--featured" : "",
        isEven     ? "project__card--even"     : "project__card--odd",
        visible    ? "project__card--visible"  : "",
      ].filter(Boolean).join(" ")}
      style={{ "--card-delay": `${index * 0.08}s` }}
      aria-label={title}
    >
      {/* featured ribbon */}
      {featured && (
        <div className="project__ribbon" aria-label="Featured project">
          <FiStar aria-hidden="true" />
          Featured
        </div>
      )}

      {/* ── Image ── */}
      <div className="project__img-wrap">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          className="project__img"
          loading="lazy"
          draggable="false"
        />
        <div className="project__img-overlay" aria-hidden="true" />

        {/* status pill over image */}
        <span
          className={`project__status project__status--${status?.toLowerCase().replace(/\s/g, "-")}`}
          aria-label={`Status: ${status}`}
        >
          {status}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="project__content">
        <header className="project__header">
          <h3 className="project__title">{title}</h3>
        </header>

        <p className="project__description">{description}</p>

        {/* Tech stack */}
        {technologies?.length > 0 && (
          <div className="project__tech" aria-label="Technologies used">
            <span className="project__section-label">Tech Stack</span>
            <div className="project__badges">
              {technologies.map((t) => <TechBadge key={t} name={t} />)}
            </div>
          </div>
        )}

        {/* Features */}
        {features?.length > 0 && (
          <div className="project__features-wrap" aria-label="Key features">
            <span className="project__section-label">Key Features</span>
            <div className="project__features">
              {features.map((f) => <FeatureTag key={f} name={f} />)}
            </div>
          </div>
        )}

        {/* Buttons */}
        <footer className="project__actions">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="project__btn project__btn--outline"
              aria-label={`View ${title} source on GitHub`}
            >
              <FiGithub aria-hidden="true" />
              Source Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="project__btn project__btn--primary"
              aria-label={`Open ${title} live demo`}
            >
              <FiExternalLink aria-hidden="true" />
              Live Demo
            </a>
          )}
        </footer>
      </div>
    </article>
  );
}

/* ════════════════════════════════
   PROJECTS SECTION
════════════════════════════════ */
export default function Projects() {
  const [headRef, headVis] = useReveal(0.1);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">

      {/* background */}
      <div className="projects__bg" aria-hidden="true">
        <div className="projects__bg-blob projects__bg-blob--1" />
        <div className="projects__bg-blob projects__bg-blob--2" />
      </div>

      <div className="projects__container">

        {/* heading */}
        <div
          ref={headRef}
          className={`projects__header${headVis ? " projects__header--visible" : ""}`}
        >
          <div className="projects__eyebrow">
            <span className="projects__eyebrow-line" aria-hidden="true" />
            <span className="projects__eyebrow-text">What I've built</span>
            <span className="projects__eyebrow-line" aria-hidden="true" />
          </div>
          <h2 id="projects-heading" className="projects__heading">
            Featured <span className="projects__heading-accent">Projects</span>
          </h2>
          <p className="projects__subheading">
            Real-world applications built with modern stacks — from
            AI-powered tools to full-stack platforms.
          </p>
        </div>

        {/* project cards */}
        <div className="projects__list" role="list">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
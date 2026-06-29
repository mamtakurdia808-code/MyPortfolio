import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GiGraduateCap } from "react-icons/gi";
import { education } from "../../data/education";
import "./Education.css";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.12 },
  }),
};

const lineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.9, ease: "easeInOut", delay: 0.2 },
  },
};

/* ─── SGPA bar ─── */
function SgpaBar({ value }) {
  const numericValue = parseFloat(value);
  const pct = (numericValue / 10) * 100;

  return (
    <div
      className="edu-sgpa-bar-track"
      role="progressbar"
      aria-valuenow={numericValue}
      aria-valuemin={0}
      aria-valuemax={10}
      aria-label={`${value} out of 10`}
    >
      <motion.div
        className="edu-sgpa-bar-fill"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: pct / 100 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* ─── Semester card ─── */
function SemesterCard({ sem, index }) {
  const gradeNum = sem.grade.replace(" SGPA", "");
  return (
    <motion.div
      className="edu-sem-card"
      variants={fadeUp}
      custom={index * 0.6}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      <span className="edu-sem-label">{sem.semester}</span>
      <span className="edu-sem-grade">{gradeNum}</span>
      <SgpaBar value={gradeNum} />
    </motion.div>
  );
}

/* ─── Education entry ─── */
function EducationEntry({ entry, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="edu-entry"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={`${entry.degree} at ${entry.college}`}
    >
      {/* timeline node */}
      <div className="edu-node" aria-hidden="true">
        <motion.div
          className="edu-node-ring"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 180 }}
        >
          <GiGraduateCap className="edu-node-icon" />
        </motion.div>
      </div>

      {/* card body */}
      <div className="edu-card glass">
        {/* header */}
        <header className="edu-card-header">
          <div className="edu-card-meta">
            <h3 className="edu-degree">{entry.degree}</h3>
            <p className="edu-college">{entry.college}</p>
            <span className="edu-duration">{entry.duration}</span>
          </div>

          {/* CGPA badge */}
          <div className="edu-cgpa-badge" aria-label={`CGPA ${entry.cgpa}`}>
            <span className="edu-cgpa-value">{entry.cgpa}</span>
            <span className="edu-cgpa-label">CGPA</span>
          </div>
        </header>

        {/* divider */}
        <div className="edu-divider" aria-hidden="true" />

        {/* semesters */}
        <section aria-label="Semester grades">
          <p className="edu-sem-heading">Semester Performance</p>
          <div className="edu-sem-grid">
            {entry.semesters.map((sem, i) => (
              <SemesterCard key={sem.semester} sem={sem} index={i} />
            ))}
          </div>
        </section>
      </div>
    </motion.article>
  );
}

/* ─── Main section ─── */
export default function Education() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="edu-section" id="education" aria-labelledby="edu-heading">
      <motion.div
        className="edu-section-title"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className="edu-eyebrow">Academic Background</span>
        <h2 id="edu-heading" className="edu-heading">Education</h2>
      </motion.div>

      <div className="edu-timeline" ref={lineRef}>
        <motion.div
          className="edu-timeline-line"
          variants={lineGrow}
          initial="hidden"
          animate={lineInView ? "visible" : "hidden"}
          style={{ transformOrigin: "top" }}
          aria-hidden="true"
        />

        {education.map((entry, i) => (
          <EducationEntry key={entry.degree} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
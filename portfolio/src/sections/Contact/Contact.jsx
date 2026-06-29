import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCheckCircle, HiArrowRight } from "react-icons/hi";
import { contactInfo, formFields } from "../../data/contact";
import "./Contact.css";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.25 },
  },
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstFieldRef = useRef(null);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const next = validate();

  if (Object.keys(next).length) {
    setErrors(next);
    const firstError = Object.keys(next)[0];
    document.getElementById(firstError)?.focus();
    return;
  }

  setSubmitting(true);

  try {
    console.log(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }),
    });

    const result = await response.json();
    console.log(result);
    
    if (result.success) {
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});
    } else {
      alert("Failed to send message. Please try again.");
      console.error(result);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  const handleReset = () => {
    setSubmitted(false);
    setForm(INITIAL_FORM);
    setErrors({});
    setTimeout(() => firstFieldRef.current?.focus(), 100);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-container">
        {/* ── Left panel ── */}
        <motion.div
          className="contact-info"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p className="contact-eyebrow" variants={fadeUp} custom={0}>
            Get in touch
          </motion.p>

          <motion.h2 className="contact-heading" id="contact-heading" variants={fadeUp} custom={1}>
            {contactInfo.heading}
            <span className="contact-heading-accent"> {contactInfo.subheading}</span>
          </motion.h2>

          <motion.p className="contact-description" variants={fadeUp} custom={2}>
            {contactInfo.description}
          </motion.p>

          <motion.ul className="contact-links" variants={fadeUp} custom={3} role="list">
            {contactInfo.links.map(({ id, label, href, Icon, ariaLabel }) => (
              <li key={id}>
                <a
                  href={href}
                  className="contact-link"
                  aria-label={ariaLabel}
                  target={id !== "email" ? "_blank" : undefined}
                  rel={id !== "email" ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-link-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="contact-link-label">{label}</span>
                  <span className="contact-link-arrow" aria-hidden="true">
                    <HiArrowRight />
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Right panel — form / success ── */}
        <motion.div
          className="contact-form-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="contact-success"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="status"
                aria-live="polite"
              >
                <span className="contact-success-icon" aria-hidden="true">
                  <HiOutlineCheckCircle />
                </span>
                <h3 className="contact-success-title">Message sent!</h3>
                <p className="contact-success-body">
                  Thanks for reaching out. I'll be in touch within 24 hours.
                </p>
                <button className="contact-reset-btn" onClick={handleReset}>
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                variants={successVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                aria-label="Contact form"
              >
                {formFields.map((field, i) => (
                  <div
                    key={field.id}
                    className={`contact-field${errors[field.name] ? " contact-field--error" : ""}`}
                  >
                    <label className="contact-label" htmlFor={field.id}>
                      {field.label}
                    </label>
                    <input
                      ref={i === 0 ? firstFieldRef : undefined}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="contact-input"
                      aria-describedby={errors[field.name] ? `${field.id}-error` : undefined}
                      aria-invalid={!!errors[field.name]}
                    />
                    {errors[field.name] && (
                      <span
                        id={`${field.id}-error`}
                        className="contact-error"
                        role="alert"
                      >
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}

                {/* Message textarea */}
                <div className={`contact-field contact-field--full${errors.message ? " contact-field--error" : ""}`}>
                  <label className="contact-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, timeline, or just say hi…"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="contact-textarea"
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span id="message-error" className="contact-error" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Animated submit */}
                <motion.button
                  type="submit"
                  className="contact-submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  aria-busy={submitting}
                >
                  <span className="contact-submit-fill" aria-hidden="true" />
                  <span className="contact-submit-label">
                    {submitting ? (
                      <>
                        <span className="contact-spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <HiArrowRight className="contact-submit-arrow" aria-hidden="true" />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
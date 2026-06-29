import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export const contactInfo = {
  heading: "Let's Build Something",
  subheading: "Exceptional Together",
  description:
    "I'm currently open to new opportunities — whether it's a full-time role, freelance project, or just a great conversation about frontend craft. Drop me a message and I'll get back to you within 24 hours.",
  links: [
    {
      id: "email",
      label: "mamtakurdia808@gmail.com",
      href: "mailto:mamtakurdia808@gmail.com",
      Icon: HiOutlineMail,
      ariaLabel: "Send an email",
    },
    {
      id: "github",
      label: "github.com/mamtakurdia808-code",
      href: "https://github.com/mamtakurdia808-code",
      Icon: FaGithub,
      ariaLabel: "Visit GitHub profile",
    },
    {
      id: "linkedin",
      label: "linkedin.com/in/mamta-kurdia808",
      href: "https://linkedin.com/in/mamta-kurdia808",
      Icon: FaLinkedin,
      ariaLabel: "Visit LinkedIn profile",
    },
  ],
};

export const formFields = [
  {
    id: "name",
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Jane Smith",
    autoComplete: "name",
    required: true,
  },
  {
    id: "email",
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "jane@company.com",
    autoComplete: "email",
    required: true,
  },
  {
    id: "subject",
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Project Inquiry / Job Opportunity",
    autoComplete: "off",
    required: true,
  },
];
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";

import {
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiVite,
  SiPostman,
  SiCloudinary,
  SiJsonwebtokens,
  SiRender,
  SiVercel,
  SiGroq,
} from "react-icons/si";

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "JavaScript (ES6+)", icon: FaJs },
      { name: "React.js", icon: FaReact },
      { name: "Responsive Web Design" },
    ],
  },

  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs" },
      { name: "JWT Authentication", icon: SiJsonwebtokens },
      { name: "Cloudinary", icon: SiCloudinary },
    ],
  },

  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },

  {
  category: "AI & Integrations",
  items: [
    { name: "Groq API", icon: SiGroq },
    { name: "AI Resume Review" },
    { name: "ATS Resume Analysis" },
    { name: "Prompt Engineering" },
  ],
},

  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", icon: FaGitAlt },
      { name: "GitHub", icon: FaGithub },
      { name: "Vite", icon: SiVite },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
      { name: "Figma", icon: FaFigma },
      { name: "VS Code" },
    ],
  },
];
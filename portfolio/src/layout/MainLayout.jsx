import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import Home from "../sections/Hero/Hero";
import About from "../sections/About/About";
import Education from "../sections/Education/Education";
import Skills from "../sections/Skills/Skills";
import Experience from "../sections/Experience/Experience";
import Projects from "../sections/Projects/Projects";
import Contact from "../sections/Contact/Contact";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <Home />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Contact />

      <Footer />
    </>
  );
}
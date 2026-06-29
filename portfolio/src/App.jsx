import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
// Pages
import Home from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Skills from "./sections/Skills/Skills"
import Projects from "./sections/Projects/Projects";
import Experience from "./sections/Experience/Experience";
import Education from "./sections/Education/Education";
import Contact from "./sections/Contact/Contact";

function App() {
  return (
    <>

      <MainLayout />
      <Home />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Contact />

    </>
  );
}

export default App;
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Resume from './components/Resume';
import RohanChat from './components/RohanChat';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <RohanChat />
    </div>
  );
}

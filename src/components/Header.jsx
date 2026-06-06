import React from 'react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="logo">Rohan Sakthivel</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
          <a className="cta" href="/resume.pdf" target="_blank" rel="noreferrer">Resume PDF</a>
        </nav>
      </div>
    </header>
  );
}

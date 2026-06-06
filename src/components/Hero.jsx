import React from 'react';
import { FaBrain } from 'react-icons/fa';

const profile = 'https://rohanskt.github.io/web/images/Rohan.png';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge"><FaBrain /> Data Scientist</div>
          <h2>Rohan Sakthivel P</h2>
          <h3>Building ML solutions for enterprise-scale problems</h3>
          <p>Data Scientist at TCS with 1+ years of experience in predictive modeling, ML pipelines, and agentic AI. Specialized in capacity forecasting, anomaly detection, and GenAI workflows on GCP and Kubeflow.</p>
          <div className="hero-stats">
            <div className="stat"><strong>1+</strong> years experience</div>
            <div className="stat"><strong>3+</strong> production ML models</div>
            <div className="stat"><strong>8.4</strong> CGPA</div>
          </div>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
        <div className="hero-image">
          <img src={profile} alt="Rohan" />
        </div>
      </div>
    </section>
  );
}

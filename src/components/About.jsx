import React from 'react';
import { FaGraduationCap, FaMapPin, FaCalendarAlt } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>I'm a Data Scientist passionate about solving real-world infrastructure and business problems at scale. Currently at TCS, I design and deploy predictive models, capacity forecasting systems, and agentic AI workflows on enterprise-grade platforms like GCP.</p>
            <p>My background in Medical Electronics combined with hands-on experience in ML pipelines, data processing, and production deployment gives me a unique perspective on building robust, scalable solutions.</p>
            <p>I love learning emerging technologies and applying them to meaningful problems—from capacity optimization to anomaly detection to generative AI applications.</p>
          </div>
          <div className="about-details">
            <div className="detail-card">
              <FaGraduationCap />
              <h4>Education</h4>
              <p>B.E. Medical Electronics<br/>Saveetha Engineering College<br/><strong>CGPA: 8.4</strong></p>
            </div>
            <div className="detail-card">
              <FaMapPin />
              <h4>Location</h4>
              <p>Chennai, India</p>
            </div>
            <div className="detail-card">
              <FaCalendarAlt />
              <h4>Current Role</h4>
              <p>Data Scientist<br/>Tata Consultancy Services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
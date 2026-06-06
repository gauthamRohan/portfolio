import React from 'react';
import resumeData from '../data/resume.json';
import { FaBriefcase, FaGraduationCap, FaTools, FaFilePdf, FaEnvelope } from 'react-icons/fa';

function IconFor(section){
  if(section === 'experience') return <FaBriefcase />;
  if(section === 'education') return <FaGraduationCap />;
  if(section === 'skills') return <FaTools />;
  return <FaFilePdf />;
}

export default function ResumeDetails(){
  const resume = resumeData || {};
  const sections = resume.sections || {};

  return (
    <section id="resume" className="resume">
      <div className="container">
        <h2>Resume</h2>
        <div className="resume-grid">
          <aside className="resume-side">
            <div className="profile">
              <img src="https://rohanskt.github.io/web/images/Rohan.png" alt="Rohan" />
              <h3>{resume.name || 'Rohan Sakthivel'}</h3>
              <p className="muted">Data Scientist — Chennai</p>
              <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer"><FaFilePdf style={{marginRight:8}}/>Download PDF</a>
            </div>
            {sections.contact && (
              <div className="card contact-card">
                <h4>Contact</h4>
                <p>{sections.contact.join(' ')}</p>
                <a href="mailto:rohanpkg07@gmail.com">rohanpkg07@gmail.com</a>
              </div>
            )}
          </aside>

          <div className="resume-main">
            {sections.experience && (
              <div className="timeline-section">
                <h3>{IconFor('experience')} Experience</h3>
                <ul className="timeline">
                  {sections.experience.map((item, i) => (
                    <li key={i} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">{item}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections.education && (
              <div className="timeline-section">
                <h3>{IconFor('education')} Education</h3>
                <ul className="timeline">
                  {sections.education.map((item, i) => (
                    <li key={i} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">{item}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections.skills && (
              <div className="skills-section">
                <h3><FaTools /> Skills</h3>
                <div className="skills-list">
                  {sections.skills.map((s, i) => (
                    <span key={i} className="skill">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {sections.projects && (
              <div className="projects-section">
                <h3>Projects</h3>
                <div className="card-list">
                  {sections.projects.map((p, i) => (
                    <div key={i} className="card small-card">{p}</div>
                  ))}
                </div>
              </div>
            )}

            {sections.certifications && (
              <div className="certs-section">
                <h3>Certifications</h3>
                <ul>
                  {sections.certifications.map((c,i)=> <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

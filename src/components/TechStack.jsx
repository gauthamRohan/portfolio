import React from 'react';
import { FaPython, FaCode, FaDatabase, FaCog, FaCloud } from 'react-icons/fa';

const categories = [
  {
    name: 'Languages',
    color: '#7c3aed',
    skills: ['Python', 'C']
  },
  {
    name: 'Data Science',
    color: '#06b6d4',
    skills: ['EDA', 'Data Processing', 'Model Training', 'Evaluation', 'Deep Learning', 'SMOTE']
  },
  {
    name: 'MLOps & Cloud',
    color: '#ec4899',
    skills: ['GCP', 'Kubeflow', 'Docker', 'Jupyter', 'Pandas', 'Scikit-learn']
  },
  {
    name: 'GenAI & LLMs',
    color: '#f59e0b',
    skills: ['RAG', 'Vector DB', 'Agents', 'Guardrails', 'LLM Orchestration']
  },
  {
    name: 'Automation',
    color: '#10b981',
    skills: ['Python Scripts', 'REST APIs', 'n8n', 'Web Scraping', 'Flask']
  }
];

export default function TechStack() {
  return (
    <section id="skills" className="tech-stack">
      <div className="container">
        <h2>Technical Skills</h2>
        <p className="section-desc">Tools and technologies I work with daily across data science, ML, and cloud infrastructure.</p>
        <div className="skills-grid">
          {categories.map((cat, i) => (
            <div key={i} className="skill-category" style={{ borderTopColor: cat.color }}>
              <h3 style={{ color: cat.color }}>{cat.name}</h3>
              <div className="skill-items">
                {cat.skills.map((skill, j) => (
                  <div key={j} className="skill-item" style={{ 
                    background: `linear-gradient(135deg, ${cat.color}15, ${cat.color}08)`,
                    borderColor: `${cat.color}20`
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

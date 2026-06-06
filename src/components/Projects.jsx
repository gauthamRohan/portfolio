import React from 'react';
import { FaDatabase, FaChartBar, FaRobot, FaCog } from 'react-icons/fa';

const projects = [
  {
    title: 'Capacity Forecasting System',
    category: 'ML Pipeline',
    icon: <FaChartBar />,
    desc: 'Developed a capacity forecasting model on CPU/memory utilization data from 2000+ servers using time-series analysis and predictive modeling.',
    impact: 'Prevented resource exhaustion and enabled proactive infrastructure scaling',
    tech: ['Python', 'GCP', 'Time Series', 'ML Pipelines']
  },
  {
    title: 'Client Roaming Prediction Model',
    category: 'ML Model',
    icon: <FaDatabase />,
    desc: 'Built an ML-driven model analyzing wireless session patterns to identify roaming failures before impacting end-users.',
    impact: 'Improved network reliability across enterprise sites',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Pattern Analysis']
  },
  {
    title: 'Agentic Backup Monitoring Dashboard',
    category: 'GenAI / LLM',
    icon: <FaRobot />,
    desc: 'Designed an autonomous monitoring dashboard that evaluates backup job health and generates incident summaries using LLM-based reasoning.',
    impact: 'Real-time alerts and intelligent incident summarization',
    tech: ['LLMs', 'Agents', 'GenAI', 'Kubeflow']
  },
  {
    title: 'Osteosarcoma Detection using CNN',
    category: 'Deep Learning',
    icon: <FaCog />,
    desc: 'Built an end-to-end ML pipeline for bone cancer cell detection with 90%+ classification accuracy using SMOTE for class balancing.',
    impact: 'Deployed via Flask web interface for medical professionals',
    tech: ['Deep Learning', 'CNN', 'SMOTE', 'Flask']
  },
  {
    title: 'Stock Sentiment Analysis Bot',
    category: 'NLP / Automation',
    icon: <FaChartBar />,
    desc: 'Automated workflow scraping financial news, running sentiment analysis on stock mentions, and delivering buy/sell/hold signals to Discord.',
    impact: 'Real-time financial intelligence and trading signals',
    tech: ['NLP', 'n8n', 'Web Scraping', 'APIs']
  },
  {
    title: 'Enterprise Device Migration Automation',
    category: 'Python Automation',
    icon: <FaCog />,
    desc: 'Developed Python automation scripts for large-scale device migration across enterprise infrastructure with REST API integration.',
    impact: 'Reduced project timeline from 1 year to 6 months with 95%+ success rate',
    tech: ['Python', 'REST APIs', 'Automation', 'Error Handling']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Projects & Work</h2>
        <p className="section-desc">Enterprise ML solutions and academic projects spanning predictive modeling, deep learning, and agentic AI.</p>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={i} className="project-card">
              <div className="project-icon">{p.icon}</div>
              <div className="project-category">{p.category}</div>
              <h3>{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-impact">✨ {p.impact}</div>
              <div className="project-tech">
                {p.tech.map((t, j) => <span key={j}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

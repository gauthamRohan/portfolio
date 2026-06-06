import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Rohan Sakthivel — Built with React</p>
        <div className="links">
          <a href="mailto:rohanpkg07@gmail.com">Email</a>
          <a href="https://www.linkedin.com/feed/?trk=404_page" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/rohanskt" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

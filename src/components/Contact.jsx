import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get in touch</h2>
        <p>I'd be happy to hear from you. Email me at <a href="mailto:rohanpkg07@gmail.com">rohanpkg07@gmail.com</a></p>
        <form onSubmit={(e)=>{e.preventDefault(); window.location = 'mailto:rohanpkg07@gmail.com?subject=Portfolio%20Contact&body=Hi%20Rohan';}}>

          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Your email" required />
          <textarea name="message" placeholder="Message..." required />
          <button className="btn">Send</button>
        </form>
      </div>
    </section>
  );
}

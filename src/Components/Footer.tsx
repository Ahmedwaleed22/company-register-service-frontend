// Packages
import React from 'react';

// Static
import Logo from '../Images/logo.png';

// Companies Logo
import FacebookLogo from '../Images/social_media/facebook.png';
import InstagramLogo from '../Images/social_media/instagram.png';
import YoutubeLogo from '../Images/social_media/youtube.webp';

// Styles
import '../styles/Footer.scss';

function Footer() {
  const goTo = (link: string) => window.open(link);

  return (
    <footer className="footer">
      <div className="left-side">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="text">
          <p>Domaino Startup Powered by Domaino Cloud LTD (Company number 14322953) at 128 City Road, London, United Kingdom, EC1V 2NX</p>
        </div>
        <div className="contact-info">
          <ul>
            <li><b>Tel</b>: 442032900048</li>
            <li><b>E-Mail</b>: online@domainostartup.com</li>
          </ul>
        </div>
        <p className="copyright">Copyright 2023 © Domaino Startup</p>
      </div>
      <div className="right-side">
        <h3 className="title">Follow us</h3>
        <section className="companies">
          <div onClick={() => goTo('https://www.facebook.com/domainostartup')} className="company">
            <img src={FacebookLogo} alt="Facebook" />
          </div>
          <div onClick={() => goTo('https://www.instagram.com/domainostartup')} className="company">
            <img src={InstagramLogo} alt="Instagram" />
          </div>
          <div onClick={() => goTo('https://www.youtube.com/@domainostatup9965')} className="company">
            <img src={YoutubeLogo} alt="Youtube" />
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
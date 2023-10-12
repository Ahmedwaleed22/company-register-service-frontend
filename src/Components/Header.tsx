import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Images/logo.png';
import '../styles/Header.scss';

function Header() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      name: "Packages",
      path: "#packages",
    },
    {
      name: "How it works?",
      path: "#howitworks"
    },
    {
      name: "Why Domaino Startup?",
      path: "#whyus"
    },
    {
      name: "Client Area",
      path: "/dashboard"
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goTo = (event: any, path: string) => {
    closeMenu();
    if (path.startsWith('#')) {
      navigate('/');
      setTimeout(() => {
        event.preventDefault();
        const section = document.querySelector(path);
        section?.scrollIntoView();
      }, 10);
    } else {
      navigate(`${path}`);
    }
  }

  return (
    <nav className="main-header">
      <div onClick={(event) => goTo(event, '/')} className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`links ${menuOpen ? 'open' : ''}`}>
        {links.map((link: any, idx: number) => (
          <li className={link.path === pathname ? 'active' : ''} onClick={(event) => goTo(event, link.path)} key={idx}>
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header;

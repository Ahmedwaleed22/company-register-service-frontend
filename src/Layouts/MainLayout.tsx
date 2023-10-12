// Packages
import React from 'react'

// Styles
import '../styles/MainLayout.scss';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

interface Props {
  children: any;
}

function MainLayout({ children }: Props) {
  return (
    <div className="main-layout-container">
      <Header />
      <div className="children">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
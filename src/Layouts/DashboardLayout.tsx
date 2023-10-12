// Packages
import React from 'react'

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import DashboardNavigationBar from '../Components/Dashboard/DashboardNavigationBar';

// Styles
import '../styles/DashboardLayout.scss';

interface Props {
  children: any;
}

function DashboardLayout({ children }: Props) {
  return (
    <div className="dashboard-layout-container">
      <Header />
      <div className="dashboard-container">
        <div className="navigation">
          <DashboardNavigationBar />
        </div>
        <div className="children">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardLayout
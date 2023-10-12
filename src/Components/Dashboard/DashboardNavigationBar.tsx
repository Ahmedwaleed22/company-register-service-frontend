// Packages
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

// Styles
import '../../styles/Dashboard/Navigation.scss';

function DashboardNavigationBar() {
  // Global Variables
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Comapanies",
      path: "/dashboard/companies",
    }, 
    {
      name: "My Orders",
      path: "/dashboard/orders",
    },
    {
      name: "Files",
      path: "/dashboard/mail",
    },
    {
      name: "Invoices",
      path: "/dashboard/invoices",
    },
    {
      name: "Services & Renewals",
      path: "/dashboard/services",
    },
    {
      name: "My Details",
      path: "/dashboard/mydetails",
    },
    {
      name: "Logout",
      path: "logout"
    }
  ];

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <aside className="dashboard-navigation">
      <ul>
        {links.map((link: any, idx: number) => (
          <li onClick={() => link.path === 'logout' ? logout() : navigate(link.path)} className={link.path === pathname ? 'active' : ''}>{link.name}</li>
        ))}
      </ul>
    </aside>
  )
}

export default DashboardNavigationBar
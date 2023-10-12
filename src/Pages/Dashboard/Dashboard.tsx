// Packages
import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import DashboardLayout from "../../Layouts/DashboardLayout";
import Button from "../../Components/Button";
import Service from "../../Components/Dashboard/Service";

// Styles
import "../../styles/Dashboard/Dashboard.scss";
import { Zoom } from "react-awesome-reveal";

function Dashboard() {
  const navigate = useNavigate();

  const services = [
    {
      title: "My Details",
      description:
        "Update your details including account username, password, contact addresses, and phone numbers.",
      path: "/dashboard/mydetails"
    },
    {
      title: "My Companies",
      description:
        "View, update, file changes at Companies House, and purchase services from the Shop area, for your companies.",
      path: "/dashboard/companies"
    },
    {
      title: "My Order History",
      description: "View your orders - complete, incomplete and in progress.",
      path: "/dashboard/orders"
    },
    {
      title: "My Mail",
      description:
        "View, download and print items of mail received for your companies.",
      path: "/dashboard/mail"
    },
    {
      title: "My Invoice History",
      description:
        "View your invoice and payment history. Download or print your invoices.",
      path: "/dashboard/invoices"
    },
    {
      title: "My Services & Renewals",
      description:
        "View and renew your business and address services, and change the address we forward your mail to.",
      path: "/dashboard/services"
    }
  ];

  const packages = (event: any) => {
    navigate('/');
    setTimeout(() => {
      event.preventDefault();
      const section = document.getElementById('packages');
      section?.scrollIntoView();
    }, 10);
  }

  return (
    <DashboardLayout>
      <Zoom fraction={0.1} triggerOnce={true}>
        <h1 className="dashboard-title">Customer Dashboard</h1>
        <section className="dashboard-showcase">
          <h2>Create a New Company</h2>
          <Button
            onClick={packages}
            style="info"
          >
            Create Company
          </Button>
        </section>
        <div className="dashboard-content-container">
          <div className="services">
            {services.map((service: any, idx: number) => (
              <Service
                key={idx}
                title={service.title}
                description={service.description}
                path={service.path}
              />
            ))}
          </div>
          <div className="sidebar">
            <h3 className="sidebar-title">Need any help?</h3>
            <p>Our team of advisors are standing by, ready to assist you.</p>
            <p>
              Whether you need help with a new company formation, or making a
              change to an existing company - we can walk you through the process
              step-by-step.
            </p>
            <ul>
              <li>
                <b>Tel</b>: 442032900048
              </li>
              <li>
                <b>E-Mail</b>: online@domainostartup.com
              </li>
            </ul>
          </div>
        </div>
      </Zoom>
    </DashboardLayout>
  );
}

export default Dashboard;

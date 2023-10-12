// Packages
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Components
import DashboardLayout from "../../Layouts/DashboardLayout";
import Button from "../../Components/Button";

// Store
import { RootState } from "../../Store";

// Styles
import "../../styles/Dashboard/Services.scss";
import Loading from "../../Components/Loading";

function Services() {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get("/orders/services", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServices(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    askApi();
  }, [setServices, setIsLoading, token]);

  const handleAutoRenew = async (event: any) => {
    const clickedServiceId = +event.target.getAttribute("data-id");
  
    // Create an array of promises for all the update operations
    const updatedServicesPromises = services.map(async (service: any) => {
      if (service.id === clickedServiceId) {
        try {
          const { data } = await axios.put(
            `/orders/services/${clickedServiceId}`,
            {
              auto_renewal: !service.auto_renewal
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
  
          return {
            ...service,
            auto_renewal: !service.auto_renewal
          };
        } catch (e) {
          console.error(e);
        }
      }
      return service;
    });
  
    // Wait for all promises to resolve before updating the state
    const updatedServices: any = await Promise.all(updatedServicesPromises);
  
    setServices(updatedServices);
  };  

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">Services</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="table-container">
          <table className="dahsboard-table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Company</td>
                <td>Officer</td>
                <td>Status</td>
                <td>End Date</td>
                <td>Auto Renew</td>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((service: any, idx: number) => (
                  <tr>
                    <td>{service.id}</td>
                    <td>{service.company}</td>
                    <td>{service.officer}</td>
                    <td>{service.status}</td>
                    <td>{service.end_date}</td>
                    <td className="center">
                      <input
                        onChange={handleAutoRenew}
                        type="checkbox"
                        checked={service.auto_renewal}
                        data-id={service.id}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Services;

// Packages
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// Components
import DashboardLayout from "../../Layouts/DashboardLayout";
import Button from "../../Components/Button";

// Store
import { RootState } from '../../Store';
import Loading from "../../Components/Loading";

function Orders() {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    askApi();
  }, [setOrders, setIsLoading, token]);

  return (
    <DashboardLayout>
      <h1 className="dashboard-title">Order History</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="table-container">
          <table className="dahsboard-table">
            <thead>
              <tr>
                <td>Order ID</td>
                <td>Invoiced</td>
                <td>Package / Type</td>
                <td>Description</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order: any, idx: number) => (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.invoiced}</td>
                  <td>{order.package.name}</td>
                  <td>{order.description}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Orders;

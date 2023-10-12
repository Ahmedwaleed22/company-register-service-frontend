import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import MainLayout from '../Layouts/MainLayout';
import Button from '../Components/Button';

function OrderStatus() {
  const navigate = useNavigate();
  const { orderID } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get(`/orders/${orderID}`);
        setData(data.data);
      } catch (e: any) {
        console.error(e);
      }
    };

    askApi();
  }, [orderID]);

  return (
    <MainLayout>
      {data ? (
        <>
          <div className="thanks-text">
            <h1>Thank You!</h1>
            <p>Thank you for completing your order at Domaino Startup</p>
          </div>
          <div className="order-completion-container thanks-container">
          <div className="card">
              <h2>Order Details</h2>
              <ul>
                <li>
                  <b>Order ID</b>: {data.order.id}
                </li>
                <li>
                  <b>Status</b>: {data.order.status}
                </li>
              </ul>
            </div>
            <div className="card">
              <h2>Personal Information</h2>
              <ul>
                <li>
                  <b>Name</b>: {data.order.user.first_name} {data.order.user.last_name}
                </li>
                <li>
                  <b>E-Mail</b>: {data.order.user.email}
                </li>
                <li>
                  <b>Nationality</b>: {data.order.user.nationality}
                </li>
                <li>
                  <b>Country</b>: {data.order.user.country}
                </li>
              </ul>
            </div>
            <div className="card">
              <h2>Company</h2>
              <ul>
                <li>
                  <b>Name</b>: {data.order.company.name}
                </li>
                <li>
                  <b>Activities</b>: {data.order.company.activities}
                </li>
                <li>
                  <b>Addons</b>: {data.order.company.addons}
                </li>
              </ul>
              {data.order.company.partners.length > 0 && (
                <div className="child">
                  <h2>Partners</h2>
                  {data.order.company.partners.map((partner: any, idx: number) => (
                    <div className="card">
                      <h3>Partner {++idx}</h3>
                      <ul>
                        <li>
                          <b>Name</b>: {partner.first_name} {partner.last_name}
                        </li>
                        <li>
                          <b>Country</b>: {partner.country}
                        </li>
                        <li>
                          <b>Date of Birth</b>: {partner.dob}
                        </li>
                        <li>
                          <b>Nationality</b>: {partner.nationality}
                        </li>
                        <li>
                          <b>Share Holds</b>: {partner.share_holds}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="order-completion-actions">
              <Button onClick={() => navigate('/dashboard')} style="info">Go To Dashboard!</Button>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </MainLayout>
  )
}

export default OrderStatus
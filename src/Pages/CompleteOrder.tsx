// Packages
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// Component
import MainLayout from "../Layouts/MainLayout";
import Loading from "../Components/Loading";

// Store
import { setAuth } from "../Store/authSlice";

// Style
import "../styles/PayForOrder.scss";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

function CompleteOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [token, setToken] = useState<any>("");
  const [password, setPassword] = useState("");
  const { orderID } = useParams();
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    const askApi = async () => {
      try {
        const { data } = await axios.get(`/orders/${orderID}`);
        setData(data.data);
        setToken(data.data.token);
        dispatch(setAuth({ token: data.data.token }));
      } catch (e: any) {
        console.error(e);
      }
    };

    askApi();
  }, [orderID]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement: any = elements.getElement(CardElement);
    const { token: cardToken, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      try {
        const { data } = await axios.post(
          "/payments/cards/add",
          {
            token: cardToken.id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        await axios.post(
          "/payments/pay",
          {
            card: data.data.id,
            order_id: orderID,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        await axios.put("/users", {
          password
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        navigate('/dashboard/companies');
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  return (
    <MainLayout>
      {data ? (
        <div className="order-completion-container">
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
          <div className="card">
            <div className="total">
              <section className="price-container">
                <div className="discount">
                  <div className="oldPrice">${data.order.package.discounted_price}</div>
                  <div className="percentage">%{Math.ceil((data.order.package.price / data.order.package.discounted_price) * 100)} OFF</div>
                </div>
                <span className="price">${data.order.package.price}</span>
                <p className="note">Renews at ${data.order.package.renewal_price}</p>
              </section>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Password" required />
              </div>
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                className="stripe-input"
              />
              <button type="submit" className="pay-button" disabled={!stripe}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </MainLayout>
  );
}

export default CompleteOrder;

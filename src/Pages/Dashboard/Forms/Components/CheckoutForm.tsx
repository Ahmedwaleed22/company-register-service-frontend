// Packages
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

// Styles
import "../../../../styles/CheckoutForm.scss";
import axios from "axios";

// Store
import { RootState } from "../../../../Store";
import { useNavigate } from "react-router-dom";

interface Props {
  orderID: string;
  setLoading?: any;
}

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

function CheckoutForm({ orderID, setLoading = null}: Props) {
  const token: any = useSelector((state: RootState) => state.auth.token);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

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
        if (setLoading) setLoading(true);
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
        
        if (setLoading) setLoading(false);
        navigate('/dashboard/companies');
      } catch (e: any) {
        console.error(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="title">Payment</h2>
      <CardElement options={CARD_ELEMENT_OPTIONS} className="stripe-input" />
      <button type="submit" className="pay-button" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
}

export default CheckoutForm;

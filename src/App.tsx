// Packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Components
import Home from "./Pages/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login";

// - Dashboard
import Orders from "./Pages/Dashboard/Orders";
import Subscriptions from "./Pages/Dashboard/Subscriptions";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Companies from "./Pages/Dashboard/Companies";
import Invoices from "./Pages/Dashboard/Invoices";
import Mail from "./Pages/Dashboard/Mail";
import Services from "./Pages/Dashboard/Services";
import MyDetails from "./Pages/Dashboard/MyDetails";
import Packages from "./Pages/PackagesPage";
import ScrollToTop from "./Components/scrollToTop";
import NotFoundPage from "./Pages/Errors/NotFoundPage";
import PrivateRoute from "./Components/PrivateRoute";
import CreateCompany from "./Pages/Dashboard/CreateCompany";
import CompleteOrder from "./Pages/CompleteOrder";
import ForgotPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import OrderStatus from "./Pages/OrderStatus";

const stripePromise = loadStripe(
  "pk_test_51GsjSxDypZHmACyYUVI3FCnNnRRWzQPHXurr4WGjajeVvSJVBsyZ9Izra0UNbjDDvoy7Y9lD1ePBXz3xgQJPYjC600ZiPZiBB3"
);

axios.defaults.baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8000/api"
    : "https://api.domainostartup.com/api";

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages/:country" element={<Packages />} />
          <Route path="/register/:country/:package" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="companies">
              <Route index element={<Companies />} />
              <Route
                path="create/:country/:package"
                element={<CreateCompany />}
              ></Route>
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="mail" element={<Mail />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="services" element={<Services />} />
            <Route path="mydetails" element={<MyDetails />} />
          </Route>
          <Route path="/order/:orderID/complete" element={<CompleteOrder />} />
          <Route path="/order-status/:orderID" element={<OrderStatus />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;

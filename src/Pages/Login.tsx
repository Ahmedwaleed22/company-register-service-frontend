// Packages
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";

// Layout
import MainLayout from "../Layouts/MainLayout";
import Button from "../Components/Button";

// Styles
import { MdEmail, FaKey } from "../Config/icons";
import "../styles/Login.scss";

// Store
import { setAuth } from '../Store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = (event: any) => {
    navigate("/");
    setTimeout(() => {
      event.preventDefault();
      const section = document.querySelector("#packages");
      section?.scrollIntoView();
    }, 10);
  };

  const forgotPassword = () => navigate('/forgot-password');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password
      });

      const token = data.token;
      dispatch(setAuth({ token }));
      navigate('/dashboard');
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message);
    }
  }

  return (
    <MainLayout>
      <div className="login-container">
        <div className="title-container">
          <h1>Welcome Back</h1>
          <p>Login to Continue</p>
        </div>
        {error && <div style={{ marginBottom: "2em" }} className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="icon">
              <MdEmail />
            </div>
            <input
              onChange={(event: any) => setEmail(event.target.value)}
              value={email}
              type="text"
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <div className="icon">
              <FaKey />
            </div>
            <input
              onChange={(event: any) => setPassword(event.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" style="primary">
            Login
          </Button>
        </form>
        <div onClick={register} className="action">
          Don't Have an Account?
        </div>
        <div onClick={forgotPassword} className="action">
          Forgot Password?
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;

// Packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Layout
import MainLayout from "../Layouts/MainLayout";
import Button from "../Components/Button";

// Styles
import { MdEmail } from "../Config/icons";

function ForgotPassword() {
  const [error, setError] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post('/auth/forgot-password', { email });
      setSuccess('A password reset link has been sent to your email address.');
      setError(null);
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message);
      setSuccess(null);
    }
  }

  const login = () => navigate('/login');

  return (
    <MainLayout>
      <div className="login-container">
        <div className="title-container">
          <h1>Forgot Password</h1>
          <p>Enter your email to receive a password reset link</p>
        </div>
        {error && <div style={{ marginBottom: "2em" }} className="alert alert-danger">{error}</div>}
        {success && <div style={{ marginBottom: "2em" }} className="alert alert-success">{success}</div>}
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
          <Button type="submit" style="primary">
            Send Reset Link
          </Button>
          <div onClick={login} className="action">
            Already Have an Account?
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default ForgotPassword;

// Packages
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Layout
import MainLayout from "../Layouts/MainLayout";
import Button from "../Components/Button";

// Styles
import { FaKey } from "../Config/icons";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useParams(); // Assuming the token is a URL parameter

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('/auth/reset-password', { token, password });
      setSuccess('Password has been reset successfully!');
      setError(null);
      setTimeout(() => navigate('/login'), 2000); // Navigate to login after 2 seconds
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message);
      setSuccess(null);
    }
  }

  return (
    <MainLayout>
      <div className="login-container">
        <div className="title-container">
          <h1>Reset Password</h1>
          <p>Enter your new password</p>
        </div>
        {error && <div style={{ marginBottom: "2em" }} className="alert alert-danger">{error}</div>}
        {success && <div style={{ marginBottom: "2em" }} className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="icon">
              <FaKey />
            </div>
            <input
              onChange={(event: any) => setPassword(event.target.value)}
              value={password}
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <div className="icon">
              <FaKey />
            </div>
            <input
              onChange={(event: any) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <Button type="submit" style="primary">
            Reset Password
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}

export default ResetPassword;

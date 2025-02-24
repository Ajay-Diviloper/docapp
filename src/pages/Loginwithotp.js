import React, { useState } from "react";
import "../style/Registerstyles.css";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertslice";

const LoginWithOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Function to request OTP
  const sendOtp = async () => {
    if (!email) {
      message.error("Please enter your email");
      return;
    }
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/otp/register2", {
        email,
      });
      dispatch(hideLoading());

      if (response.data.success) {
        setOtpSent(true);
        message.success("OTP sent to your email!");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Error sending OTP");
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      message.error("Please enter the OTP");
      return;
    }
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        { email, otp }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        message.success("Login Successful!");
        navigate("/dashboard"); // Redirect user after successful login
      } else {
        message.error("Invalid OTP");
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Error verifying OTP");
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" className="card p-4">
        <h1>Login with OTP</h1>

        {!otpSent ? (
          <>
            <Form.Item label="Email" name="email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Item>

            <button type="button" className="btn btn-primary" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <Form.Item label="Enter OTP" name="otp">
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Item>

            <button
              type="button"
              className="btn btn-success"
              onClick={verifyOtp}
            >
              Verify OTP & Login
            </button>
          </>
        )}

        <Link to="/register" className="m-2">
          Register Here
        </Link>
        <Link to="/login" className="m-2">
          Login with Password
        </Link>
      </Form>
    </div>
  );
};

export default LoginWithOTP;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = process.env.REACT_APP_DASHBOARD_URL;
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Subtle premium gradient
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className="glass-card" style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        padding: "40px 50px",
        width: "100%",
        maxWidth: "450px",
        border: "1px solid rgba(255, 255, 255, 0.18)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
           <img src="media/images/logo.png" alt="Zerodha" style={{ width: "40px", marginBottom: "15px" }} />
           <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#333", margin: "0" }}>Create Account</h2>
           <p style={{ color: "#666", marginTop: "8px", fontSize: "0.95rem" }}>Join Zerodha to start investing today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="name@example.com"
              onChange={handleOnChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#387ed1"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="username" style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Choose a username"
              onChange={handleOnChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#387ed1"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>
          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Min. 6 characters"
              onChange={handleOnChange}
               style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#387ed1"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>
          
          <button type="submit" style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(135deg, #387ed1 0%, #2b6cb0 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.05rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(56, 126, 209, 0.25)",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.target.style.transform = "translateY(-1px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            Sign Up
          </button>
          
          <div style={{ marginTop: "25px", textAlign: "center", fontSize: "0.95rem", color: "#666" }}>
            Already have an account? <Link to={"/login"} style={{ color: "#387ed1", fontWeight: "600", textDecoration: "none" }}>Log in</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;

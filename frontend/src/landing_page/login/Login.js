import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          // Redirect to Dashboard (assuming it runs on port 3001)
          // Or if we are keeping everything local, we might redirect to a route.
          // For now, let's redirect to dashboard URL.
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
    });
  };

  return (
    <div className="form_container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#0f1216", 
      backgroundImage: "radial-gradient(circle at 15% 50%, rgba(47, 128, 237, 0.08) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(112, 93, 242, 0.08) 0%, transparent 25%)",
      fontFamily: "'Inter', sans-serif",
      color: "#f0f6fc"
    }}>
      <div className="glass-card" style={{
        background: "rgba(22, 27, 34, 0.7)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        padding: "40px 50px",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
           <img src="media/images/logo.png" alt="Zerodha" style={{ width: "40px", marginBottom: "15px", filter: "brightness(0) invert(1)" }} />
           <h2 style={{ fontSize: "1.75rem", fontWeight: "600", color: "#f0f6fc", margin: "0" }}>Welcome Back</h2>
           <p style={{ color: "#8b949e", marginTop: "8px", fontSize: "0.95rem" }}>Login to your Zerodha account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#8b949e", fontSize: "0.9rem" }}>Email Address</label>
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
                border: "1px solid #30363d",
                background: "#0d1117",
                color: "#f0f6fc",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                  e.target.style.borderColor = "#387ed1";
                  e.target.style.boxShadow = "0 0 0 2px rgba(56, 126, 209, 0.2)";
              }}
              onBlur={(e) => {
                  e.target.style.borderColor = "#30363d";
                  e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <label htmlFor="password" style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#8b949e", fontSize: "0.9rem" }}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
               style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #30363d",
                background: "#0d1117",
                color: "#f0f6fc",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                  e.target.style.borderColor = "#387ed1";
                  e.target.style.boxShadow = "0 0 0 2px rgba(56, 126, 209, 0.2)";
              }}
              onBlur={(e) => {
                  e.target.style.borderColor = "#30363d";
                  e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          <button type="submit" style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #2f80ed 0%, #705df2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(47, 128, 237, 0.3)",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.target.style.transform = "translateY(-1px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            Login
          </button>
          
          <div style={{ marginTop: "25px", textAlign: "center", fontSize: "0.9rem", color: "#8b949e" }}>
            Don't have an account? <Link to={"/signup"} style={{ color: "#387ed1", fontWeight: "500", textDecoration: "none" }}>Sign up</Link>
          </div>
        </form>
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
};

export default Login;

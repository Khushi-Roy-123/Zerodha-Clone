import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom sticky-top" style={{ backgroundColor: "#fff", height: "70px" }}>
      <div className="container p-2">
        <a className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="media/images/logo.png"
            style={{ width: "25px", marginRight: "8px" }}
            alt="Zerodha Logo"
          />
          <span style={{ fontWeight: "700", letterSpacing: "-0.5px", color: "#333" }}>Zerodha</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav mb-lg-0 align-items-center gap-4">
              <li className="nav-item">
                <a className="nav-link text-muted fw-medium fs-6 hover-primary" href="#">Signup</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted fw-medium fs-6 hover-primary" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted fw-medium fs-6 hover-primary" href="#">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted fw-medium fs-6 hover-primary" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted fw-medium fs-6 hover-primary" href="#">Support</a>
              </li>
              <li className="nav-item ms-2">
                  <div className="p-2 rounded hover-bg-light cursor-pointer">
                    <i className="fa-solid fa-bars text-muted fs-5"></i>
                  </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

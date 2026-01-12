import React from "react";

function Hero() {
  return (
    <div className="container-fluid hero-container border-bottom">
       <div className="container p-5 mb-5">
        <div className="row text-center mb-5">
            <div className="col-12 mb-5">
                <img
                    src="media/images/homeHero.png"
                    alt="Hero Image"
                    className="hero-img animate-fade-in-up"
                    style={{ width: "70%" }}
                />
            </div>
            <div className="col-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h1 className="hero-heading mt-5">Invest in everything</h1>
                <p className="fs-4 text-muted mb-4">
                Online platform to invest in stocks, derivatives, mutual funds, and
                more
                </p>
                <button
                className="btn btn-primary fs-5 mb-5 animate-pulse"
                style={{ width: "30%", minWidth: "200px", margin: "0 auto", padding: "12px 30px", borderRadius: "30px", backgroundColor: "#387ed1", border: "none" }}
                >
                Signup Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <>
      <div className="funds mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="text-muted">Instant, zero-cost fund transfers with UPI </p>
        <div>
           <Link className="btn btn-green me-2" style={{ background: "var(--buy-green)", color: "white", padding: "8px 20px", borderRadius: "4px", textDecoration: "none" }}>Add funds</Link>
           <Link className="btn btn-blue" style={{ background: "var(--primary-blue)", color: "white", padding: "8px 20px", borderRadius: "4px", textDecoration: "none" }}>Withdraw</Link>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="section glass-card">
            <span>
              <p>Equity</p>
            </span>

            <div className="table">
              <div className="data justify-content-between mb-3">
                <p>Available margin</p>
                <h3 className="gradient-text">4,043.10</h3>
              </div>
              <div className="data justify-content-between mb-2">
                <p>Used margin</p>
                <p className="fw-bold">3,757.30</p>
              </div>
              <div className="data justify-content-between mb-2">
                <p>Available cash</p>
                <p className="fw-bold">4,043.10</p>
              </div>
              <hr className="my-3"/>
              <div className="data justify-content-between mb-2">
                <p>Opening Balance</p>
                <p>4,043.10</p>
              </div>
              <div className="data justify-content-between mb-2">
                <p>Payin</p>
                <p>4064.00</p>
              </div>
              <div className="data justify-content-between mb-2">
                <p>SPAN</p>
                <p>0.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="section glass-card text-center p-5">
            <div className="commodity">
              <p className="mb-4 text-muted">You don't have a commodity account</p>
              <Link className="btn btn-blue" style={{ background: "var(--primary-blue)", color: "white", padding: "10px 25px", borderRadius: "4px", textDecoration: "none" }}>Open Account</Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Funds;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [mode, setMode] = useState("BUY"); // BUY or SELL

  const handleBuyClick = async () => {
    try {
        await axios.post("http://localhost:3002/newOrder", {
            name: uid,
            qty: stockQuantity,
            price: stockPrice,
            mode: mode,
        }, { withCredentials: true });

        GeneralContext.closeBuyWindow();
        window.location.reload(); // Simple refresh to show new holdings
    } catch (error) {
        alert("Transaction failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true" style={{ backgroundColor: mode === "BUY" ? "#4184f3" : "#df514c" }}>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Toggle Switch */}
          <div className="switch-container" style={{ cursor: "pointer", background: "white", padding: "5px", borderRadius: "5px" }} onClick={() => setMode(mode === "BUY" ? "SELL" : "BUY")}>
              <span style={{ fontWeight: "bold", color: mode === "BUY" ? "#4184f3" : "grey" }}>BUY</span>
              {" / "}
              <span style={{ fontWeight: "bold", color: mode === "SELL" ? "#df514c" : "grey" }}>SELL</span>
          </div>

          <Link className="btn btn-blue" onClick={handleBuyClick} style={{ backgroundColor: "white", color: "#333", fontWeight: "bold" }}>
            {mode}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick} style={{ color: "white" }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;

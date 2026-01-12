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
    <div className={`container ${mode === "BUY" ? "buy-mode" : "sell-mode"}`} draggable="true">
      <div className="header">
        <h3>
          {uid} 
          <small>NSE</small>
        </h3>
        <div className="mode-badge">
             {/* Mode badge handled by CSS/Container class */}
        </div>
      </div>

      <div className="regular-order">
        
        {/* New Mode Toggle */}
        <div className="mode-toggle">
            <span 
                className={mode === "BUY" ? "active buy" : ""} 
                onClick={() => setMode("BUY")}
            >
                BUY
            </span>
            <span 
                className={mode === "SELL" ? "active sell" : ""} 
                onClick={() => setMode("SELL")}
            >
                SELL
            </span>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
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
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span className="margin-req">
            Margin required: 
            <strong>₹{(stockQuantity * stockPrice).toFixed(2)}</strong>
        </span>
        <div className="actions">
          <button className="btn btn-submit" onClick={handleBuyClick}>
            {mode}
          </button>
          <button className="btn btn-cancel" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;

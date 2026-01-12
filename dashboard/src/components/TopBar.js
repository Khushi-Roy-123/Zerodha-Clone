import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  const [indices, setIndices] = useState({
    nifty: { value: 100.2, percent: 0.5 },
    sensex: { value: 100.2, percent: 0.5 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) => {
        const volatility = 0.5;
        const niftyChange = (Math.random() * volatility * 2 - volatility);
        const sensexChange = (Math.random() * volatility * 2 - volatility);

        return {
          nifty: {
            value: Number((prev.nifty.value + niftyChange).toFixed(2)),
            percent: Number((prev.nifty.percent + niftyChange / 100).toFixed(2)),
          },
          sensex: {
            value: Number((prev.sensex.value + sensexChange).toFixed(2)),
            percent: Number((prev.sensex.percent + sensexChange / 100).toFixed(2)),
          },
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container navbar-glass">
      <div className="topbar-left">
          <div className="logo d-flex align-items-center">
             <img src="logo.png" style={{ width: "22px", marginRight: "8px" }} alt="Kite" />
             <span style={{ fontWeight: "700", letterSpacing: "-0.5px", color: "var(--text-main)", fontSize: "1.1rem" }}>Zerodha</span>
          </div>

          <div className="indices-container">
            <div className="nifty">
              <p className="index">NIFTY 50</p>
              <p className="index-points">{indices.nifty.value}</p>
              <p className="percent">
                 <span style={{ color: indices.nifty.percent >= 0 ? "var(--buy-green)" : "var(--sell-red)" }}>
                    {indices.nifty.percent}% {indices.nifty.percent >= 0 ? "▲" : "▼"}
                 </span>
              </p>
            </div>
            <div className="sensex">
              <p className="index">SENSEX</p>
              <p className="index-points">{indices.sensex.value}</p>
              <p className="percent">
                 <span style={{ color: indices.sensex.percent >= 0 ? "var(--buy-green)" : "var(--sell-red)" }}>
                    {indices.sensex.percent >= 0 ? "▲" : "▼"}
                 </span>
              </p>
            </div>
          </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;

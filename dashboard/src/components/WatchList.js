import React, { useState, useContext, useEffect } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
    
  const [watchlist, setWatchlist] = useState([]);

  // Fetch Watchlist from Backend
  useEffect(() => {
    const fetchWatchlist = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/watchlist`, { withCredentials: true });
            
            // If empty, try to seed (for demo purposes)
            if (res.data.length === 0) {
                 await axios.get(`${process.env.REACT_APP_BACKEND_URL}/seedWatchlist`, { withCredentials: true });
                 const reRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/watchlist`, { withCredentials: true });
                 setWatchlist(reRes.data);
            } else {
                 setWatchlist(res.data);
            }

        } catch (err) {
            console.error("Error fetching watchlist", err);
        }
    };
    fetchWatchlist();
  }, []);

  // Real-time Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
        setWatchlist((prevWatchlist) => {
            if (!prevWatchlist || !prevWatchlist.map) return [];
            return prevWatchlist.map((stock) => {
                // Random fluctuation: -0.5% to +0.5%
                const volatility = 0.005; 
                const change = 1 + (Math.random() * volatility * 2 - volatility);
                const newPrice = stock.price * change;
                const isDown = newPrice < stock.price;
                
                return {
                    ...stock,
                    price: parseFloat(newPrice.toFixed(2)),
                    isDown: isDown
                };
            });
        });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const labels = watchlist.map ? watchlist.map((subArray) => subArray["name"]) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map ? watchlist.map((stock) => stock.price) : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map && watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.isDown ? "isDown" : "isUp"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="isDown" />
          ) : (
            <KeyboardArrowUp className="isUp" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick} style={{ 
              background: "#4184f3", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              padding: "4px 12px", 
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.1s"
          }}>B</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" style={{ 
              background: "#ff5722", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              padding: "4px 12px", 
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.1s"
          }}>S</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

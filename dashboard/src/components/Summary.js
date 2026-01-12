import React from "react";
import { DoughnutChart } from "./DoughnoutChart";
import { AccountBalanceWallet, PieChart, TrendingUp } from "@mui/icons-material";

const Summary = () => {
  const data = {
    labels: ["Equity", "Mutual Funds", "Gold", "Bonds"],
    datasets: [
      {
        label: "Portfolio Distribution",
        data: [65, 20, 10, 5],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="summary-page">
      <div className="username">
        <h6>Hi, User!</h6>
      </div>

      <div className="section glass-card">
        <span>
          <p><AccountBalanceWallet className="icon" style={{ fontSize: '1.1rem', marginRight: '8px' }}/> Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="gradient-text">3.74k</h3>
            <p>Margin available</p>
          </div>

          <div className="second">
            <p>
              Margins used <span>0.00</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="section glass-card">
        <span>
          <p><TrendingUp className="icon" style={{ fontSize: '1.1rem', marginRight: '8px' }}/> Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small style={{ fontSize: '1rem', background: 'var(--buy-green-transparent)', padding: '2px 6px', borderRadius: '4px' }}>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="section glass-card">
         <span>
            <p><PieChart className="icon" style={{ fontSize: '1.1rem', marginRight: '8px' }}/> Portfolio</p>
         </span>
         <div style={{ maxHeight: '250px', display: 'flex', justifyContent: 'center' }}>
             <DoughnutChart data={data} />
         </div>
      </div>
    </div>
  );
};

export default Summary;

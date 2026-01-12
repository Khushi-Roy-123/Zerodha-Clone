import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Apps = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [metrics, setMetrics] = useState({
    totalInvestment: 0,
    currentValue: 0,
    totalPnL: 0,
    topPerformer: { name: "-", pnl: 0 }
  });

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then((res) => {
        const holdings = res.data;
        setAllHoldings(holdings);
        calculateMetrics(holdings);
      })
      .catch((err) => console.error("Error fetching holdings:", err));
  }, []);

  const calculateMetrics = (holdings) => {
    let totalInv = 0;
    let curVal = 0;
    let bestStock = { name: "-", pnl: -Infinity };

    holdings.forEach(stock => {
      const inv = stock.qty * stock.avg;
      const curr = stock.qty * stock.price;
      const pnl = curr - inv;

      totalInv += inv;
      curVal += curr;

      if (pnl > bestStock.pnl) {
        bestStock = { name: stock.name, pnl };
      }
    });

    setMetrics({
      totalInvestment: totalInv,
      currentValue: curVal,
      totalPnL: curVal - totalInv,
      topPerformer: bestStock
    });
  };

  // Chart Data
  const doughnutData = {
    labels: allHoldings.map(h => h.name),
    datasets: [{
      data: allHoldings.map(h => h.qty * h.price),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        '#C9CBCF', '#E7E9ED', '#71B37C', '#EC932F', '#52D726', '#8B0000', '#FFD700'
      ],
      hoverOffset: 4
    }]
  };

  const barData = {
    labels: allHoldings.map(h => h.name),
    datasets: [{
      label: 'P&L (₹)',
      data: allHoldings.map(h => (h.qty * h.price) - (h.qty * h.avg)),
      backgroundColor: allHoldings.map(h => {
        const pnl = (h.qty * h.price) - (h.qty * h.avg);
        return pnl >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)';
      }),
      borderColor: allHoldings.map(h => {
        const pnl = (h.qty * h.price) - (h.qty * h.avg);
        return pnl >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
      }),
      borderWidth: 1
    }]
  };

  return (
    <div className="analytics-container" style={{ padding: "30px", overflowY: "auto", height: "calc(100vh - 60px)" }}>
      <h3 className="title border-bottom pb-3">Portfolio Analytics</h3>
      
      {/* Key Metrics Row */}
      <div className="row mb-5 text-center mt-4">
        <div className="col-md-3 mb-3">
           <div className="card section glass-effect p-3 border-0">
             <h6 className="text-muted">Total Investment</h6>
             <h2 className="fw-bold">₹{metrics.totalInvestment.toLocaleString()}</h2>
           </div>
        </div>
        <div className="col-md-3 mb-3">
           <div className="card section glass-effect p-3 border-0">
             <h6 className="text-muted">Current Value</h6>
             <h2 className="fw-bold gradient-text">₹{metrics.currentValue.toLocaleString()}</h2>
           </div>
        </div>
        <div className="col-md-3 mb-3">
           <div className="card section glass-effect p-3 border-0">
             <h6 className="text-muted">Total P&L</h6>
             <h2 className={`fw-bold ${metrics.totalPnL >= 0 ? "text-success" : "text-danger"}`}>
               {metrics.totalPnL >= 0 ? "+" : ""}₹{metrics.totalPnL.toFixed(2)}
             </h2>
           </div>
        </div>
        <div className="col-md-3 mb-3">
           <div className="card section glass-effect p-3 border-0">
             <h6 className="text-muted">Top Performer</h6>
             <h5>{metrics.topPerformer.name}</h5>
             <small className="text-success fw-bold">+₹{metrics.topPerformer.pnl.toFixed(2)}</small>
           </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row mt-5">
        <div className="col-lg-6 mb-5" style={{ height: "400px" }}>
            <h5 className="mb-4 text-center">Asset Allocation</h5>
            <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
                <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
        <div className="col-lg-6 mb-5" style={{ height: "400px" }}>
            <h5 className="mb-4 text-center">Stock Performance (P&L)</h5>
            <Bar data={barData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Apps;

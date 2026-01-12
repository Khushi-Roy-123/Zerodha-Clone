require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { userVerification } = require("./Middleware/AuthMiddleware");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { WatchListModel } = require("./model/WatchListModel");
const UserModel = require("./model/UserModel"); // Import User Model

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL || "mongodb://localhost:27017/zerodha";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", 
      "http://localhost:3001", 
      "http://127.0.0.1:3000", 
      "http://127.0.0.1:3001",
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL
    ].filter(Boolean), // Filter out undefined if env vars are missing
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", authRoute);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.get("/allHoldings", userVerification, async (req, res) => {
    // Return user-specific holdings
  let allHoldings = await HoldingsModel.find({ userId: req.user._id });
  res.json(allHoldings);
});

app.get("/allPositions", userVerification, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// Interactive Trading Endpoint
app.post("/newOrder", userVerification, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const userId = req.user._id;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const numericQty = parseInt(qty);
  const numericPrice = parseFloat(price);
  const totalValue = numericQty * numericPrice;

  if (mode === "BUY") {
      if (user.funds < totalValue) {
          return res.status(400).json({ message: "Insufficient funds" });
      }

      // Deduct funds
      user.funds -= totalValue;
      await user.save();

      // Check if holding exists
      let holding = await HoldingsModel.findOne({ userId: userId, name: name });
      if (holding) {
          // Update average price and quantity
          // New Avg = ((Old Qty * Old Avg) + (New Qty * New Price)) / Total Qty
          const oldTotalValue = holding.qty * holding.avg;
          const newTotalValue = oldTotalValue + totalValue;
          holding.qty += numericQty;
          holding.avg = newTotalValue / holding.qty;
          await holding.save();
      } else {
          // Create new holding
          const newHolding = new HoldingsModel({
              name: name,
              qty: numericQty,
              avg: numericPrice,
              price: numericPrice, // Current market price (simulated)
              net: "0%",
              day: "0%",
              userId: userId
          });
          await newHolding.save();
      }
  } else if (mode === "SELL") {
      // Check holdings
      let holding = await HoldingsModel.findOne({ userId: userId, name: name });
      if (!holding || holding.qty < numericQty) {
          return res.status(400).json({ message: "Insufficient holdings to sell" });
      }

      // Add funds
      user.funds += totalValue;
      await user.save();

      // Update holding
      holding.qty -= numericQty;
      if (holding.qty === 0) {
          await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
          await holding.save();
      }
  } else {
      return res.status(400).json({ message: "Invalid mode" });
  }

  // Log Order
  let newOrder = new OrdersModel({
    name: name,
    qty: numericQty,
    price: numericPrice,
    mode: mode,
    userId: userId // Optional: Add userId to OrdersModel schema if you want to track history per user
  });
  await newOrder.save();

  res.json({ message: "Order executed successfully", funds: user.funds });
});

app.get("/allOrders", userVerification, async (req, res) => {
  const orders = await OrdersModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

app.get("/watchlist", userVerification, async (req, res) => {
    const watchlist = await WatchListModel.find({ userId: req.user._id });
    res.json(watchlist);
});

app.post("/watchlist", userVerification, async (req, res) => {
    const { name, price, percent, isDown } = req.body;
    const newStock = new WatchListModel({
        name,
        price,
        percent,
        isDown,
        userId: req.user._id
    });
    await newStock.save();
    res.json({ message: "Stock added", success: true, stock: newStock });
});

app.get("/seedWatchlist", userVerification, async (req, res) => {
    const tempWatchlist = [
        { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
        { name: "ONGC", price: 116.8, percent: "-0.09%", isDown: true },
        { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
        { name: "KPITTECH", price: 266.45, percent: "3.54%", isDown: false },
        { name: "QUICKHEAL", price: 308.55, percent: "-0.15%", isDown: true },
        { name: "WIPRO", price: 577.75, percent: "0.32%", isDown: false },
        { name: "M&M", price: 779.8, percent: "-0.01%", isDown: true },
        { name: "RELIANCE", price: 2112.4, percent: "1.44%", isDown: false },
        { name: "HUL", price: 512.4, percent: "1.04%", isDown: false },
    ];
    
    // Clear existing for this user
    await WatchListModel.deleteMany({ userId: req.user._id });

    const watchlistWithUser = tempWatchlist.map(stock => ({ ...stock, userId: req.user._id }));
    await WatchListModel.insertMany(watchlistWithUser);
    
    res.json({ message: "Watchlist seeded for user" });
});

// Get User Funds (Wallet)
app.get("/funds", userVerification, async (req, res) => {
    const user = await UserModel.findById(req.user._id);
    res.json({ funds: user.funds });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
  mongoose.connect(uri)
    .then(() => console.log("DB started!"))
    .catch(err => console.log("DB connection error:", err));
});

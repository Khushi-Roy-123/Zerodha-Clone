const axios = require('axios');
const cookieParser = require('cookie-parser');

const BASE_URL = 'http://localhost:3002';
const CLIENT_URL = 'http://localhost:3000'; // Frontend
const DASH_URL = 'http://localhost:3001'; // Dashboard

// Helper to color logs
const log = (msg, type = 'info') => {
  const colors = {
    info: '\x1b[36m%s\x1b[0m', // Cyan
    success: '\x1b[32m%s\x1b[0m', // Green
    error: '\x1b[31m%s\x1b[0m', // Red
    warn: '\x1b[33m%s\x1b[0m', // Yellow
  };
  console.log(colors[type] || colors.info, `[${type.toUpperCase()}] ${msg}`);
};

const runVerification = async () => {
  log("Starting System Verification...", "info");
  
  let cookie = null;
  let userId = null;

  // 1. Connectivity Check
  try {
    // We can check if landing page is up
    await axios.get(CLIENT_URL);
    log("Frontend is reachable (Port 3000)", "success");
    await axios.get(DASH_URL);
    log("Dashboard is reachable (Port 3001)", "success");
  } catch (err) {
    log(`Connectivity Error: ${err.message}`, "error");
  }

  // 2. Auth: Signup or Login
  // We'll try to Login with the test user created earlier or create a temp one
  const testUser = {
      email: `mobile_test_${Date.now()}@example.com`,
      password: "password123",
      username: "MobileTester"
  };

  try {
    log(`Attempting Signup with ${testUser.email}...`, "info");
    const signupRes = await axios.post(`${BASE_URL}/signup`, testUser);
    
    if (signupRes.data.success) {
        log("Signup Successful!", "success");
        userId = signupRes.data.user._id;
        
        // Extract token from Set-Cookie header if present
        const setCookie = signupRes.headers['set-cookie'];
        if (setCookie) {
            cookie = setCookie[0];
            log("Authentication Cookie Received.", "success");
        } else {
            log("Warning: No Set-Cookie header received (check axios config?)", "warn");
        }
    } else {
        log(`Signup Failed: ${signupRes.data.message}`, "error");
    }

  } catch (err) {
      log(`Signup Request Failed: ${err.message}`, "error");
  }

  if (!cookie) {
      log("Skipping Authenticated Tests due to missing cookie.", "warn");
      return;
  }

  // 3. Data Fetch: Watchlist
  try {
      const watchlistRes = await axios.get(`${BASE_URL}/watchlist`, {
          headers: { Cookie: cookie }
      });
      log(`Watchlist Fetch: ${watchlistRes.data.length} items found.`, "success");
  } catch (err) {
      log(`Watchlist Fetch Failed: ${err.message}`, "error");
  }

  // 4. Trade: Buy Order
  try {
      const buyPayload = {
          name: "INFY",
          qty: 1,
          price: 1500,
          mode: "BUY",
          userId: userId // Though backend gets it from token
      };
      
      log("Attempting BUY Order...", "info");
      const orderRes = await axios.post(`${BASE_URL}/newOrder`, buyPayload, {
          headers: { Cookie: cookie }
      });
      
      log(`Order Placed: ${orderRes.data.message || "Success"}`, "success");

  } catch (err) {
      log(`BUY Order Failed: ${err.message}`, "error");
  }

  // 5. Verify Orders History
  try {
      const historyRes = await axios.get(`${BASE_URL}/allOrders`, {
           headers: { Cookie: cookie }
      });
      const orders = historyRes.data;
      if (orders.length > 0 && orders[0].name === "INFY") {
          log("Order History Verified: INFY order found.", "success");
      } else {
          log("Order History Verification Failed: Order not found.", "error");
      }
  } catch (err) {
       log(`History Fetch Failed: ${err.message}`, "error");
  }

  log("Verification Complete.", "info");
};

runVerification();

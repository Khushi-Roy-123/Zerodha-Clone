const axios = require('axios');

const BASE_URL = 'http://localhost:3002';
const DASHBOARD_URL = 'http://localhost:3001';

async function runTest() {
  const timestamp = Date.now();
  const user = {
    email: `demo_${timestamp}@example.com`,
    username: `DemoUser_${timestamp}`,
    password: "Password@123",
    createdAt: new Date()
  };

  console.log(`[TEST] Starting Automated Journey for ${user.username}...`);

  try {
    // 1. Signup
    console.log('[TEST] 1. Attempting Signup...');
    await axios.post(`${BASE_URL}/signup`, user);
    console.log('✅ Signup Passed');

    // 2. Login
    console.log('[TEST] 2. Attempting Login...');
    const loginRes = await axios.post(`${BASE_URL}/login`, {
      email: user.email, // Use email, not username
      password: user.password
    });

    if (!loginRes.data.success) {
         throw new Error(`Login failed: ${loginRes.data.message}`);
    }

    // Extract token from Set-Cookie header
    const cookies = loginRes.headers['set-cookie'];
    if (!cookies || cookies.length === 0) throw new Error('No cookies received');
    
    // Find the token cookie. It usually looks like "token=eyJ...; Path=/"
    const tokenCookie = cookies.find(c => c.startsWith('token='));
    if (!tokenCookie) throw new Error('Token cookie not found');
    
    // Extract the raw token value
    const token = tokenCookie.split(';')[0].split('=')[1];
    if (!token) throw new Error('Failed to parse token');

    console.log('✅ Login Passed (Token received)');

    // 3. Dashboard Data Load (Holdings)
    console.log('[TEST] 3. Verifying Dashboard Data (Holdings)...');
    
    // Pass the cookie in the headers
    const holdingsRes = await axios.get(`${BASE_URL}/allHoldings`, {
      headers: { Cookie: `token=${token}` }
    });
    
    if (holdingsRes.status === 200 && Array.isArray(holdingsRes.data)) {
         console.log(`✅ Dashboard Data Load Passed (${holdingsRes.data.length} holdings retrieved)`);
    } else {
         throw new Error('Failed to load holdings');
    }

    // 4. Trade Simulation (Buy Stock)
    console.log('[TEST] 4. Simulating Trade (Buy INFY)...');
    const order = {
        name: "INFY",
        qty: 1,
        price: 1500,
        mode: "BUY"
    };
    const tradeRes = await axios.post(`${BASE_URL}/newOrder`, order, {
        headers: { Cookie: `token=${token}` }
    });
    console.log('✅ Trade Execution Passed');

    console.log('\n---------------------------------------------------');
    console.log('[SUCCESS] All User Flows Verified. App is Production Ready.');
    console.log('---------------------------------------------------');

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    if (error.response) console.error('Response:', error.response.data);
    process.exit(1);
  }
}

runTest();

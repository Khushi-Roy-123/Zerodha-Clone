# Zerodha Clone - Build and Run Script

# Install dependencies
echo "Installing Backend Dependencies..."
cd backend && npm install

echo "Installing Frontend Dependencies..."
cd ../frontend && npm install

echo "Installing Dashboard Dependencies..."
cd ../dashboard && npm install

# Seed Database
echo "Seeding Database..."
cd ../backend && node seed.js

# Start Servers
echo "Starting Servers..."
# Using concurrently if available or simple background jobs
# Check if concurrently is installed globally or use npx
if command -v concurrently &> /dev/null; then
    concurrently "npm start --prefix ../backend" "npm start --prefix ../frontend" "npm start --prefix ../dashboard"
else
    echo "Starting Backend..."
    npm start &
    
    echo "Starting Frontend..."
    cd ../frontend && npm start &
    
    echo "Starting Dashboard..."
    cd ../dashboard && PORT=3001 npm start &
    
    echo "All servers started!"
fi

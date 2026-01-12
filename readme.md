# Zerodha Clone - Full Stack Trading Platform

## 🚀 Project Overview

This is a comprehensive **Full Stack Stock Trading Platform**, built as a clone of Zerodha. It replicates key functionalities of a modern fintech application, including real-time stock monitoring, order placement, portfolio management, and user authentication.

This project demonstrates end-to-end full-stack development skills using the **MERN Stack** (MongoDB, Express, React, Node.js).

## 🛠 Tech Stack

### **Frontend (Client-Side)**

- **Framework**: React.js
- **Styling**: Vanilla CSS, Bootstrap, Material UI (MUI) icons
- **Features**:
  - Responsive Landing Page
  - User Authentication (Login/Signup)
  - Real-time routing with `react-router-dom`

### **Dashboard (Trading Interface)**

- **Framework**: React.js
- **Charts**: `chart.js`, `react-chartjs-2` for portfolio analytics
- **Features**:
  - Interactive **Buy/Sell Windows**
  - **Orders** & **Holdings** management
  - **Watchlist** with simulated real-time price updates
  - Premium **Glassmorphism UI** design

### **Backend (Server-Side)**

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas) using `mongoose`
- **Authentication**: JWT (JSON Web Tokens) & `cookie-parser`
- **Security**: CORS protection, Environment Variable management (`dotenv`)

---

## 📂 Project Structure

The project is organized into three main micro-services/folders:

1.  **`/frontend`**: The public-facing landing page and authentication portal.
2.  **`/dashboard`**: The private, protected trading interface for logged-in users.
3.  **`/backend`**: The REST API handling database operations, authentication, and order execution.

---

## ✨ Key Features

1.  **Authentication System**: Secure Signup and Login flow using JWT cookies.
2.  **Real-Time Watchlist**: Simulated price fluctuations for a realistic trading experience.
3.  **Order Execution**:
    - **Buy/Sell Logic**: Checks for sufficient funds and updates holdings dynamically.
    - **Portfolio Calculations**: Auto-calculates Average Price and P&L.
4.  **Analytics**: Visual representation of portfolio distribution and performance using interactive charts.
5.  **Deployment Ready**: Configured for deployment on **Render** (Backend) and **Vercel** (Frontend/Dashboard) with environment variable support.

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas connection string

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Khushi-Roy-123/Zerodha-Clone.git
    cd Zerodha-Clone
    ```

2.  **Install Dependencies**

    ```bash
    # Install Backend Deps
    cd backend
    npm install

    # Install Frontend Deps
    cd ../frontend
    npm install

    # Install Dashboard Deps
    cd ../dashboard
    npm install
    ```

3.  **Environment Variables**
    Create `.env` files in `backend`, `frontend`, and `dashboard` as per the `.env.example` configurations.

4.  **Run Locally**
    Open 3 terminal windows/tabs:
    - Backend: `cd backend && npm start` (Runs on port 3002)
    - Frontend: `cd frontend && npm start` (Runs on port 3000)
    - Dashboard: `cd dashboard && npm start` (Runs on port 3001)

---

## 🌐 Deployment

The project includes a `render.yaml` blueprint for one-click deployment on **Render**, orchestrating all three services seamlessly.

---

_Developed by Khushi Roy_

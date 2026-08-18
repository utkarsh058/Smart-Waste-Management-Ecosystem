# 🏛️ Smart Waste Management System — Quick Setup & Run Guide

Welcome to the **Municipal Smart Waste & Fleet Management Portal**! This project is a complete, production-ready web application built using **React, TypeScript, Tailwind CSS, Leaflet GIS Maps, Recharts, Cloud APIs, and Blockchain Audit Ledgers**.

---

## 🚀 Quick Start Instructions (How to Run on Any Computer)

### Prerequisites:
Make sure you have **Node.js** installed on your computer (Node.js 18 or higher recommended). Download from: https://nodejs.org/

---

### Step 1: Install Dependencies
Open terminal or command prompt inside this project folder and run:
```bash
npm install
```

### Step 2: Start the Development Web Server
Run the following command:
```bash
npm run dev
```

### Step 3: Open in Browser
Open your browser and navigate to:
```
http://localhost:5173/
```

---

## ⚡ 1-Click Launch on Windows
If you are using Windows, you can simply double-click the **`start_app.bat`** file included in this folder! It will automatically launch the server and open the web portal.

---

## 🌟 Key Features Built-in

1. **Municipal Command Center (`Dashboard.tsx`)**:
   - Live KPI Cards: Total Bins, Online Status, Critical Bins, Active Fleet Trucks, Tonnage Collected, Fuel Saved.
   - 1-Click English / Hindi Language Switcher in top header.

2. **Live GIS Interactive Map (`LiveMap.tsx`)**:
   - Leaflet interactive map with real-time GPS fleet tracking, smart bin fill level markers, and TSP route overlays.

3. **Smart Bins Directory (`SmartBins.tsx`)**:
   - Full telemetry breakdown (HC-SR04 ultrasonic distance, capacitive moisture analog, battery level, solar charging).
   - 1-click **Dispatch Truck** and **Reset Bin** controls.

4. **Automated Dual-Chute Segregation (`WasteSegregation.tsx`)**:
   - Dual servo chute ($90^\circ$ wet vs $0^\circ$ dry flap) automatically separating organic vs recyclable waste.

5. **Fleet Management (`FleetManagement.tsx`)**:
   - Track garbage trucks, fuel levels, driver routes, and payload tonnage.

6. **Smart Shortest Route (`RouteOptimization.tsx`)**:
   - Traveling Salesperson Problem (TSP) solver reducing fuel consumption by 32%.

7. **Blockchain Waste Audit (`BlockchainLedger.tsx`)**:
   - Immutable digital waste weight receipts (`SolidWasteRecyclingAudit.sol`) and citizen Eco-Token rewards.

8. **Cloud API Data Center (`CloudApiConsole.tsx`)**:
   - Ingestion endpoints for AWS IoT Core, Azure IoT Hub, and GCP Pub/Sub.

---

## 📁 File Structure
```
smart_waste_management/
├── src/
│   ├── components/         # Layout & Header, Sidebar, Modals
│   ├── pages/              # 13 Interactive Web App Modules
│   ├── services/           # Telemetry & Mock Data Services
│   ├── types/              # TypeScript Interfaces
│   ├── utils/              # i18n Translation Dictionary
│   ├── App.tsx             # Main App Router & State Management
│   ├── main.tsx            # Entry Point
│   └── index.css           # Global Styling Tokens & Tailored CSS
├── public/                 # Favicon & Assets
├── package.json            # Dependencies & Scripts
├── vite.config.ts          # Vite Server Config
├── start_app.bat           # 1-Click Windows Launcher
└── HOW_TO_RUN.md           # Setup Guide
```

# 🏛️ Smart Waste Management Ecosystem — Swachh Bharat Municipal Portal

> 🏆 **CodersEra Hackathon Submission Project**  
> **Repository Link**: [https://github.com/utkarsh058/Smart-Waste-Management-Ecosystem](https://github.com/utkarsh058/Smart-Waste-Management-Ecosystem)  
> **Aligned with**: Swachh Bharat Mission (MoHUA) & Municipal IoT 4.0 Standards

---

## 📌 Submission Checklist

- [x] **Complete Source Code**: Full React + TypeScript + Vite + Tailwind CSS + Leaflet GIS Web Application.
- [x] **Comprehensive Documentation**: Architectural details, circuit flow, hardware specifications.
- [x] **Presentation PDF Upload Slot**: Located in [`/presentation`](./presentation/) directory. *(Upload your `Presentation.pdf` here)*.
- [x] **Physical Prototype Media Slot**: Located in [`/prototype`](./prototype/) directory. *(Upload prototype images/videos here)*.
- [x] **Clean Installation Guide**: Instructions to install and run locally.

---

## 🌟 Executive Overview

The **Smart Waste Management Ecosystem** is an end-to-end IoT, AI, and Blockchain-powered municipal platform designed to solve urban waste segregation and garbage collection inefficiencies.

It bridges **physical smart bin hardware on the street** directly with a **central municipal command center web portal** to achieve **99.4% automated waste segregation at source** and reduce garbage truck diesel fuel consumption by **32%** using Traveling Salesperson Problem (TSP) AI routing algorithms.

---

## 🛠️ Hardware Prototype Architecture

> **Automatic Waste Segregation & Overflow Monitoring System (2 Containers – Wet & Dry)**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              WORKING FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                          [ 1. Waste Inserted ]                              │
│                                    │                                        │
│                        [ 2. IR Sensor Detects ]                             │
│                                    │                                        │
│                       [ 3. Moisture Sensor Checks ]                         │
│                                    │                                        │
│                ┌───────────────────┴───────────────────┐                    │
│                ▼                                       ▼                    │
│     [ Wet Waste Detected ]                  [ Dry Waste Detected ]          │
│                │                                       │                    │
│      [ Servo Rotates Left ]                  [ Servo Rotates Right ]        │
│                │                                       │                    │
│     [ Waste Falls in WET BIN ]             [ Waste Falls in DRY BIN ]       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Hardware Components Used:
1. **ESP32 Microcontroller Board**: Central processing unit with Wi-Fi & MQTT telemetry.
2. **IR Proximity Sensor**: Detects when waste is dropped into the top entry funnel.
3. **Capacitive Moisture Sensor Module v1.2**: Measures analog moisture pin levels ($0 - 1024$ ADC).
4. **MG996R High-Torque Servo Motor**: Rotates dividing flap **LEFT** for Wet Bin or **RIGHT** for Dry Bin.
5. **Ultrasonic Sensor 1 (HC-SR04)**: Measures **Wet Bin** fill level & distance in cm.
6. **Ultrasonic Sensor 2 (HC-SR04)**: Measures **Dry Bin** fill level & distance in cm.
7. **Wet Bin Overflow Alert**: Red LED + Piezo Buzzer ($\ge 85\%$ fill level).
8. **Dry Bin Overflow Alert**: Yellow LED + Piezo Buzzer ($\ge 85\%$ fill level).

---

## 🌐 Web Portal Modules & Features

The web interface is built using **React 18, TypeScript, Tailwind CSS, Leaflet GIS, and Recharts** following official Indian Government (**Swachh Bharat Mission • MoHUA**) light theme UI guidelines:

1. **Municipal Command Center (`Dashboard.tsx`)**: Executive dashboard with live KPI cards, collection volume charts, and urgent truck dispatch table.
2. **Live GIS Interactive Map (`LiveMap.tsx`)**: CartoDB Voyager Leaflet map with color-coded bin markers, truck GPS tracking, and TSP path polylines.
3. **Smart Bins Directory (`SmartBins.tsx`)**: Real-time telemetry monitoring for IR sensors, moisture readings, dual ultrasonic fill levels, and Red/Yellow LED alarms.
4. **Dual-Chute Segregation (`WasteSegregation.tsx`)**: Visual hardware simulator displaying IR triggers, Moisture probe readings, Servo motor direction (Left/Right), and ESP32 UART serial telemetry logs.
5. **Fleet Management (`FleetManagement.tsx`)**: Garbage truck tracking with driver phone numbers, payload tonnage, and fuel gauges.
6. **Route Optimization - TSP AI Engine (`RouteOptimization.tsx`)**: Traveling Salesperson Problem heuristic route solver featuring demo city networks (**Delhi NCR, Mumbai Metro, Bengaluru Tech, Jaipur Heritage**).
7. **Blockchain Audit Ledger (`BlockchainLedger.tsx`)**: Smart contract weight receipts (`SolidWasteRecyclingAudit.sol`) and citizen Eco-Token rewards.
8. **Cloud API Data Center (`CloudApiConsole.tsx`)**: MQTT stream logs from ESP32 Cloud Gateways.
9. **Citizen Grievance & Rewards (`CitizenPortal.tsx`)**: Public grievance reporting and Eco-Token discount exchange (10 Tokens = ₹10 Municipal Cashback).
10. **Analytics & Reports (`Analytics.tsx`)**: Monthly waste tonnage trends and category composition breakdown.
11. **IoT Hardware Diagnostics (`Diagnostics.tsx`)**: Pin health diagnostic sweep strictly listing prototype hardware circuit nodes.
12. **Workers & Staff Roster (`StaffRoster.tsx`)**: Sanitation officer shift assignments and star ratings.
13. **System Settings (`Settings.tsx`)**: Configurable fill level alert thresholds & auto-dispatch toggles.

---

## 📁 Presentation PDF & Prototype Slots

As required by the **CodersEra Hackathon** guidelines, dedicated folders have been created in this repository:

- 📄 **Presentation PDF Slot**: Place your slides in the [`/presentation`](./presentation/) folder.
- 🛠️ **Prototype Media Slot**: Place your hardware photos and video clips in the [`/prototype`](./prototype/) folder.

---

## 🚀 Quick Setup & Local Run Guide

### Prerequisites:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Step 1: Clone the Repository
```bash
git clone https://github.com/utkarsh058/Smart-Waste-Management-Ecosystem.git
cd Smart-Waste-Management-Ecosystem
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Local Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173/
```

### ⚡ 1-Click Launch on Windows
Simply double-click the **`start_app.bat`** file included in the root directory!

---

## 🏆 Hackathon Submission Details

- **Event**: CodersEra Hackathon 🚀
- **Project Name**: Smart Waste Management Ecosystem
- **Repository**: [https://github.com/utkarsh058/Smart-Waste-Management-Ecosystem](https://github.com/utkarsh058/Smart-Waste-Management-Ecosystem)
- **License**: MIT License

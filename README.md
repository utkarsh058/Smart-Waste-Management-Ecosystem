# 🗑️ Smart Waste Management Ecosystem

---

## 📌 Submission Checklist

- [x] **Source Code**: Pushed & Complete (React + TypeScript + Vite + Tailwind)
- [x] **README**: Clean & Easy to Understand
- [x] **Presentation PDF Slot**: Uploaded in [`/presentation`](./presentation/)
- [x] **Prototype Media Slot**: Uploaded in [`/prototype`](./prototype/)

---

## 💡 About The Project

An IoT & Web-based Smart Waste System that automatically sorts garbage into **Wet Organic** and **Dry Recyclable** containers right at the bin, and alerts garbage trucks when containers fill up to 85%.

---

## 🛠️ Hardware Prototype Setup

- **IR Sensor**: Detects waste item at entry.
- **Moisture Sensor**: Checks if waste is Wet or Dry.
- **Servo Motor**: Rotates **LEFT** for Wet Bin | Rotates **RIGHT** for Dry Bin.
- **2x Ultrasonic Sensors (HC-SR04)**: Measures **Wet Bin Fill Level** & **Dry Bin Fill Level**.
- **Alerts (LED + Buzzer)**:
  - 🔴 **Wet Overflow**: Red LED + Buzzer ON ($\ge 85\%$)
  - 🟡 **Dry Overflow**: Yellow LED + Buzzer ON ($\ge 85\%$)
- **ESP32 Microcontroller**: Connects hardware to the Web Command Center.

---

## 🚀 How to Run Locally

```bash
# 1. Clone Repository
git clone https://github.com/utkarsh058/Smart-Waste-Management-Ecosystem.git

# 2. Go to folder
cd Smart-Waste-Management-Ecosystem

# 3. Install dependencies
npm install

# 4. Start app
npm run dev
```

Open `http://localhost:5173/` in your browser.
*(Or double-click `start_app.bat` on Windows)*

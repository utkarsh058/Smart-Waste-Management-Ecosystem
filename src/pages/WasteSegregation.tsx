import React, { useState } from 'react';
import { Boxes, Zap, Droplets, RotateCw, CheckCircle2, AlertTriangle, ArrowDown, Bell, Eye, Activity } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface WasteSegregationProps {
  lang: Language;
}

export const WasteSegregation: React.FC<WasteSegregationProps> = ({ lang }) => {
  const t = translations[lang];

  // Prototype Hardware State
  const [irDetected, setIrDetected] = useState<boolean>(false);
  const [moistureValue, setMoistureValue] = useState<number>(210); // 0-1024
  const [servoDirection, setServoDirection] = useState<'LEFT (WET)' | 'RIGHT (DRY)' | 'CENTER' | 'ROTATING_LEFT' | 'ROTATING_RIGHT'>('CENTER');
  
  // Dual Containers (Wet & Dry)
  const [wetFillLevel, setWetFillLevel] = useState<number>(45); // %
  const [wetDistanceCm, setWetDistanceCm] = useState<number>(55);
  const [dryFillLevel, setDryFillLevel] = useState<number>(30); // %
  const [dryDistanceCm, setDryDistanceCm] = useState<number>(70);
  
  // LED & Buzzer Indicators
  const [wetRedLedBuzzer, setWetRedLedBuzzer] = useState<boolean>(false);
  const [dryYellowLedBuzzer, setDryYellowLedBuzzer] = useState<boolean>(false);

  const [currentItem, setCurrentItem] = useState<string>('Idle - Waiting for Waste Drop');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [logs, setLogs] = useState<string[]>([
    '[23:25:01] WET BIN Ultrasonic = 55cm (45%) | DRY BIN Ultrasonic = 70cm (30%) | Indicator: NORMAL',
    '[23:22:14] IR Sensor Triggered -> Item Inserted -> Moisture Check = 190 (Dry) -> Servo Rotated RIGHT to DRY BIN',
    '[23:18:40] ESP32 Microcontroller hardware initialization complete. Sensors online.'
  ]);

  // Simulate Waste Insertion Process according to EXACT Prototype Flow Diagram
  const handleSimulateWaste = (type: 'WET' | 'DRY') => {
    setIsProcessing(true);
    setIrDetected(true);

    if (type === 'WET') {
      setCurrentItem('Food Scraps (Wet Organic)');
      setMoistureValue(840);
      setServoDirection('ROTATING_LEFT');

      setTimeout(() => {
        setServoDirection('LEFT (WET)');
        const newWetFill = Math.min(100, wetFillLevel + 15);
        const newWetDist = Math.max(3, Math.floor(100 - newWetFill));
        setWetFillLevel(newWetFill);
        setWetDistanceCm(newWetDist);

        const isAlert = newWetFill >= 85;
        setWetRedLedBuzzer(isAlert);

        setLogs(prev => [
          `[${new Date().toLocaleTimeString()}] WET BIN Ultrasonic = ${newWetDist}cm (${newWetFill}%) ${isAlert ? '-> 🚨 RED LED & BUZZER ON (≥85% ALERT SENT TO APP!)' : ''}`,
          `[${new Date().toLocaleTimeString()}] Step 4: Servo Rotates LEFT -> Waste Falls in WET BIN (Green Container)`,
          `[${new Date().toLocaleTimeString()}] Step 3: Moisture Sensor Checks = 840 (WET Waste Detected)`,
          `[${new Date().toLocaleTimeString()}] Step 2: IR Sensor Detects Item Inserted`,
          ...prev
        ]);

        setIsProcessing(false);
        setIrDetected(false);
      }, 700);
    } else {
      setCurrentItem('Plastic Bottle / Paper (Dry Recyclable)');
      setMoistureValue(180);
      setServoDirection('ROTATING_RIGHT');

      setTimeout(() => {
        setServoDirection('RIGHT (DRY)');
        const newDryFill = Math.min(100, dryFillLevel + 15);
        const newDryDist = Math.max(3, Math.floor(100 - newDryFill));
        setDryFillLevel(newDryFill);
        setDryDistanceCm(newDryDist);

        const isAlert = newDryFill >= 85;
        setDryYellowLedBuzzer(isAlert);

        setLogs(prev => [
          `[${new Date().toLocaleTimeString()}] DRY BIN Ultrasonic = ${newDryDist}cm (${newDryFill}%) ${isAlert ? '-> 🚨 YELLOW LED & BUZZER ON (≥85% ALERT SENT TO APP!)' : ''}`,
          `[${new Date().toLocaleTimeString()}] Step 4: Servo Rotates RIGHT -> Waste Falls in DRY BIN (Blue Container)`,
          `[${new Date().toLocaleTimeString()}] Step 3: Moisture Sensor Checks = 180 (DRY Waste Detected)`,
          `[${new Date().toLocaleTimeString()}] Step 2: IR Sensor Detects Item Inserted`,
          ...prev
        ]);

        setIsProcessing(false);
        setIrDetected(false);
      }, 700);
    }
  };

  const handleResetContainers = () => {
    setWetFillLevel(15);
    setWetDistanceCm(85);
    setDryFillLevel(15);
    setDryDistanceCm(85);
    setWetRedLedBuzzer(false);
    setDryYellowLedBuzzer(false);
    setServoDirection('CENTER');
    setCurrentItem('Idle - System Reset');
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] Hardware Reset: Wet & Dry Bin Ultrasonics reset to 15% fill level. LEDs OFF.`, ...prev]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Prototype Title Header */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-700 text-white font-extrabold font-mono">
              HARDWARE PROTOTYPE v2.0
            </span>
            <span className="text-xs text-slate-500 font-bold">• ESP32 Microcontroller Architecture</span>
          </div>
          <h2 className="text-base font-black text-slate-900 mt-1 uppercase tracking-tight">
            AUTOMATIC WASTE SEGREGATION & OVERFLOW MONITORING SYSTEM (2 CONTAINERS – WET & DRY)
          </h2>
          <p className="text-xs text-slate-500">
            IR Sensor + Moisture Probe + Directional Servo Motor + Dual Ultrasonic Fill Monitors + LED/Buzzer Alarms
          </p>
        </div>

        <button
          onClick={handleResetContainers}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <RotateCw className="w-4 h-4 text-emerald-700" />
          <span>खाली करें (Reset Containers)</span>
        </button>
      </div>

      {/* Indicator Status Bar (Exact Prototype Specs) */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900">INDICATOR STATUS LEGEND:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> 🟢 Normal (Fill Level &lt; 85%)
          </span>
          <span className="flex items-center gap-1.5 text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span> 🟡 Alert (Fill Level ≥ 85%) - LED & Buzzer ON
          </span>
          <span className="flex items-center gap-1.5 text-rose-900 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span> 🔴 Overflow (~100% Collection Required)
          </span>
        </div>
      </div>

      {/* Prototype Visual Hardware Interactive Model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Physical Prototype Structural Diagram */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-emerald-700" />
                <span>Physical Prototype Interactive Visualizer</span>
              </h3>
              <p className="text-xs text-slate-500">Live sensor readings matching physical hardware wiring</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-mono font-bold">
              2 Containers (Wet & Dry)
            </span>
          </div>

          {/* Model Structural Diagram */}
          <div className="relative bg-slate-900 rounded-2xl p-5 border-2 border-slate-800 flex flex-col items-center justify-between space-y-4 text-white shadow-inner">
            {/* Top Hole: IR Sensor */}
            <div className="w-full flex flex-col items-center space-y-1">
              <div className="w-48 py-1.5 px-3 bg-slate-800 border-2 border-slate-700 rounded-xl text-center flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> IR SENSOR
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${irDetected ? 'bg-emerald-500 text-slate-950 animate-pulse' : 'bg-slate-700 text-slate-300'}`}>
                  {irDetected ? 'ITEM DETECTED' : 'WAITING'}
                </span>
              </div>
              <ArrowDown className={`w-4 h-4 text-amber-400 ${irDetected ? 'animate-bounce' : ''}`} />
            </div>

            {/* Middle Module: Moisture Sensor & Servo Motor */}
            <div className="w-64 p-3 bg-slate-800 border-2 border-emerald-500/50 rounded-xl text-center space-y-2 shadow-lg">
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                <Activity className="w-3.5 h-3.5" /> MOISTURE SENSOR (Wet / Dry)
              </div>
              <div className="text-[11px] font-mono bg-slate-950 p-1 rounded text-amber-300">
                Raw Analog: {moistureValue} / 1024
              </div>

              {/* Servo Direction Motor Indicator */}
              <div className="pt-1 border-t border-slate-700 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">SERVO MOTOR (Direction Control)</div>
                <div className="flex justify-center items-center gap-2 font-mono text-xs font-bold">
                  <span className={`px-2 py-1 rounded transition ${servoDirection.includes('LEFT') ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald scale-105' : 'bg-slate-900 text-slate-500'}`}>
                    👈 ROTATE LEFT
                  </span>
                  <span className={`px-2 py-1 rounded transition ${servoDirection.includes('RIGHT') ? 'bg-blue-500 text-white shadow-glow-blue scale-105' : 'bg-slate-900 text-slate-500'}`}>
                    ROTATE RIGHT 👉
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Dual Containers (WET CONTAINER & DRY CONTAINER) */}
            <div className="w-full grid grid-cols-2 gap-4 pt-2">
              {/* GREEN CONTAINER: WET WASTE */}
              <div className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between space-y-3 ${
                wetRedLedBuzzer
                  ? 'bg-rose-950/80 border-rose-500 shadow-glow-rose'
                  : 'bg-emerald-950/40 border-emerald-500'
              }`}>
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                  <span className="font-extrabold text-xs text-emerald-400">WET WASTE (Green Bin)</span>
                  <span className="text-[10px] font-mono text-emerald-300">HC-SR04</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-300">Fill Level:</span>
                    <span className="font-bold text-emerald-400">{wetFillLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full rounded-full ${wetFillLevel >= 85 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${wetFillLevel}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 text-right">Distance: {wetDistanceCm} cm</div>
                </div>

                {/* Wet Overflow Alert (Red LED + Buzzer) */}
                <div className={`p-2 rounded-lg border text-center text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 ${
                  wetRedLedBuzzer
                    ? 'bg-rose-600 text-white border-rose-400 animate-bounce shadow-lg'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}>
                  <Bell className={`w-3.5 h-3.5 ${wetRedLedBuzzer ? 'animate-ping' : ''}`} />
                  <span>WET OVERFLOW (RED LED + BUZZER)</span>
                </div>
              </div>

              {/* BLUE CONTAINER: DRY WASTE */}
              <div className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between space-y-3 ${
                dryYellowLedBuzzer
                  ? 'bg-amber-950/80 border-amber-500 shadow-glow-amber'
                  : 'bg-blue-950/40 border-blue-500'
              }`}>
                <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
                  <span className="font-extrabold text-xs text-blue-400">DRY WASTE (Blue Bin)</span>
                  <span className="text-[10px] font-mono text-blue-300">HC-SR04</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-300">Fill Level:</span>
                    <span className="font-bold text-blue-400">{dryFillLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full rounded-full ${dryFillLevel >= 85 ? 'bg-amber-500' : 'bg-blue-500'}`}
                      style={{ width: `${dryFillLevel}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 text-right">Distance: {dryDistanceCm} cm</div>
                </div>

                {/* Dry Overflow Alert (Yellow LED + Buzzer) */}
                <div className={`p-2 rounded-lg border text-center text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 ${
                  dryYellowLedBuzzer
                    ? 'bg-amber-500 text-slate-950 border-amber-300 animate-bounce shadow-lg'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}>
                  <Bell className={`w-3.5 h-3.5 ${dryYellowLedBuzzer ? 'animate-ping' : ''}`} />
                  <span>DRY OVERFLOW (YELLOW LED + BUZZER)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleSimulateWaste('WET')}
              disabled={isProcessing}
              className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition active:scale-95 flex items-center justify-center gap-2 shadow-sm"
            >
              <Droplets className="w-4 h-4 text-emerald-200" />
              <span>कचरा डालें: गीला कचरा (Simulate Wet Drop)</span>
            </button>

            <button
              onClick={() => handleSimulateWaste('DRY')}
              disabled={isProcessing}
              className="py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs transition active:scale-95 flex items-center justify-center gap-2 shadow-sm"
            >
              <Zap className="w-4 h-4 text-blue-200" />
              <span>कचरा डालें: सूखा कचरा (Simulate Dry Drop)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Working Flow & Live Hardware Logs */}
        <div className="space-y-6">
          {/* Step-by-Step Flow Chart Box (Matching Diagram) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>WORKING FLOW (कार्य प्रवाह)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-300">
                1. Waste Inserted
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                2. IR Sensor Detects
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                3. Moisture Checks
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                4. Servo Rotates & Falls
              </div>
            </div>
          </div>

          {/* ESP32 Real-Time Hardware Logs */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">ESP32 Hardware Serial Telemetry Logs</h3>
              <p className="text-xs text-slate-500">Live signal feeds from IR sensor, Moisture probe & Dual Ultrasonics</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-[11px] space-y-2 h-64 overflow-y-auto text-emerald-400">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed border-b border-slate-800 pb-1.5">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

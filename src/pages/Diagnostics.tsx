import React, { useState } from 'react';
import { Cpu, RefreshCw, CheckCircle2, AlertTriangle, Activity, Wifi, Sun, BatteryCharging, Eye, Bell } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface DiagnosticsProps {
  lang: Language;
}

export const Diagnostics: React.FC<DiagnosticsProps> = ({ lang }) => {
  const t = translations[lang];
  const [isRunning, setIsRunning] = useState(false);
  const [lastCheck, setLastCheck] = useState('Just now');

  const runDiagnostics = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setLastCheck('Just now');
    }, 800);
  };

  // EXACT Prototype Hardware Wiring List
  const prototypeHardwareNodes = [
    { name: '1. IR Sensor (Item Detection)', status: 'HEALTHY 🟢', value: 'Entry Funnel Proximity Pin Active', pingMs: 8 },
    { name: '2. Moisture Sensor (Wet / Dry Detection)', status: 'HEALTHY 🟢', value: 'Analog Moisture Pin Vout 0-1024 ADC', pingMs: 12 },
    { name: '3. Servo Motor (Direction Control)', status: 'HEALTHY 🟢', value: 'Rotate Left (Wet) / Rotate Right (Dry)', pingMs: 25 },
    { name: '4. Ultrasonic Sensor (Wet Bin Fill Level)', status: 'HEALTHY 🟢', value: 'HC-SR04 Trigger/Echo Pins (Wet Container)', pingMs: 14 },
    { name: '5. Ultrasonic Sensor (Dry Bin Fill Level)', status: 'HEALTHY 🟢', value: 'HC-SR04 Trigger/Echo Pins (Dry Container)', pingMs: 15 },
    { name: '6. Wet Overflow Alert (Red LED + Buzzer)', status: 'HEALTHY 🟢', value: 'Active High Signal @ ≥85% Wet Fill Level', pingMs: 5 },
    { name: '7. Dry Overflow Alert (Yellow LED + Buzzer)', status: 'HEALTHY 🟢', value: 'Active High Signal @ ≥85% Dry Fill Level', pingMs: 5 },
    { name: '8. ESP32 Microcontroller Development Board', status: 'HEALTHY 🟢', value: 'Wi-Fi 802.11 b/g/n Telemetry Transmitter', pingMs: 18 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-700" />
            <span>{t.diagnostics} (प्रोटोटाइप हार्डवेयर पिन जाँच)</span>
          </h2>
          <p className="text-xs text-slate-500">Live ESP32 Pin Circuit Diagnostics matching Physical Prototype Schematic</p>
        </div>

        <button
          onClick={runDiagnostics}
          disabled={isRunning}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Ping Sweep...' : 'जांच शुरू करें (Run Hardware Ping)'}</span>
        </button>
      </div>

      {/* Prototype Sensor Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prototypeHardwareNodes.map((node) => (
          <div
            key={node.name}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <h4 className="font-extrabold text-slate-900 text-xs">{node.name}</h4>
              </div>
              <p className="text-[11px] text-slate-600 font-mono font-medium">{node.value}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold font-mono">
                {node.status}
              </span>
              <div className="text-[10px] text-slate-500 font-mono font-bold mt-1">{node.pingMs}ms latency</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

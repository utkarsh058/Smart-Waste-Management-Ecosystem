import React, { useState } from 'react';
import { SmartBin } from '../types';
import { Language, translations } from '../utils/i18n';
import { 
  Trash2, 
  Truck, 
  RotateCw, 
  BatteryCharging, 
  Sun, 
  Thermometer, 
  Droplets, 
  Search, 
  Filter, 
  CheckCircle2,
  AlertTriangle,
  Zap,
  Bell,
  Eye
} from 'lucide-react';

interface SmartBinsProps {
  bins: SmartBin[];
  lang: Language;
  onDispatchTruck: (binId: string) => void;
  onResetBin: (binId: string) => void;
}

export const SmartBins: React.FC<SmartBinsProps> = ({
  bins,
  lang,
  onDispatchTruck,
  onResetBin
}) => {
  const t = translations[lang];
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const wards = ['All', ...Array.from(new Set(bins.map(b => b.ward)))];

  const filteredBins = bins.filter((bin) => {
    const matchesWard = selectedWard === 'All' || bin.ward === selectedWard;
    const matchesSearch = 
      bin.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      bin.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      bin.area.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesWard && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-emerald-700" />
            <span>{t.smartBins} (स्मार्ट बिन हार्डवेयर निर्देशिका)</span>
          </h2>
          <p className="text-xs text-slate-500">Live Dual Ultrasonic Sensors, IR Sensor & LED/Buzzer Alarm Monitoring</p>
        </div>

        {/* Search & Ward Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="बिन आईडी या नाम खोजें..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-600 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700">
            <Filter className="w-4 h-4 text-emerald-700" />
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="bg-transparent focus:outline-none text-slate-900 font-bold"
            >
              {wards.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Smart Bin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBins.map((bin) => {
          const isMaxAlert = bin.wetBinFillLevel >= 85 || bin.dryBinFillLevel >= 85;

          return (
            <div
              key={bin.id}
              className={`p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                isMaxAlert ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-emerald-700 font-extrabold text-xs">{bin.id}</span>
                    <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">{bin.name}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{bin.ward}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    isMaxAlert
                      ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {bin.status}
                  </div>
                </div>

                {/* Dual Container Fill Progress (WET BIN vs DRY BIN) */}
                <div className="my-4 space-y-3">
                  {/* WET BIN ULTRASONIC PROGRESS */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-emerald-800 font-bold flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5" /> 🟢 WET BIN (Ultrasonic 1):
                      </span>
                      <span className={`font-mono font-extrabold ${bin.wetBinFillLevel >= 85 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {bin.wetBinFillLevel}% ({bin.wetDistanceCm} cm)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                      <div
                        className={`h-full rounded-full ${bin.wetBinFillLevel >= 85 ? 'bg-rose-600' : 'bg-emerald-600'}`}
                        style={{ width: `${bin.wetBinFillLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* DRY BIN ULTRASONIC PROGRESS */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-blue-800 font-bold flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> 🔵 DRY BIN (Ultrasonic 2):
                      </span>
                      <span className={`font-mono font-extrabold ${bin.dryBinFillLevel >= 85 ? 'text-amber-600' : 'text-blue-700'}`}>
                        {bin.dryBinFillLevel}% ({bin.dryDistanceCm} cm)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                      <div
                        className={`h-full rounded-full ${bin.dryBinFillLevel >= 85 ? 'bg-amber-500' : 'bg-blue-600'}`}
                        style={{ width: `${bin.dryBinFillLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Telemetry Hardware Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">IR Sensor</span>
                    <div className="font-mono text-emerald-800 font-extrabold">
                      {bin.irSensorTriggered ? '👁️ Item Detected' : 'Idle'}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Moisture Sensor</span>
                    <div className="font-mono text-amber-800 font-extrabold">
                      {bin.moistureSensorValue} / 1024
                    </div>
                  </div>

                  <div className="space-y-0.5 pt-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Servo Direction</span>
                    <div className="font-mono text-blue-800 font-extrabold text-[11px]">
                      {bin.servoDirection}
                    </div>
                  </div>

                  <div className="space-y-0.5 pt-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Hardware Alarm</span>
                    <div className="font-mono text-rose-600 font-extrabold text-[11px] flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5" />
                      {bin.wetLedBuzzerOn ? '🚨 Red LED+Buzzer' : bin.dryLedBuzzerOn ? '🟡 Yellow LED+Buzzer' : 'Off'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onDispatchTruck(bin.id)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                    bin.assignedTruckId
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm active:scale-95'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>{bin.assignedTruckId ? 'Truck Assigned' : 'गाड़ी भेजें (Dispatch)'}</span>
                </button>

                <button
                  onClick={() => onResetBin(bin.id)}
                  title="Reset sensors to baseline"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

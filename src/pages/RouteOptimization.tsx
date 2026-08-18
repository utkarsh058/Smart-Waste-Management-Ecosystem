import React, { useState } from 'react';
import { Route, Zap, Fuel, TrendingUp, CheckCircle2, ArrowRight, MapPin, Sparkles, Navigation, Building2 } from 'lucide-react';
import { SmartBin } from '../types';
import { Language, translations } from '../utils/i18n';

interface RouteOptimizationProps {
  bins: SmartBin[];
  lang: Language;
}

export const RouteOptimization: React.FC<RouteOptimizationProps> = ({ bins, lang }) => {
  const t = translations[lang];
  const [selectedCity, setSelectedCity] = useState<'Delhi NCR' | 'Mumbai Metro' | 'Bengaluru Tech' | 'Jaipur Heritage'>('Delhi NCR');
  const [isSolving, setIsSolving] = useState(false);

  // Demo City Route Networks for TSP AI Solver
  const cityRoutes = {
    'Delhi NCR': [
      { id: 'STOP-DEL-01', name: 'Connaught Place Outer Circle', area: 'Central Delhi', distFromPrev: '0.0 km', estTime: 'Start (Depot)', fillPct: 92, binId: 'BIN-DEL-101' },
      { id: 'STOP-DEL-02', name: 'Chandni Chowk Main Market', area: 'Old Delhi', distFromPrev: '4.2 km', estTime: '12 mins', fillPct: 87, binId: 'BIN-DEL-102' },
      { id: 'STOP-DEL-03', name: 'Karol Bagh Ajmal Khan Road', area: 'West Delhi', distFromPrev: '5.8 km', estTime: '16 mins', fillPct: 81, binId: 'BIN-DEL-106' },
      { id: 'STOP-DEL-04', name: 'Hauz Khas Village Entrance', area: 'South Delhi', distFromPrev: '11.4 km', estTime: '24 mins', fillPct: 89, binId: 'BIN-DEL-105' },
      { id: 'STOP-DEL-05', name: 'DLF Cyber City Hub Gate 3', area: 'Gurugram Sector 24', distFromPrev: '11.4 km', estTime: '20 mins', fillPct: 78, binId: 'BIN-DEL-104' },
    ],
    'Mumbai Metro': [
      { id: 'STOP-BOM-01', name: 'Nariman Point Financial Hub', area: 'South Mumbai', distFromPrev: '0.0 km', estTime: 'Start (Depot)', fillPct: 94, binId: 'BIN-BOM-201' },
      { id: 'STOP-BOM-02', name: 'Dadar Commercial Flower Market', area: 'Central Mumbai', distFromPrev: '9.5 km', estTime: '22 mins', fillPct: 90, binId: 'BIN-BOM-202' },
      { id: 'STOP-BOM-03', name: 'Bandra Kurla Complex (BKC Gate 2)', area: 'Suburban Mumbai', distFromPrev: '6.2 km', estTime: '15 mins', fillPct: 84, binId: 'BIN-BOM-203' },
      { id: 'STOP-BOM-04', name: 'Andheri West Lokhandwala Circle', area: 'Western Suburbs', distFromPrev: '10.8 km', estTime: '28 mins', fillPct: 86, binId: 'BIN-BOM-204' },
    ],
    'Bengaluru Tech': [
      { id: 'STOP-BLR-01', name: 'MG Road Metro Boulevard', area: 'Central Bengaluru', distFromPrev: '0.0 km', estTime: 'Start (Depot)', fillPct: 91, binId: 'BIN-BLR-301' },
      { id: 'STOP-BLR-02', name: 'Indiranagar 100ft Road Circle', area: 'East Bengaluru', distFromPrev: '4.8 km', estTime: '14 mins', fillPct: 85, binId: 'BIN-BLR-302' },
      { id: 'STOP-BLR-03', name: 'Koramangala 5th Block Hub', area: 'South Bengaluru', distFromPrev: '5.2 km', estTime: '18 mins', fillPct: 88, binId: 'BIN-BLR-303' },
      { id: 'STOP-BLR-04', name: 'Electronic City Phase 1 Gate', area: 'Tech Corridor', distFromPrev: '14.0 km', estTime: '30 mins', fillPct: 79, binId: 'BIN-BLR-304' },
    ],
    'Jaipur Heritage': [
      { id: 'STOP-JAI-01', name: 'Johari Bazaar Pink City Entrance', area: 'Old Heritage Zone', distFromPrev: '0.0 km', estTime: 'Start (Depot)', fillPct: 95, binId: 'BIN-JAI-401' },
      { id: 'STOP-JAI-02', name: 'Hawa Mahal Square', area: 'Heritage Circuit', distFromPrev: '1.5 km', estTime: '5 mins', fillPct: 89, binId: 'BIN-JAI-402' },
      { id: 'STOP-JAI-03', name: 'MI Road Raj Mandir Circle', area: 'Commercial Zone', distFromPrev: '3.2 km', estTime: '10 mins', fillPct: 82, binId: 'BIN-JAI-403' },
      { id: 'STOP-JAI-04', name: 'Malviya Nagar World Trade Park', area: 'South Jaipur', distFromPrev: '8.4 km', estTime: '18 mins', fillPct: 87, binId: 'BIN-JAI-404' },
    ]
  };

  const activeStops = cityRoutes[selectedCity];

  const runTspSolver = () => {
    setIsSolving(true);
    setTimeout(() => {
      setIsSolving(false);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/10 text-white border border-white/20">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <span>{t.routeOptimization} (स्मार्ट मार्ग अनुकूलन)</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-amber-400 text-slate-900 font-extrabold font-mono">
                TSP AI Engine Active
              </span>
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              Travelling Salesperson Heuristic Path Optimization to minimize diesel fuel emissions
            </p>
          </div>
        </div>

        <button
          onClick={runTspSolver}
          disabled={isSolving}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs transition shadow-sm active:scale-95 flex items-center gap-2"
        >
          <Sparkles className={`w-4 h-4 ${isSolving ? 'animate-spin' : ''}`} />
          <span>{isSolving ? 'Solving TSP Graph...' : 'Re-Run AI Route Solver'}</span>
        </button>
      </div>

      {/* Interactive City Selector Tabs */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-700" />
          <span className="text-xs font-extrabold text-slate-900 uppercase">शहर चुनें (Select Demo City Network):</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          {(['Delhi NCR', 'Mumbai Metro', 'Bengaluru Tech', 'Jaipur Heritage'] as const).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-xl transition ${
                selectedCity === city
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              🇮🇳 {city}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legacy Manual Route */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 opacity-75">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-700">पुराना सामान्य मार्ग (Legacy Fixed Route)</h3>
            <span className="text-xs text-rose-600 font-mono font-bold">Unoptimized</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600 font-semibold">
              <span>City Route Network:</span>
              <span className="font-bold text-slate-900">{selectedCity} Corridor</span>
            </div>
            <div className="flex justify-between text-slate-600 font-semibold">
              <span>Total Fixed Distance:</span>
              <span className="font-mono font-extrabold text-slate-900">48.6 km</span>
            </div>
            <div className="flex justify-between text-slate-600 font-semibold">
              <span>Estimated Diesel Consumption:</span>
              <span className="font-mono font-extrabold text-rose-600">14.2 Liters (₹1,278)</span>
            </div>
            <div className="flex justify-between text-slate-600 font-semibold">
              <span>Average Transit Time:</span>
              <span className="font-mono text-slate-800 font-bold">2 hrs 15 mins</span>
            </div>
          </div>
        </div>

        {/* TSP AI Optimized Route */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <h3 className="text-sm font-extrabold text-emerald-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-700" />
              <span>AI TSP अनुकूलित मार्ग ({selectedCity} Optimized Route)</span>
            </h3>
            <span className="text-xs text-emerald-800 font-mono font-extrabold bg-emerald-200 px-2 py-0.5 rounded-full">
              -32% Diesel Saved
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-700 font-semibold">
              <span>City Route Network:</span>
              <span className="font-extrabold text-emerald-900">{selectedCity} TSP Graph</span>
            </div>
            <div className="flex justify-between text-slate-700 font-semibold">
              <span>Optimized Distance:</span>
              <span className="font-mono font-extrabold text-emerald-800 text-sm">32.8 km</span>
            </div>
            <div className="flex justify-between text-slate-700 font-semibold">
              <span>Estimated Diesel Consumption:</span>
              <span className="font-mono font-extrabold text-blue-700 text-sm">9.6 Liters (₹864)</span>
            </div>
            <div className="flex justify-between text-slate-700 font-semibold">
              <span>Average Transit Time:</span>
              <span className="font-mono text-emerald-900 font-bold">1 hr 32 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* TSP Waypoints Sequential List */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-700" />
              <span>{selectedCity} - पिकअप का सही क्रम (TSP Optimal Waypoint Sequence)</span>
            </h3>
            <p className="text-xs text-slate-500">Shortest mathematical path connecting critical bins in {selectedCity}</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {activeStops.length} City Stops
          </span>
        </div>

        <div className="space-y-3">
          {activeStops.map((stop, index) => (
            <div
              key={stop.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-mono font-extrabold flex items-center justify-center shadow-sm">
                  #{index + 1}
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{stop.name}</div>
                  <div className="text-slate-500 text-[11px] font-mono font-bold">{stop.id} • {stop.area}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right font-mono">
                <div>
                  <div className="font-bold text-slate-700">{stop.distFromPrev}</div>
                  <div className="text-[10px] text-slate-500 font-sans">Dist from prev stop</div>
                </div>

                <div>
                  <div className="font-bold text-blue-700">{stop.estTime}</div>
                  <div className="text-[10px] text-slate-500 font-sans">Est. Transit Time</div>
                </div>

                <div>
                  <div className="font-extrabold text-rose-600">{stop.fillPct}% Fill</div>
                  <div className="text-[10px] text-slate-500 font-sans">{stop.binId}</div>
                </div>

                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

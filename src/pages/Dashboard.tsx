import React from 'react';
import { 
  Trash2, 
  Truck, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Fuel, 
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Award
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { SmartBin, FleetTruck, SystemNotification } from '../types';
import { Language, translations } from '../utils/i18n';

interface DashboardProps {
  bins: SmartBin[];
  trucks: FleetTruck[];
  notifications: SystemNotification[];
  lang: Language;
  onDispatchTruck: (binId: string) => void;
  onSelectTab: (tab: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  bins,
  trucks,
  notifications,
  lang,
  onDispatchTruck,
  onSelectTab,
}) => {
  const t = translations[lang];

  const totalBins = bins.length;
  const criticalBins = bins.filter(b => b.fillLevel >= 85);
  const warningBins = bins.filter(b => b.fillLevel >= 70 && b.fillLevel < 85);
  const optimalBins = bins.filter(b => b.fillLevel < 70);
  const activeTrucks = trucks.filter(t => t.status === 'Collecting' || t.status === 'In-Transit');

  // Chart data
  const fillDistribution = [
    { name: 'सामान्य / Optimal (<70%)', count: optimalBins.length, color: '#16a34a' },
    { name: 'चेतावनी / Warning (70-85%)', count: warningBins.length, color: '#d97706' },
    { name: 'गंभीर / Critical (>85%)', count: criticalBins.length, color: '#dc2626' },
  ];

  const collectionTrend = [
    { day: 'Mon (सोम)', wetTons: 14.2, dryTons: 18.5 },
    { day: 'Tue (मंगल)', wetTons: 16.8, dryTons: 20.1 },
    { day: 'Wed (बुध)', wetTons: 15.0, dryTons: 19.3 },
    { day: 'Thu (गुरु)', wetTons: 18.4, dryTons: 22.8 },
    { day: 'Fri (शुक्र)', wetTons: 21.0, dryTons: 25.4 },
    { day: 'Sat (शनि)', wetTons: 24.5, dryTons: 28.0 },
    { day: 'Today (आज)', wetTons: 22.8, dryTons: 26.2 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Government Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/10 text-white border border-white/20">
            <Award className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold flex items-center gap-2">
                <span>स्वच्छ नगर निगम कमांड सेंटर • Municipal Waste Portal</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-amber-400 text-slate-900 font-extrabold">
                Rank #1 Swachh Survekshan
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              AI Route Optimization (TSP) & Live IoT Sensor Telemetry across Delhi NCR Wards.
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('map')}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs transition flex items-center gap-2 shadow-sm active:scale-95"
        >
          <MapPin className="w-4 h-4" />
          <span>लाइव GIS नक्शा खोलें (Open Map)</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bins */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">{t.totalBins}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Trash2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{totalBins}</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              100% Online
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">8 Municipal Wards Monitored</p>
        </div>

        {/* Critical Bins */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-rose-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">{t.criticalBins}</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-600">{criticalBins.length} Bins</span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Urgent Pickup
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Fill level &gt; 85% (Sensor alert)</p>
        </div>

        {/* Active Fleet */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">{t.activeFleet}</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{activeTrucks.length} / {trucks.length}</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Collecting
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">22.4 Tons Total Capacity</p>
        </div>

        {/* Fuel Saved */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">{t.fuelSaved}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Fuel className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">142.5 L</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              +32% Saved
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">₹12,825 Diesel Budget Saved Today</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collection Volume Bar Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Daily Waste Collection Trends (गीला एवं सूखा कचरा)</h3>
              <p className="text-xs text-slate-500">Metric Tons per day (Organic Wet vs Recyclable Dry)</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span> Organic Wet (गीला)
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span> Dry Recyclable (सूखा)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="wetTons" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dryTons" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bin Capacity Pie Distribution */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Smart Bins Status Split</h3>
            <p className="text-xs text-slate-500">Capacity fill percentage breakdown</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {fillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-semibold">
            {fillDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-slate-900 font-mono">{item.count} Bins</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Bins Action Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Priority Bins Requiring Garbage Truck Pickup (तत्काल पिकअप)</span>
            </h3>
            <p className="text-xs text-slate-500">Ultrasonic distance sensor reading below 25 cm</p>
          </div>
          <button
            onClick={() => onSelectTab('bins')}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>सभी बिन देखें (View All)</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Bin ID & Location</th>
                <th className="p-3">Ward</th>
                <th className="p-3">Fill Level</th>
                <th className="p-3">Wet / Dry Split</th>
                <th className="p-3">Distance</th>
                <th className="p-3 text-right">Quick Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bins.filter(b => b.fillLevel >= 70).map((bin) => (
                <tr key={bin.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900">
                    <div className="font-mono text-emerald-700 text-xs font-extrabold">{bin.id}</div>
                    <div className="text-slate-800 font-sans">{bin.name}</div>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">{bin.ward}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            bin.fillLevel >= 85 ? 'bg-rose-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${bin.fillLevel}%` }}
                        ></div>
                      </div>
                      <span className="font-extrabold font-mono text-slate-900">{bin.fillLevel}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-mono">
                    <span className="text-emerald-700 font-bold">{bin.wetPercentage}% Wet</span> /{' '}
                    <span className="text-blue-700 font-bold">{bin.dryPercentage}% Dry</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-700">{bin.distanceCm} cm</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onDispatchTruck(bin.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm active:scale-95"
                    >
                      {bin.assignedTruckId ? 'Truck Assigned' : 'गाड़ी भेजें (Dispatch)'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

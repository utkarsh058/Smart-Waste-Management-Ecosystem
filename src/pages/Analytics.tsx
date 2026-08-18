import React from 'react';
import { BarChart3, Download, TrendingUp, PieChart, Layers, Calendar, Award } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { Language, translations } from '../utils/i18n';

interface AnalyticsProps {
  lang: Language;
}

export const Analytics: React.FC<AnalyticsProps> = ({ lang }) => {
  const t = translations[lang];

  const monthlyTonnageData = [
    { month: 'Jan (जनवरी)', tonnage: 420 },
    { month: 'Feb (फरवरी)', tonnage: 450 },
    { month: 'Mar (मार्च)', tonnage: 490 },
    { month: 'Apr (अप्रैल)', tonnage: 530 },
    { month: 'May (मई)', tonnage: 580 },
    { month: 'Jun (जून)', tonnage: 620 },
    { month: 'Jul (जुलाई)', tonnage: 670 },
    { month: 'Aug (अगस्त)', tonnage: 710 },
  ];

  const categoryBreakdown = [
    { name: 'Organic Wet Waste (गीला कचरा)', value: 52, color: '#16a34a' },
    { name: 'Dry Recyclable (सूखा कचरा)', value: 33, color: '#2563eb' },
    { name: 'E-Waste (इलेक्ट्रॉनिक)', value: 10, color: '#9333ea' },
    { name: 'Hazardous (घातक/चिकित्सा)', value: 5, color: '#dc2626' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            <span>{t.analytics} (नगर निगम कचरा विश्लेषण एवं रिपोर्ट)</span>
          </h2>
          <p className="text-xs text-slate-500">Municipal Tonnage Generation & Carbon Emission Metrics</p>
        </div>

        <button
          onClick={() => alert('Exporting Municipal Waste Analytics Report (PDF / CSV)...')}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1.5 active:scale-95 shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>रिपोर्ट डाउनलोड करें (Export PDF)</span>
        </button>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">मासिक कुल कचरा संचय (Metric Tons - 2026)</h3>
              <p className="text-xs text-slate-500">Total collected solid waste tonnage per month</p>
            </div>
            <span className="text-xs text-emerald-800 font-mono font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              +14% Recycling Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTonnageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTonnageLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="tonnage" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorTonnageLight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">कचरा श्रेणी विभाजन (Category Breakdown)</h3>
            <p className="text-xs text-slate-500">Material type breakdown percentage</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-semibold">
            {categoryBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-slate-900 font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Bell, Shield, Sliders, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface SettingsProps {
  lang: Language;
}

export const Settings: React.FC<SettingsProps> = ({ lang }) => {
  const t = translations[lang];

  const [criticalThreshold, setCriticalThreshold] = useState(85);
  const [warningThreshold, setWarningThreshold] = useState(70);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-emerald-700" />
            <span>{t.settings} (सिस्टम सेटिंग्स)</span>
          </h2>
          <p className="text-xs text-slate-500">System Telemetry Alert Thresholds & Automated Dispatch Triggers</p>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 max-w-2xl">
        {saved && (
          <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>System parameters saved successfully!</span>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span>Telemetry Alert Thresholds (कचरा चेतावनी सीमा)</span>
          </h3>

          <div className="space-y-2">
            <label className="text-xs text-slate-800 font-bold flex justify-between">
              <span>Critical Fill Level Threshold (%)</span>
              <span className="font-mono text-rose-600 font-extrabold">{criticalThreshold}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="95"
              value={criticalThreshold}
              onChange={(e) => setCriticalThreshold(Number(e.target.value))}
              className="w-full accent-emerald-700"
            />
            <p className="text-[11px] text-slate-500 font-medium">Triggers emergency truck dispatch notification when bin capacity reaches this level.</p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs text-slate-800 font-bold flex justify-between">
              <span>Warning Fill Level Threshold (%)</span>
              <span className="font-mono text-amber-700 font-extrabold">{warningThreshold}%</span>
            </label>
            <input
              type="range"
              min="40"
              max="80"
              value={warningThreshold}
              onChange={(e) => setWarningThreshold(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold text-slate-900">Automatic TSP Fleet Dispatch</div>
              <div className="text-[11px] text-slate-500 font-medium">Automatically assign nearest idle garbage truck when critical threshold is breached.</div>
            </div>
            <input
              type="checkbox"
              checked={autoDispatch}
              onChange={(e) => setAutoDispatch(e.target.checked)}
              className="w-5 h-5 accent-emerald-700 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm active:scale-95 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>सेटिंग्स सुरक्षित करें (Save Configurations)</span>
          </button>
        </div>
      </form>
    </div>
  );
};

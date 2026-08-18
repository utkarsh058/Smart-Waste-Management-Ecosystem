import React, { useState } from 'react';
import { Cloud, Terminal, Play, CheckCircle2, Copy, Send, RefreshCw } from 'lucide-react';
import { CloudLog } from '../types';
import { Language, translations } from '../utils/i18n';

interface CloudApiConsoleProps {
  logs: CloudLog[];
  lang: Language;
}

export const CloudApiConsole: React.FC<CloudApiConsoleProps> = ({ logs, lang }) => {
  const t = translations[lang];
  const [activeProvider, setActiveProvider] = useState<'ALL' | 'AWS' | 'AZURE' | 'GCP'>('ALL');

  const filteredLogs = logs.filter(log => {
    if (activeProvider === 'AWS') return log.provider === 'AWS IoT Core';
    if (activeProvider === 'AZURE') return log.provider === 'Azure IoT Hub';
    if (activeProvider === 'GCP') return log.provider === 'GCP PubSub';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-700" />
            <span>{t.cloudApiConsole} (क्लाउड डेटा सेंटर)</span>
          </h2>
          <p className="text-xs text-slate-500">AWS IoT Core, Azure IoT Hub & GCP Pub/Sub Ingestion Stream</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveProvider('ALL')}
            className={`px-3 py-1 rounded-xl transition ${activeProvider === 'ALL' ? 'bg-emerald-700 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
          >
            All Clouds
          </button>
          <button
            onClick={() => setActiveProvider('AWS')}
            className={`px-3 py-1 rounded-xl transition ${activeProvider === 'AWS' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-700'}`}
          >
            AWS IoT Core
          </button>
          <button
            onClick={() => setActiveProvider('AZURE')}
            className={`px-3 py-1 rounded-xl transition ${activeProvider === 'AZURE' ? 'bg-blue-700 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
          >
            Azure Hub
          </button>
          <button
            onClick={() => setActiveProvider('GCP')}
            className={`px-3 py-1 rounded-xl transition ${activeProvider === 'GCP' ? 'bg-emerald-700 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
          >
            GCP PubSub
          </button>
        </div>
      </div>

      {/* Live Stream Terminal */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold">
            <Terminal className="w-4 h-4" />
            <span>MQTT / HTTP Telemetry Ingestion Console</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-bold">Port: 8883 (TLS 1.3 Encryption)</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    log.provider === 'AWS IoT Core'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : log.provider === 'Azure IoT Hub'
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {log.provider}
                  </span>
                  <span className="text-slate-900 font-bold">{log.topic}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-[10px]">
                  <span>{log.latencyMs} ms latency</span>
                  <span className="text-emerald-800 font-extrabold">{log.timestamp}</span>
                </div>
              </div>

              {/* JSON payload formatting */}
              <pre className="text-slate-900 font-bold text-[11px] bg-slate-100 p-2.5 rounded-lg border border-slate-300 overflow-x-auto">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

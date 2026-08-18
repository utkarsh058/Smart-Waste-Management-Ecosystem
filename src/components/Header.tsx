import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Globe, 
  RotateCw, 
  ShieldCheck, 
  CloudSun, 
  Clock, 
  Search,
  PhoneCall,
  Sparkles,
  Trash2
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';
import { SystemNotification } from '../types';

interface HeaderProps {
  lang: Language;
  onLanguageToggle: () => void;
  notifications: SystemNotification[];
  onOpenNotifications: () => void;
  onRefreshData: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageToggle,
  notifications,
  onOpenNotifications,
  onRefreshData,
  searchQuery,
  onSearchChange,
}) => {
  const t = translations[lang];
  const [time, setTime] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString(lang === 'hi' ? 'hi-IN' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRefreshClick = () => {
    setIsSpinning(true);
    onRefreshData();
    setTimeout(() => setIsSpinning(false), 800);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      {/* Indian Tricolor Bar Accent */}
      <div className="tricolor-strip"></div>

      <div className="px-4 lg:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Government Portal Header Branding */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-white to-emerald-600 p-[2px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center border border-slate-200">
              <span className="text-xl">🇮🇳</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">
                स्वच्छ भारत मिशन <span className="text-emerald-700 font-bold">• SWACHH BHARAT</span>
              </h1>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                MoHUA Official
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Municipal Smart Waste & Fleet Command Portal • नगर निगम डिजिटल पोर्टल
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="खोजें / Search Bins, Vehicles, Wards or Complaint ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition"
            />
          </div>
        </div>

        {/* Helpline & User Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Swachhata Toll-Free Helpline 1969 */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <PhoneCall className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>helpline: <strong className="font-mono text-amber-700">1969</strong></span>
          </div>

          {/* Live IST Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>IST: {time || '11:30:00 PM'}</span>
          </div>

          {/* Data Refresh */}
          <button
            onClick={handleRefreshClick}
            title={t.refreshData}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition active:scale-95"
          >
            <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          {/* 1-Click EN / HI Language Switcher */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm active:scale-95"
            title="भाषा बदलें / Toggle Language"
          >
            <Globe className="w-4 h-4 text-emerald-200" />
            <span>{lang === 'en' ? '🇮🇳 हिंदी (Hindi)' : '🇬🇧 English'}</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition active:scale-95"
            title={t.activeAlerts}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

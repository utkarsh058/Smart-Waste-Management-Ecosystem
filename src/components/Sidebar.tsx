import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Trash2, 
  Boxes, 
  Truck, 
  Route, 
  ShieldCheck, 
  Cloud, 
  MessageSquare, 
  BarChart3, 
  Cpu, 
  Users, 
  Settings,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

export type TabId = 
  | 'dashboard' 
  | 'map' 
  | 'bins' 
  | 'segregation' 
  | 'fleet' 
  | 'route' 
  | 'blockchain' 
  | 'cloud' 
  | 'citizen' 
  | 'analytics' 
  | 'diagnostics' 
  | 'staff' 
  | 'settings';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  lang: Language;
  criticalBinCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  lang,
  criticalBinCount
}) => {
  const t = translations[lang];

  const menuItems: { id: TabId; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: t.commandCenter, icon: LayoutDashboard },
    { id: 'map', label: t.liveMap, icon: Map },
    { id: 'bins', label: t.smartBins, icon: Trash2, badge: criticalBinCount },
    { id: 'segregation', label: t.wasteSegregation, icon: Boxes },
    { id: 'fleet', label: t.fleetManagement, icon: Truck },
    { id: 'route', label: t.routeOptimization, icon: Route },
    { id: 'blockchain', label: t.blockchainLedger, icon: ShieldCheck },
    { id: 'cloud', label: t.cloudApiConsole, icon: Cloud },
    { id: 'citizen', label: t.citizenPortal, icon: MessageSquare },
    { id: 'analytics', label: t.analytics, icon: BarChart3 },
    { id: 'diagnostics', label: t.diagnostics, icon: Cpu },
    { id: 'staff', label: t.staffRoster, icon: Users },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full overflow-y-auto shadow-sm select-none">
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
          मुख्य मेनू • Main Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition ${isActive ? 'text-white scale-110' : 'text-slate-500 group-hover:text-emerald-700'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 ? (
                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                  isActive ? 'bg-white text-emerald-800' : 'bg-rose-100 text-rose-700 border border-rose-200'
                }`}>
                  {item.badge}
                </span>
              ) : isActive ? (
                <ChevronRight className="w-4 h-4 text-emerald-200" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Municipal Citizen Help Banner */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-900">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>नगर निगम हेल्पलाइन</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-snug">
            Swachhata App Helpline: Toll-free <strong>1969</strong> available 24x7 for urgent waste removal.
          </p>
        </div>
      </div>
    </aside>
  );
};

import React from 'react';
import { Users, Phone, Star, ShieldCheck, UserCheck } from 'lucide-react';
import { StaffMember } from '../types';
import { Language, translations } from '../utils/i18n';

interface StaffRosterProps {
  staff: StaffMember[];
  lang: Language;
}

export const StaffRoster: React.FC<StaffRosterProps> = ({ staff, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>{t.staffRoster} (सफाई कर्मचारी एवं चालक सूची)</span>
          </h2>
          <p className="text-xs text-slate-500">Sanitation Drivers, Officers & IoT Maintenance Roster</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs font-mono">
          कुल कर्मचारी (Total Staff): {staff.length} Active
        </span>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staff.map((emp) => (
          <div
            key={emp.id}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-emerald-700 text-[11px] font-extrabold">{emp.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-800 border border-slate-200 font-bold">
                  {emp.shift} Shift
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm mt-2">{emp.name}</h3>
              <p className="text-xs text-slate-600 font-semibold">{emp.role}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">{emp.wardAssigned}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-700 font-mono font-bold">{emp.phone}</span>
              <span className="flex items-center gap-1 text-amber-700 font-extrabold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {emp.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

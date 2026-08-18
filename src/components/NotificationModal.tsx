import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, Info, Trash2 } from 'lucide-react';
import { SystemNotification } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">System Alerts & Notifications</h3>
              <p className="text-xs text-slate-500">Real-time IoT events & truck dispatches</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs font-medium">
              No active notifications.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border text-xs flex gap-3 transition ${
                  item.type === 'critical'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : item.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : item.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {item.type === 'critical' && <AlertTriangle className="w-4 h-4 text-rose-600" />}
                  {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between font-extrabold">
                    <span>{item.title}</span>
                    <span className="text-[10px] opacity-75 font-mono">{item.timestamp}</span>
                  </div>
                  <p className="opacity-90 leading-relaxed text-[11px] font-medium">{item.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-bold">
          <button
            onClick={onMarkAllRead}
            className="text-emerald-700 hover:text-emerald-800 transition"
          >
            Mark all as read
          </button>
          <button
            onClick={onClearAll}
            className="text-slate-500 hover:text-slate-700 transition"
          >
            Clear list
          </button>
        </div>
      </div>
    </div>
  );
};

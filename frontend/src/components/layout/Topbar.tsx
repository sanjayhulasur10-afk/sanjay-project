import React from 'react';
import { Bell } from 'lucide-react';
import { useSensorContext } from '../../context/SensorContext';

export const Topbar = () => {
  const { isConnected, alerts } = useSensorContext();
  const unreadAlerts = alerts.filter(a => !a.resolved).length;
  
  const now = new Date();
  const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeString = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="h-16 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-4 md:px-8">
      <div className="hidden md:block text-slate-400 text-sm">
        {dateString} <span className="mx-2">•</span> {timeString}
      </div>
      
      <div className="flex-1 md:hidden" /> {/* Spacer for mobile */}

      <div className="flex items-center gap-6">
        {/* WebSocket Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-xs font-medium text-slate-300">
            {isConnected ? 'Live Socket' : 'Disconnected'}
          </span>
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full">
              {unreadAlerts > 9 ? '9+' : unreadAlerts}
            </span>
          )}
        </div>
        
        {/* User Avatar mock */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-slate-800" />
      </div>
    </header>
  );
};

import React from 'react';
import { Server, Battery, Wifi, WifiOff, Clock } from 'lucide-react';

interface DeviceStatusCardProps {
  device: {
    name: string;
    isOnline: boolean;
    batteryLevel: number;
    lastSeen: string;
    provider: string;
  };
}

export const DeviceStatusCard: React.FC<DeviceStatusCardProps> = ({ device }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${device.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-200">{device.name}</h3>
            <span className="text-xs text-slate-500">{device.provider}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${device.isOnline ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {device.isOnline ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Battery className={`w-4 h-4 ${device.batteryLevel > 20 ? 'text-green-400' : 'text-red-400'}`} />
          <span className="text-sm text-slate-400">{device.batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-2">
          {device.isOnline ? <Wifi className="w-4 h-4 text-blue-400" /> : <WifiOff className="w-4 h-4 text-slate-500" />}
          <span className="text-sm text-slate-400">Signal</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span className="text-xs text-slate-500">Last sync: {new Date(device.lastSeen).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

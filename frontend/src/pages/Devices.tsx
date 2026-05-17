import React from 'react';
import { useSensorContext } from '../context/SensorContext';
import { DeviceStatusCard } from '../components/dashboard/DeviceStatusCard';
import { Plus } from 'lucide-react';

const Devices = () => {
  const { devices } = useSensorContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">IoT Infrastructure</h1>
          <p className="text-slate-400 text-sm mt-1">Manage connected sensor nodes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="w-4 h-4" />
          <span>Provision Device</span>
        </button>
      </div>

      {devices.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center text-slate-500">
          <p>No devices connected yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, idx) => (
            <DeviceStatusCard key={idx} device={device} />
          ))}
        </div>
      )}

      {/* Cloud Info Cards (Mock UI) */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <h2 className="text-lg font-semibold text-slate-200 mb-6">Cloud Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="w-10 h-10 bg-[#FF9900]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-[#FF9900] font-bold text-xl">☁</span>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2">AWS IoT Core</h3>
            <p className="text-sm text-slate-400">Handling secure bi-directional communication between devices and the cloud.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="w-10 h-10 bg-[#FF9900]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-[#FF9900] font-bold text-xl">λ</span>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2">AWS Lambda</h3>
            <p className="text-sm text-slate-400">Serverless compute running real-time analytics and threshold anomaly detection.</p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="w-10 h-10 bg-[#FF9900]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-[#FF9900] font-bold text-xl">✉</span>
            </div>
            <h3 className="font-semibold text-slate-200 mb-2">AWS SNS</h3>
            <p className="text-sm text-slate-400">Fan-out messaging for SMS and email alerts when critical thresholds are breached.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;

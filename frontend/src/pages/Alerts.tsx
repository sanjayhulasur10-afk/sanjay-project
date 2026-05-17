import React from 'react';
import { useSensorContext } from '../context/SensorContext';
import { ThresholdBadge } from '../components/shared/ThresholdBadge';
import { resolveAlert } from '../services/api';
import { Check } from 'lucide-react';

const Alerts = () => {
  const { alerts, refreshData } = useSensorContext();

  const handleResolve = async (id: string) => {
    try {
      await resolveAlert(id);
      refreshData();
    } catch (error) {
      console.error('Failed to resolve alert', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">System Alerts</h1>
        <p className="text-slate-400 text-sm mt-1">Review and acknowledge threshold violations</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Parameter</th>
                <th className="px-6 py-4 font-medium">Value</th>
                <th className="px-6 py-4 font-medium">Threshold</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-slate-800/50">
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No alerts in the system. Everything is operating normally.
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr key={alert._id} className={`hover:bg-slate-800/30 transition-colors ${alert.resolved ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {new Date(alert.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ThresholdBadge status={alert.severity as 'Safe' | 'Warning' | 'Danger'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                      {alert.parameter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-400 font-mono">
                      {alert.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono">
                      {alert.threshold}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {alert.resolved ? (
                        <span className="text-xs text-slate-500 flex items-center justify-end gap-1">
                          <Check className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleResolve(alert._id)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alerts;

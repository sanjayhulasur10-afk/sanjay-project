import React, { useState, useEffect } from 'react';
import { useSensorContext } from '../context/SensorContext';
import { saveThresholds } from '../services/api';
import { Save } from 'lucide-react';

const Settings = () => {
  const { thresholds, refreshData } = useSensorContext();
  const [localSettings, setLocalSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (thresholds && Object.keys(thresholds).length > 0) {
      setLocalSettings(thresholds);
    }
  }, [thresholds]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveThresholds(localSettings);
      await refreshData();
      // Show some success toast here in a real app
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (param: string, bound: 'min' | 'max', value: string) => {
    const num = parseFloat(value);
    setLocalSettings((prev: any) => ({
      ...prev,
      [param]: {
        ...prev[param],
        [bound]: isNaN(num) ? prev[param][bound] : num
      }
    }));
  };

  if (!localSettings) return <div className="text-slate-400">Loading settings...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">System Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure monitoring thresholds and parameters</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-200 mb-6">Alarm Thresholds</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-slate-300 font-medium">pH Level</div>
            <div className="col-span-2 flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Min (Acidic limit)</label>
                <input 
                  type="number" step="0.1"
                  value={localSettings.pH?.min || ''}
                  onChange={(e) => updateSetting('pH', 'min', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Max (Alkaline limit)</label>
                <input 
                  type="number" step="0.1"
                  value={localSettings.pH?.max || ''}
                  onChange={(e) => updateSetting('pH', 'max', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-t border-slate-800/50 pt-6">
            <div className="text-slate-300 font-medium">Turbidity (NTU)</div>
            <div className="col-span-2 flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Max Threshold</label>
                <input 
                  type="number" step="0.1"
                  value={localSettings.turbidity?.max || ''}
                  onChange={(e) => updateSetting('turbidity', 'max', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-t border-slate-800/50 pt-6">
            <div className="text-slate-300 font-medium">TDS (mg/L)</div>
            <div className="col-span-2 flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Max Threshold</label>
                <input 
                  type="number"
                  value={localSettings.tds?.max || ''}
                  onChange={(e) => updateSetting('tds', 'max', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

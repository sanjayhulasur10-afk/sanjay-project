import React, { useState } from 'react';
import { TimeRangePicker } from '../components/shared/TimeRangePicker';
import { CleanWireframeAnalytics } from '../components/ui/line-graph-statistics';
import { Download, Filter } from 'lucide-react';
import { useSensorContext } from '../context/SensorContext';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('24H');
  const { historicalData } = useSensorContext();

  const handleExportCSV = () => {
    if (!historicalData || historicalData.length === 0) return;
    
    const headers = Object.keys(historicalData[0]).join(',');
    const rows = historicalData.map(row => 
      Object.values(row).map(val => `"${val}"`).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `water_quality_export_${timeRange}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">Deep dive into historical water quality data</p>
        </div>
        
        <div className="flex items-center gap-3">
          <TimeRangePicker value={timeRange} onChange={setTimeRange} />
          
          <button className="p-2 bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-800">
        {/* Integrating the requested CleanWireframeAnalytics component */}
        <CleanWireframeAnalytics />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-slate-100 font-semibold mb-4">Historical Data Table ({timeRange})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Timestamp</th>
                <th className="px-4 py-3">Device ID</th>
                <th className="px-4 py-3">pH</th>
                <th className="px-4 py-3">Turbidity (NTU)</th>
                <th className="px-4 py-3">TDS (mg/L)</th>
                <th className="px-4 py-3 rounded-tr-lg">Temp (°C)</th>
              </tr>
            </thead>
            <tbody className="text-slate-400 divide-y divide-slate-800/50">
              {historicalData.slice(0, 10).map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">{new Date(row.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">{row.deviceId}</td>
                  <td className="px-4 py-3">{row.pH}</td>
                  <td className="px-4 py-3">{row.turbidity}</td>
                  <td className="px-4 py-3">{row.tds}</td>
                  <td className="px-4 py-3">{row.temperature}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {historicalData.length === 0 && (
            <div className="text-center py-8 text-slate-500">No data available for selected range</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

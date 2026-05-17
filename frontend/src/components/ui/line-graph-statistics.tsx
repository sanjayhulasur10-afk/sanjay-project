import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CleanWireframeAnalytics = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Generate dummy historical data for the showcase
    const dummy = Array.from({ length: 20 }).map((_, i) => ({
      time: `${i}:00`,
      feedA_pH: 7.0 + Math.random() * 0.5 - 0.25,
      feedB_pH: 7.2 + Math.random() * 0.4 - 0.2,
      feedA_Turbidity: Math.random() * 2,
      feedB_Turbidity: Math.random() * 1.5,
    }));
    setData(dummy);
  }, []);

  return (
    <section className="py-24 bg-slate-950 text-slate-100 border-y border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">AI Water Diagnostics</h2>
            <p className="text-slate-400 text-lg">
              Compare realtime feeds across different nodes. Monitor pH, Turbidity, TDS, and Temperature simultaneously with our responsive graph scaling and smooth chart animations.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Sensor Feed A (pH)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-sm">Sensor Feed B (pH)</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full h-[400px] bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b'}} />
                  <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} stroke="#64748b" tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Line type="monotone" dataKey="feedA_pH" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="feedB_pH" stroke="#22d3ee" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 animate-pulse">
                Loading analytics...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

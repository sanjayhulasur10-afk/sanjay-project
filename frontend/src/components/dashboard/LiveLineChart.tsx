import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LiveLineChartProps {
  data: any[];
  dataKey: string;
  color: string;
  title: string;
}

export const LiveLineChart: React.FC<LiveLineChartProps> = ({ data, dataKey, color, title }) => {
  const formattedData = data.map(d => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg h-[300px]">
      <h3 className="text-slate-400 font-medium mb-4">{title} Real-time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b', fontSize: 10}} minTickGap={30} />
          <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
            itemStyle={{ color: color }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3} 
            dot={false} 
            isAnimationActive={false} // Disabled for smooth real-time updates
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

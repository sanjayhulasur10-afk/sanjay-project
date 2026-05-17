import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
  inverse?: boolean; // if true, higher is worse (like turbidity)
}

export const WaterQualityGauge: React.FC<GaugeProps> = ({ value, min, max, title, unit, inverse = false }) => {
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  
  let color = '#22c55e'; // green
  if (inverse) {
    if (percentage > 0.6) color = '#eab308'; // yellow
    if (percentage > 0.85) color = '#ef4444'; // red
  } else {
    // For things like pH where both extremes are bad
    if (percentage < 0.2 || percentage > 0.8) color = '#ef4444'; // red
    else if (percentage < 0.4 || percentage > 0.6) color = '#eab308'; // yellow
  }

  const data = [
    { name: 'value', value: percentage * 100 },
    { name: 'remainder', value: 100 - (percentage * 100) },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-lg relative">
      <h3 className="text-slate-400 font-medium mb-2">{title}</h3>
      <div className="w-full h-40 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#1e293b" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-3xl font-bold text-slate-100">{value}</span>
          <span className="text-xs text-slate-500">{unit}</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export const ParameterHeatmap = () => {
  // Mock data for a 24-hour heatmap
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg overflow-x-auto">
      <h3 className="text-slate-400 font-medium mb-4">Water Quality Index (WQI) 7-Day Heatmap</h3>
      <div className="min-w-[700px]">
        <div className="flex mb-2">
          <div className="w-12"></div>
          {hours.map((h, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-slate-500">{i % 2 === 0 ? h : ''}</div>
          ))}
        </div>
        <div className="space-y-1">
          {days.map((day, i) => (
            <div key={day} className="flex items-center">
              <div className="w-12 text-xs text-slate-400 font-medium">{day}</div>
              {hours.map((_, j) => {
                // Generate a random intensity value
                const intensity = Math.random();
                let bgColor = 'bg-slate-800';
                if (intensity > 0.8) bgColor = 'bg-red-500/80';
                else if (intensity > 0.6) bgColor = 'bg-yellow-500/80';
                else if (intensity > 0.2) bgColor = 'bg-green-500/80';
                else bgColor = 'bg-blue-500/80';
                
                return (
                  <div 
                    key={j} 
                    className={`flex-1 h-6 mx-0.5 rounded-sm ${bgColor} hover:opacity-75 cursor-pointer transition-opacity`}
                    title={`${day} ${j}:00 - Intensity: ${intensity.toFixed(2)}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

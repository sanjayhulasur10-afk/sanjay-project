import React from 'react';

interface TimeRangePickerProps {
  value: string;
  onChange: (val: string) => void;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ value, onChange }) => {
  const ranges = ['1H', '6H', '24H', '7D', '30D'];

  return (
    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
      {ranges.map(range => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === range 
              ? 'bg-blue-600 text-white shadow' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

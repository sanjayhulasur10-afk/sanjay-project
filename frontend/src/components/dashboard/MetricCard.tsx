import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  status: 'Normal' | 'Warning' | 'Danger';
  trend: 'up' | 'down' | 'stable';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, status, trend }) => {
  const statusColors = {
    Normal: 'text-green-400',
    Warning: 'text-yellow-400',
    Danger: 'text-red-400'
  };

  const statusBgColors = {
    Normal: 'bg-green-400/10 border-green-400/20',
    Warning: 'bg-yellow-400/10 border-yellow-400/20',
    Danger: 'bg-red-400/10 border-red-400/20'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-5 rounded-2xl border bg-slate-900 shadow-lg relative overflow-hidden ${statusBgColors[status]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-400 font-medium">{label}</h3>
        {trend === 'up' && <ArrowUpRight className="w-5 h-5 text-slate-300" />}
        {trend === 'down' && <ArrowDownRight className="w-5 h-5 text-slate-300" />}
        {trend === 'stable' && <Minus className="w-5 h-5 text-slate-300" />}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-bold text-slate-100">{value}</span>
        <span className="text-sm font-medium text-slate-500">{unit}</span>
      </div>
      
      <div className="mt-4">
        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${statusColors[status]} bg-slate-950/50`}>
          {status}
        </span>
      </div>

      {/* Decorative gradient glow based on status */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 blur-3xl opacity-20 rounded-full bg-${statusColors[status].split('-')[1]}-500`} />
    </motion.div>
  );
};

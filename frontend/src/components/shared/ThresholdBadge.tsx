import React from 'react';

interface ThresholdBadgeProps {
  status: 'Safe' | 'Warning' | 'Danger';
}

export const ThresholdBadge: React.FC<ThresholdBadgeProps> = ({ status }) => {
  const styles = {
    Safe: 'bg-green-500/10 text-green-400 border-green-500/20',
    Warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

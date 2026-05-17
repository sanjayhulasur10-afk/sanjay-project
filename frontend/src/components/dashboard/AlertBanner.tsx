import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertBannerProps {
  alerts: any[];
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alerts }) => {
  const [dismissed, setDismissed] = useState<string[]>([]);
  
  const activeAlerts = alerts
    .filter(a => !a.resolved && !dismissed.includes(a._id))
    .slice(0, 1); // Show only the most recent one in banner

  return (
    <AnimatePresence>
      {activeAlerts.map(alert => (
        <motion.div
          key={alert._id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${
            alert.severity === 'Danger' 
              ? 'bg-red-500/10 border-red-500/50 text-red-200' 
              : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-6 h-6 ${alert.severity === 'Danger' ? 'text-red-400' : 'text-yellow-400'}`} />
            <div>
              <p className="font-semibold">
                Threshold {alert.severity}: {alert.parameter} is {alert.value} 
              </p>
              <p className="text-sm opacity-80">
                Exceeded threshold of {alert.threshold} at {new Date(alert.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setDismissed(prev => [...prev, alert._id])}
            className="p-2 hover:bg-black/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

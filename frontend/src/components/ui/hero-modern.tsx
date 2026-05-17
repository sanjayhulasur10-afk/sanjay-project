import React from 'react';
import { motion } from 'framer-motion';

export const HeroOrbitDeck = () => {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-50">
      {/* Background Orbits */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-slate-700 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full border border-slate-700 border-dashed"
        />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Smart Water Infrastructure
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
            AI-powered Water Intelligence. Real-time Sensor Monitoring. Cloud-based Water Analytics for Environmental Safety.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <a href="/dashboard" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Launch Dashboard
          </a>
          <a href="#features" className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all border border-slate-700">
            View Architecture
          </a>
        </motion.div>
      </div>

      {/* Floating AWS/IoT Badges */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex items-center gap-3"
      >
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-mono text-slate-300">AWS IoT Core Connected</span>
      </motion.div>
    </div>
  );
};

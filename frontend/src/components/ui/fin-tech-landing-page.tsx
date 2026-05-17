import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Activity, CloudRain, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Droplets className="w-6 h-6 text-blue-400" />,
    title: "Water Intelligence Platform",
    description: "Advanced analytics processing thousands of data points per second to ensure optimal water quality."
  },
  {
    icon: <Activity className="w-6 h-6 text-cyan-400" />,
    title: "Infrastructure Safety Analytics",
    description: "Predictive maintenance and real-time anomaly detection for municipal and industrial pipelines."
  },
  {
    icon: <CloudRain className="w-6 h-6 text-purple-400" />,
    title: "Sensor Networks",
    description: "Seamlessly integrate with IoT devices to stream pH, turbidity, and TDS metrics live to the cloud."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "Environmental Monitoring",
    description: "Automated alert systems notify stakeholders immediately when thresholds are breached."
  }
];

export const MoneyflowLandingPage = () => {
  return (
    <section id="features" className="py-24 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Smart Water Quality Monitor</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Our AI-driven platform transforms raw IoT infrastructure data into actionable water quality insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors"
            >
              <div className="bg-slate-900/80 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { useSensorContext } from '../context/SensorContext';
import { MetricCard } from '../components/dashboard/MetricCard';
import { WaterQualityGauge } from '../components/dashboard/WaterQualityGauge';
import { LiveLineChart } from '../components/dashboard/LiveLineChart';
import { ParameterHeatmap } from '../components/dashboard/ParameterHeatmap';
import { AlertBanner } from '../components/dashboard/AlertBanner';

const Dashboard = () => {
  const { historicalData, latestReading, alerts } = useSensorContext();

  const getStatus = (val: number, min: number, max: number, inverse = false) => {
    if (!val) return 'Normal';
    if (inverse) {
      if (val > max) return 'Danger';
      if (val > max * 0.8) return 'Warning';
      return 'Normal';
    } else {
      if (val < min || val > max) return 'Danger';
      if (val < min * 1.2 || val > max * 0.8) return 'Warning';
      return 'Normal';
    }
  };

  const currentPH = latestReading?.pH || 7.0;
  const currentTurbidity = latestReading?.turbidity || 0;
  const currentTDS = latestReading?.tds || 250;
  const currentTemp = latestReading?.temperature || 20;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-100">System Overview</h1>
        <div className="text-sm text-slate-400">Real-time monitoring active</div>
      </div>

      <AlertBanner alerts={alerts} />

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          label="pH Level" 
          value={currentPH} 
          unit="pH" 
          status={getStatus(currentPH, 6.5, 8.5)} 
          trend="stable" 
        />
        <MetricCard 
          label="Turbidity" 
          value={currentTurbidity} 
          unit="NTU" 
          status={getStatus(currentTurbidity, 0, 5, true)} 
          trend="up" 
        />
        <MetricCard 
          label="TDS" 
          value={currentTDS} 
          unit="mg/L" 
          status={getStatus(currentTDS, 0, 500, true)} 
          trend="down" 
        />
        <MetricCard 
          label="Temperature" 
          value={currentTemp} 
          unit="°C" 
          status={getStatus(currentTemp, 10, 35)} 
          trend="stable" 
        />
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WaterQualityGauge value={Number(currentPH)} min={0} max={14} title="pH Level" unit="pH" />
        <WaterQualityGauge value={Number(currentTurbidity)} min={0} max={10} title="Turbidity" unit="NTU" inverse />
        <WaterQualityGauge value={Number(currentTDS)} min={0} max={1000} title="TDS" unit="mg/L" inverse />
        <WaterQualityGauge value={Number(currentTemp)} min={0} max={50} title="Temperature" unit="°C" />
      </div>

      {/* Live Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LiveLineChart data={historicalData} dataKey="pH" color="#3b82f6" title="pH" />
        <LiveLineChart data={historicalData} dataKey="turbidity" color="#f97316" title="Turbidity" />
        <LiveLineChart data={historicalData} dataKey="tds" color="#a855f7" title="TDS" />
        <LiveLineChart data={historicalData} dataKey="temperature" color="#ef4444" title="Temperature" />
      </div>

      {/* Heatmap */}
      <div className="mt-6">
        <ParameterHeatmap />
      </div>
    </div>
  );
};

export default Dashboard;

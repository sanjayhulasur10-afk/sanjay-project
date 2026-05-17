import React from 'react';
import { Droplets, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FooterSection = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-slate-100">AquaIntel</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Premium AI infrastructure monitoring platform for real-time water intelligence and cloud analytics.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-blue-400 transition-colors">Analytics</Link></li>
              <li><Link to="/devices" className="hover:text-blue-400 transition-colors">Devices</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/alerts" className="hover:text-blue-400 transition-colors">Alerts</Link></li>
              <li><Link to="/settings" className="hover:text-blue-400 transition-colors">Settings</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm">© 2026 Smart Water Quality Monitor. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-100 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-slate-100 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-slate-100 transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

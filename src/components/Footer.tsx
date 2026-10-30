import React from 'react';
import { Globe2, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white leading-tight">
                  Transformation Africa
                </span>
                <span className="text-xs text-sky-400 font-medium">
                  Platform-as-a-Community (PaaC)
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Connecting students, universities, businesses, and communities across Africa and Europe through Collaborative Online International Learning (COIL), entrepreneurship, and hands-on project verification.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong>Legal Entity:</strong> Austrian Nonprofit Association (Verein)</div>
              <div><strong>Documentation:</strong> Strategic Briefing v4.0 &amp; Product Discovery (Phase 1)</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Project Repository
                </a>
              </li>
              <li>
                <a href="#opportunities" className="hover:text-white transition-colors">
                  Open Opportunities
                </a>
              </li>
              <li>
                <a href="#digital-loom" className="hover:text-white transition-colors">
                  The Digital Loom
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  5 Connected Portals
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-white transition-colors">
                  Partner Universities
                </a>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Functional Portals
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  Student Associates
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  University &amp; COIL
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  Corporate Challenges
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  Innovation Incubator
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-white transition-colors">
                  Governance Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Core Operating Principle */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Guiding Principle
            </h4>
            <blockquote className="text-xs italic text-slate-300 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 leading-relaxed">
              "Transformation Africa is a Platform-as-a-Community where real people meet on real projects that create real business and real impact."
            </blockquote>
            <div className="flex items-center gap-2 text-xs text-sky-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>AI Ethics: Humans Decide. AI Supports.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Transformation Africa Association. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Vienna, Austria &amp; Partner Hubs in Kampala &amp; Cape Town</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

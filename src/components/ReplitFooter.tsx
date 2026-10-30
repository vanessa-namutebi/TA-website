import React from 'react';
import { NavTab } from './ReplitNavbar';

interface ReplitFooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const ReplitFooter: React.FC<ReplitFooterProps> = ({ onNavigate }) => {
  const handleNav = (tab: NavTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102B4E] text-white pt-16 pb-12 border-t border-[#1C3E69]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Copy */}
          <div className="max-w-md space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                <img
                  src="/assets/aistudio/Transformation_Africa_logo__1_-removebg-preview_eecea55f.png"
                  alt="Transformation Africa Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight leading-none lowercase">
                  transformation
                </span>
                <span className="text-[10px] font-bold text-[#159FE3] uppercase tracking-[0.22em] mt-0.5">
                  Africa · Europe
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              Building lasting bridges between Africa and Europe through project-based collaboration, shared learning, and measurable socio-economic impact.
            </p>
          </div>

          {/* Navigation Links matching Google Site Pillars */}
          <nav className="grid grid-cols-2 gap-x-8 gap-y-4 text-center text-xs font-semibold text-slate-300 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0" aria-label="Footer navigation">
            <button
              onClick={() => handleNav('purpose')}
              className="hover:text-[#159FE3] transition-colors"
            >
              Purpose
            </button>
            <button
              onClick={() => handleNav('people')}
              className="hover:text-[#159FE3] transition-colors"
            >
              People
            </button>
            <button
              onClick={() => handleNav('projects')}
              className="hover:text-[#159FE3] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => handleNav('partnership')}
              className="hover:text-[#159FE3] transition-colors"
            >
              Partnership
            </button>
            <button
              onClick={() => handleNav('portal')}
              className="hover:text-[#159FE3] transition-colors"
            >
              Personal &amp; Intake
            </button>
          </nav>

        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <span>© 2025 Transformation Africa. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <button
              onClick={() => handleNav('portal')}
              className="hover:text-[#159FE3] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

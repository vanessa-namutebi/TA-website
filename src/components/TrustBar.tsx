import React from 'react';
import { UNIVERSITY_PARTNERS } from '../data/mockData';
import { Building2, Landmark, GraduationCap } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section id="partners" className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Validated Academic &amp; Institutional Consortium Across Africa &amp; Europe
          </p>
        </div>

        {/* Universities grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 items-stretch">
          {UNIVERSITY_PARTNERS.map((uni) => (
            <div
              key={uni.name}
              className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200/80 transition-all text-center group"
            >
              <div className="text-2xl mb-1.5">{uni.flag}</div>
              <div className="text-sm font-bold text-slate-800 group-hover:text-sky-700 transition-colors leading-tight">
                {uni.shortName}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {uni.city}, {uni.country}
              </div>
              <div className="mt-2 text-[11px] font-medium text-slate-400">
                {uni.projectsCompleted} Projects Completed
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Foundation note */}
        <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-sky-600" />
            <span>Austrian Nonprofit Association</span>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
            <span>COIL Collaborative Online International Learning</span>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Direct Enterprise &amp; Development Sponsoring</span>
          </span>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Landmark, GraduationCap, Globe2, Sparkles, ShieldCheck } from 'lucide-react';

export const ReplitAbout: React.FC = () => {
  const sequenceSteps = [
    {
      num: '01',
      title: 'Technology',
      desc: 'Useful tools help people find one another and make collaboration easier.',
    },
    {
      num: '02',
      title: 'Relationships',
      desc: 'Trust grows when students, universities, businesses and communities meet.',
    },
    {
      num: '03',
      title: 'Projects',
      desc: 'People turn shared questions into hands-on learning and practical ideas.',
    },
    {
      num: '04',
      title: 'Opportunities → Impact',
      desc: 'Good work opens doors for enterprise, learning and lasting change.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-8">
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
              A connected community
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Real people. Shared projects. More possibility.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Transformation Africa connects people and institutions across Africa and Europe through project-based learning, innovation and entrepreneurship.
            </p>
          </div>

          {/* Right Logo Orbital Graphic */}
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white p-3 shadow-sm border border-[#D0E7F5] flex items-center justify-center relative">
              <div className="absolute inset-1 rounded-full border border-dashed border-[#159FE3]/40 animate-[spin_40s_linear_infinite]" />
              <img
                src="/assets/aistudio/Transformation_Africa_logo__1_-removebg-preview_eecea55f.png"
                alt="Transformation Africa Emblem"
                className="w-28 h-28 sm:w-32 sm:h-32 object-contain relative z-10"
              />
            </div>
          </div>
        </div>

        {/* 4 Stats Metric Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-16 border-b border-[#D0E7F5] mb-16">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#102B4E] tracking-tight tabular-nums">
              200+
            </div>
            <div className="text-xs text-slate-600 mt-2 font-medium">
              students engaged since 2024
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#159FE3] tracking-tight tabular-nums">
              20+
            </div>
            <div className="text-xs text-slate-600 mt-2 font-medium">
              completed projects
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#102B4E] tracking-tight tabular-nums">
              5+
            </div>
            <div className="text-xs text-slate-600 mt-2 font-medium">
              universities in South Africa and Uganda
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#159FE3] tracking-tight tabular-nums">
              ~20
            </div>
            <div className="text-xs text-slate-600 mt-2 font-medium">
              pilot associates identified
            </div>
          </div>
        </div>

        {/* Guiding Sequence Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
            <div className="lg:col-span-8">
              <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
                Our guiding sequence
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight leading-tight">
                Make connection the starting point.
              </h2>
            </div>
            <div className="lg:col-span-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Technology can support the conditions for human connection. People decide what should happen next.
            </div>
          </div>

          {/* 4 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#D0E7F5]">
            {sequenceSteps.map((step, idx) => (
              <div
                key={step.num}
                className={`p-6 sm:p-8 flex flex-col justify-between ${
                  idx < 3 ? 'lg:border-r border-[#D0E7F5]' : ''
                } ${idx % 2 === 0 ? 'md:border-r lg:border-r-0' : ''} border-b md:border-b-0 border-[#D0E7F5]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                      The Sequence
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#EAF6FC] text-[#102B4E] font-bold text-xs flex items-center justify-center border border-[#D0E7F5]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Background & Consortium */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D0E7F5]">
            <div>
              <div className="text-[11px] font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-1">
                Institutional Consortium
              </div>
              <h3 className="text-2xl font-bold text-[#102B4E]">
                Built with Academic Partners
              </h3>
            </div>
            <div className="text-xs font-semibold text-[#102B4E] bg-[#EAF6FC] px-3.5 py-1.5 rounded-full border border-[#D0E7F5]">
              Austrian Nonprofit Association
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Operating as an Austrian nonprofit association, Transformation Africa facilitates study trips, Collaborative Online International Learning (COIL) programs, and cross-border project teams. Our partner institutions include Stellenbosch University (South Africa), Makerere University (Uganda), and MCI The Entrepreneurial School Innsbruck (Austria), with cooperating partner networks in Germany.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5]">
              <div className="text-xs font-bold text-[#102B4E] mb-1">Stellenbosch University</div>
              <div className="text-xs text-slate-600">Western Cape, South Africa · Faculty of Agri-Sciences &amp; Engineering</div>
            </div>
            <div className="p-4 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5]">
              <div className="text-xs font-bold text-[#102B4E] mb-1">Makerere University</div>
              <div className="text-xs text-slate-600">Kampala, Uganda · Biomedical Engineering &amp; Computing</div>
            </div>
            <div className="p-4 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5]">
              <div className="text-xs font-bold text-[#102B4E] mb-1">MCI Innsbruck</div>
              <div className="text-xs text-slate-600">Innsbruck, Austria · Environmental Engineering &amp; Digital Business</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users, 
  FolderKanban, 
  Briefcase, 
  Target, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers
} from 'lucide-react';

export const DigitalLoomSection: React.FC = () => {
  const [activeThreadIndex, setActiveThreadIndex] = useState(0);

  const threads = [
    {
      role: 'Students & Associates',
      summary: 'Graduate with verified international project portfolios and hands-on cross-border experience.',
      input: 'Talent, curiosity, fresh research, dynamic coding & engineering capacity',
      wovenThrough: 'COIL project sprints, student-led teams, cross-continental pairings',
      fabricOutcome: 'Direct job pathways, verified Skills Passport, entrepreneurship launches',
      icon: Users,
    },
    {
      role: 'Universities & Lecturers',
      summary: 'Break out of academic silos with integrated international study trips and COIL course credits.',
      input: 'Academic rigor, faculty mentorship, research methodologies, ECTS accreditation',
      wovenThrough: 'Inter-university collaborative curriculum and peer reviews',
      fabricOutcome: 'Elevated teaching quality, joint international research, accredited student mobility',
      icon: FolderKanban,
    },
    {
      role: 'Businesses & Industry',
      summary: 'Solve urgent corporate bottlenecks while directly scouting top-tier vetted emerging talent.',
      input: 'Real industrial challenges, market constraints, mentorship, sponsorship',
      wovenThrough: 'Bespoke challenge statements, direct student consultation sprints',
      fabricOutcome: 'Cost-effective innovation, validated prototypes, friction-free talent hiring',
      icon: Briefcase,
    },
    {
      role: 'Entrepreneurs & Startups',
      summary: 'Delivers access to multidisciplinary teams, international mentors, and European-African growth markets.',
      input: 'Venture proposals, MVP hypotheses, domain problem-solving',
      wovenThrough: 'Milestone-based incubation, cross-border testing in urban and rural hubs',
      fabricOutcome: 'Scalable commercial ventures, verified traction, international investor readiness',
      icon: Target,
    },
    {
      role: 'NGOs & Development Partners',
      summary: 'Drive tangible Sustainable Development Goals (SDGs) through market-driven capacity building.',
      input: 'Community needs, field access, sustainability standards, local relationships',
      wovenThrough: 'Grassroots co-creation, verifiable open-source deliverables, local pilots',
      fabricOutcome: 'Credible, audited social & environmental impact with long-term local adoption',
      icon: ShieldCheck,
    },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Real People',
      desc: 'People remain at the center. Technology enhances human relationships and trust rather than replacing them.',
      highlight: 'Human-centered collaboration',
    },
    {
      num: '02',
      title: 'Real Projects',
      desc: 'Projects form the core environment where learning, innovation, and practical skills naturally occur.',
      highlight: 'Action over theoretical lectures',
    },
    {
      num: '03',
      title: 'Real Business',
      desc: 'Economic relevance ensures long-term sustainability. Businesses are active partners, not passive sponsors.',
      highlight: 'Market-viable solutions',
    },
    {
      num: '04',
      title: 'Real Impact',
      desc: 'Success is measured through verified, high-value outcomes and UN SDGs rather than superficial online clicks.',
      highlight: 'Measurable community outcomes',
    },
  ];

  return (
    <section id="digital-loom" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-100/70 border border-sky-200/60 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>The Transformation Africa Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            The Digital Loom Framework
          </h2>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Traditionally, a loom transforms individual threads into a cohesive, highly resilient fabric. Transformation Africa applies this exact metaphor to digital ecosystem architecture.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="text-xs font-bold text-sky-600 tracking-widest uppercase mb-2">
                Pillar {pillar.num}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {pillar.desc}
              </p>
              <div className="text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{pillar.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Digital Loom Weaving Interactive Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Input Threads Picker */}
            <div className="w-full lg:w-5/12">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <Layers className="w-4 h-4 text-sky-500" />
                <span>Step 1: The Input Threads (Stakeholders)</span>
              </div>

              <div className="space-y-2">
                {threads.map((t, idx) => {
                  const Icon = t.icon;
                  const isActive = idx === activeThreadIndex;
                  return (
                    <button
                      key={t.role}
                      onClick={() => setActiveThreadIndex(idx)}
                      className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between ${
                        isActive
                          ? 'bg-sky-50/80 border-sky-300 shadow-sm text-sky-950 ring-1 ring-sky-300'
                          : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-sky-500 text-white' : 'bg-white text-slate-500 border border-slate-200'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{t.role}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{t.summary}</div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-sky-600 translate-x-1' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: How It Weaves Into The Fabric */}
            <div className="w-full lg:w-7/12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between">
              
              {/* Decorative background grid pattern */}
              <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-950/80 border border-sky-800 px-3 py-1 rounded-full">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    <span>The Loom Architecture (PaaC)</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Active Thread: <span className="text-white font-medium">{threads[activeThreadIndex].role}</span>
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Weaving {threads[activeThreadIndex].role} into Real Impact
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {threads[activeThreadIndex].summary}
                </p>

                {/* The Transformation Flow Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider mb-1">
                      1. Ecosystem Input
                    </div>
                    <div className="text-xs text-slate-200 leading-snug">
                      {threads[activeThreadIndex].input}
                    </div>
                  </div>

                  <div className="bg-sky-500/20 backdrop-blur-sm rounded-xl p-3.5 border border-sky-400/30">
                    <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider mb-1">
                      2. PaaC Facilitation
                    </div>
                    <div className="text-xs text-slate-200 leading-snug">
                      {threads[activeThreadIndex].wovenThrough}
                    </div>
                  </div>

                  <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-3.5 border border-emerald-400/30">
                    <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-1">
                      3. Tangible Fabric
                    </div>
                    <div className="text-xs text-emerald-100 font-medium leading-snug">
                      {threads[activeThreadIndex].fabricOutcome}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Axiom Quote */}
              <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sky-400">Core Axiom:</span>
                  <span>Technology supports Relationships ➔ Projects ➔ Impact</span>
                </div>
                <a
                  href="#projects"
                  className="text-sky-300 hover:text-white font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto"
                >
                  <span>See Resulting Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

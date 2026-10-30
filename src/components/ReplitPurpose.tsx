import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Cpu
} from 'lucide-react';

export type PurposeSubTab =
  | 'background'
  | 'mission'
  | 'ecosystem'
  | 'sdgs'
  | 'competences'
  | 'testimonials'
  | 'team'
  | 'contact';

interface ReplitPurposeProps {
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
  initialSubTab?: PurposeSubTab;
}

export const ReplitPurpose: React.FC<ReplitPurposeProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
  initialSubTab = 'background'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PurposeSubTab>(initialSubTab);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const subTabs: { id: PurposeSubTab; label: string }[] = [
    { id: 'background', label: 'Background / Scope' },
    { id: 'mission', label: 'Mission' },
    { id: 'ecosystem', label: 'EcoSystem Approach' },
    { id: 'sdgs', label: 'UN SDGs / Africa Agenda 2063' },
    { id: 'competences', label: 'Key Competences Model' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'team', label: 'Core Team' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-3">
          <span>Consortium Foundation</span>
          <span>·</span>
          <span>Purpose &amp; Institutional Identity</span>
        </div>

        {/* Hero Section */}
        <div className="mb-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Building Bridges between Africa &amp; Europe.
            </h1>
            <p className="text-lg sm:text-xl text-[#102B4E]/80 font-medium leading-relaxed max-w-2xl mb-4">
              Through project-based collaboration, we organize trusted relationships around real opportunities, complementary capabilities, and shared responsibilities.
            </p>
          </div>

        </div>

        {/* Sub-tab Pill Navigation */}
        <div className="bg-[#EAF6FC]/70 p-1.5 rounded-2xl border border-[#D0E7F5] mb-10 flex items-center gap-1.5 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-[#102B4E] text-white shadow-xs'
                  : 'bg-white/80 text-[#102B4E]/75 hover:bg-white hover:text-[#102B4E] border border-[#D0E7F5]/60'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: MISSION & PURPOSE */}
        {activeSubTab === 'mission' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* 3 Pillars Overview (from Google Site slide) */}
            <div>
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Core Identity
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] mb-2">
                Our Purpose, Mission and Position
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mb-6">
                A clear institutional identity for sustainable partnerships across regions and sectors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Purpose */}
                <div className="bg-white rounded-3xl p-7 border-t-4 border-t-[#FFC94A] border-x border-b border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-black text-[#102B4E] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFC94A]" />
                      <span>Purpose</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-3 leading-snug">
                      Build lasting bridges across continents
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Translate mutual interest into shared learning, practical collaboration, and locally owned outcomes that benefit communities in Africa and Europe.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#EAF6FC] text-[11px] font-mono text-[#159FE3] font-bold">
                    Mutual Interest → Shared Learning
                  </div>
                </div>

                {/* Mission */}
                <div className="bg-white rounded-3xl p-7 border-t-4 border-t-[#159FE3] border-x border-b border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-black text-[#102B4E] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#159FE3]" />
                      <span>Mission</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-3 leading-snug">
                      Empower talent to co-design solutions
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Enable African and European students, universities, companies, and local partners to co-design and implement project-based solutions that build talent, trusted relationships, and sustainable institutional collaboration.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#EAF6FC] text-[11px] font-mono text-[#102B4E] font-bold">
                    Students · Faculty · Industry
                  </div>
                </div>

                {/* Position */}
                <div className="bg-white rounded-3xl p-7 border-t-4 border-t-[#102B4E] border-x border-b border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-black text-[#102B4E] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#102B4E]" />
                      <span>Position</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-3 leading-snug">
                      A neutral nonprofit orchestrator
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Transformation Africa does not replace universities, local implementers, consultancies, or funders. We connect them through qualified opportunities, shared project standards, and evidence-based learning.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#EAF6FC] text-[11px] font-mono text-[#159FE3] font-bold">
                    Standards · Learning · Trust
                  </div>
                </div>
              </div>
            </div>

            {/* UN SDGs & Africa Agenda 2063 Banner */}
            <div className="bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#D0E7F5]">
                <div>
                  <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-1">
                    Global &amp; Continental Alignment
                  </div>
                  <h3 className="text-2xl font-bold text-[#102B4E]">
                    UN SDGs Agenda 2030 &amp; AU Agenda 2063
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                    Every project undertaken within the Transformation Africa network maps directly to international sustainability and socio-economic transformation frameworks.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-[#EAF6FC] text-[#102B4E] text-xs font-bold border border-[#D0E7F5]">
                    Agenda 2063
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#EAF6FC] text-[#159FE3] text-xs font-bold border border-[#D0E7F5]">
                    UN SDGs 2030
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="text-xs font-bold text-[#159FE3] font-mono">SDG 4</div>
                  <div className="text-sm font-bold text-[#102B4E] mt-0.5">Quality Education</div>
                  <p className="text-xs text-slate-600 mt-1">Cross-border COIL curriculum &amp; dual-accredited learning.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="text-xs font-bold text-[#159FE3] font-mono">SDG 8</div>
                  <div className="text-sm font-bold text-[#102B4E] mt-0.5">Decent Work &amp; Growth</div>
                  <p className="text-xs text-slate-600 mt-1">Youth problem solvers and enterprise innovation.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="text-xs font-bold text-[#159FE3] font-mono">SDG 9</div>
                  <div className="text-sm font-bold text-[#102B4E] mt-0.5">Industry &amp; Innovation</div>
                  <p className="text-xs text-slate-600 mt-1">Open-hardware agro-processing, IoT telemetry, clean energy.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="text-xs font-bold text-[#159FE3] font-mono">SDG 17</div>
                  <div className="text-sm font-bold text-[#102B4E] mt-0.5">Partnerships for Goals</div>
                  <p className="text-xs text-slate-600 mt-1">Academic consortium spanning Austria, Uganda, SA &amp; Germany.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ECOSYSTEM APPROACH */}
        {activeSubTab === 'ecosystem' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Header intro */}
            <div className="bg-[#102B4E] text-white rounded-3xl p-8 sm:p-10 shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFC94A] font-bold mb-2">
                  Systemic Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                  Beyond Partnerships. Towards Ecosystems That Deliver.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  We believe that meaningful transformation happens when trusted relationships are organised around real opportunities, complementary capabilities, and shared responsibilities.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-xs font-bold text-[#FFC94A] block">1. Connect</span>
                    <span className="text-[11px] text-slate-300">Trusted relationships</span>
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-xs font-bold text-[#159FE3] block">2. Co-create</span>
                    <span className="text-[11px] text-slate-300">Complementary skills</span>
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-xs font-bold text-[#FFC94A] block">3. Deliver</span>
                    <span className="text-[11px] text-slate-300">Accountable milestones</span>
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10 text-center">
                    <span className="text-xs font-bold text-[#159FE3] block">4. Learn &amp; Grow</span>
                    <span className="text-[11px] text-slate-300">Durable capacity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: From Isolated Initiatives to Connected Impact */}
            <div className="bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Section 1 · The Challenge
              </div>
              <h3 className="text-2xl font-bold text-[#102B4E] mb-3">
                From Isolated Initiatives to Connected Impact
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
                Africa–Europe collaboration holds enormous potential. Universities have knowledge and talent. Businesses bring industry experience and market access. Local organisations understand their communities and operating environments. Funders unlock resources, while mentors and alumni contribute continuity.
                <br /><br />
                Yet these resources do not automatically translate into meaningful outcomes. Relationships can remain informal, student projects end when a semester finishes, and companies struggle to identify suitable local partners. Transformation Africa addresses this gap.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="w-8 h-8 rounded-full bg-[#102B4E] text-white flex items-center justify-center font-bold text-xs mb-3">
                    1
                  </div>
                  <h4 className="text-base font-bold text-[#102B4E] mb-1.5">
                    Relationships Create Possibility
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Trust opens doors, builds understanding, and creates opportunities for African and European partners to work together as equal peers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="w-8 h-8 rounded-full bg-[#159FE3] text-white flex items-center justify-center font-bold text-xs mb-3">
                    2
                  </div>
                  <h4 className="text-base font-bold text-[#102B4E] mb-1.5">
                    Real Challenges Create Purpose
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Authentic projects connect complementary skills and resources to operational needs identified directly by the people closest to them.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="w-8 h-8 rounded-full bg-[#FFC94A] text-[#102B4E] flex items-center justify-center font-bold text-xs mb-3">
                    3
                  </div>
                  <h4 className="text-base font-bold text-[#102B4E] mb-1.5">
                    Shared Ownership Creates Continuity
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When partners share responsibility and local actors retain meaningful authority over implementation, collaboration has a durable foundation.
                  </p>
                </div>
              </div>
            </div>

            {/* 6 Principles That Shape Every Ecosystem We Build */}
            <div className="bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Governing Tenets
              </div>
              <h3 className="text-2xl font-bold text-[#102B4E] mb-6">
                The 6 Principles That Shape Every Ecosystem We Build
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    num: '01',
                    title: 'Reciprocal Value',
                    desc: 'Collaboration must create meaningful value for all participants. African and European partners both contribute, learn, and benefit—never one-way delivery.'
                  },
                  {
                    num: '02',
                    title: 'Local Ownership',
                    desc: 'Projects begin with real needs and a legitimate local owner who helps define the problem, shape decisions, and retain authority over rollout.'
                  },
                  {
                    num: '03',
                    title: 'Purposeful Collaboration',
                    desc: 'Partners connect around clearly defined scopes, agreed roles, realistic deliverables, and academic supervision with a clear pathway to utility.'
                  },
                  {
                    num: '04',
                    title: 'Relationships That Endure',
                    desc: 'In-person study tours build trust, while digital platforms maintain continuity beyond individual visits, academic terms, and single projects.'
                  },
                  {
                    num: '05',
                    title: 'Distributed Stewardship',
                    desc: 'Regional university hubs help validate local context and guide decisions. Shared consortium standards support quality without erasing regional nuances.'
                  },
                  {
                    num: '06',
                    title: 'Evidence Before Scale',
                    desc: 'We learn from field pilots, evaluate real data, and refine methods before replicating. Growth is guided by demonstrated readiness and capacity.'
                  }
                ].map((p) => (
                  <div key={p.num} className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5] flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#159FE3] block mb-2">{p.num}</span>
                      <h4 className="text-base font-bold text-[#102B4E] mb-2">{p.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transformation Shift Table (From -> To) */}
            <div className="bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Paradigm Evolution
              </div>
              <h3 className="text-2xl font-bold text-[#102B4E] mb-6">
                A Different Way of Building Africa–Europe Collaboration
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#D0E7F5] text-slate-400 uppercase font-mono tracking-wider">
                      <th className="pb-3 font-bold text-[#102B4E]">Conventional Pattern</th>
                      <th className="pb-3 font-bold text-[#159FE3]">Transformation Africa Approach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAF6FC]">
                    {[
                      { from: 'From Networking as an end in itself', to: 'Organised relationships around real validated opportunities' },
                      { from: 'From Isolated student projects that end after finals', to: 'Connected learning that builds cumulative institutional knowledge' },
                      { from: 'From External intervention & top-down aid', to: 'Local project owners defining needs and guiding implementation' },
                      { from: 'From Good intentions without accountability', to: 'Clear scopes, allocated resources, and measurable milestones' },
                      { from: 'From One-off exchanges and sporadic visits', to: 'Durable multi-year partnerships and permanent institutional hubs' },
                      { from: 'From Unfounded enthusiasm', to: 'Evidence-based evaluation before expanding or scaling' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#EAF6FC]/40 transition-colors">
                        <td className="py-3.5 pr-4 text-slate-500 line-through decoration-rose-300 font-medium">
                          {row.from}
                        </td>
                        <td className="py-3.5 pl-4 text-[#102B4E] font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0" />
                          <span>{row.to}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BACKGROUND & SCOPE */}
        {activeSubTab === 'background' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Demographic &amp; Economic Context
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-4">
                The Demographic Horizon &amp; Continental Opportunity
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Africa is the only remaining continent with exponential youth growth and correspondingly surging demand for sustainable industrial and consumer goods. Yet engagement between European tertiary education and African industry remains disproportionately nascent.
              </p>

              {/* Data Callout Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-3xl font-extrabold text-[#102B4E] font-mono">1.3B → 4B</div>
                  <div className="text-xs font-bold text-[#159FE3] uppercase font-mono mt-1">Population Trajectory</div>
                  <p className="text-xs text-slate-600 mt-2">Growth over the next two generations, creating the largest workforce on Earth.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-3xl font-extrabold text-[#102B4E] font-mono">Digital 1st</div>
                  <div className="text-xs font-bold text-[#159FE3] uppercase font-mono mt-1">Mobile Leapfrogging</div>
                  <p className="text-xs text-slate-600 mt-2">World-leading mobile money and fintech adoption, setting benchmarks for decentralized systems.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-3xl font-extrabold text-[#102B4E] font-mono">Critical</div>
                  <div className="text-xs font-bold text-[#159FE3] uppercase font-mono mt-1">Energy &amp; Minerals</div>
                  <p className="text-xs text-slate-600 mt-2">Essential global reserves of solar irradiation, agricultural arable land, and transition metals.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-3xl font-extrabold text-[#102B4E] font-mono">Urban</div>
                  <div className="text-xs font-bold text-[#159FE3] uppercase font-mono mt-1">Megacity Expansion</div>
                  <p className="text-xs text-slate-600 mt-2">Surging peri-urban centers demanding decentralized cold chain, waste, and transport solutions.</p>
                </div>
              </div>

              {/* Tertiary Education Mandate */}
              <div className="p-6 rounded-2xl bg-[#102B4E] text-white">
                <h3 className="text-xl font-bold mb-2 text-white">
                  The Mandate for Tertiary Education: Developing &ldquo;Problem Solvers&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Higher education cannot remain isolated in theoretical lecture halls. Universities have an urgent mandate to prepare graduates for Global Citizenship through problem-based learning (PBL) on real-world industrial and community bottlenecks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC94A]" />
                    <span>Curriculum-anchored credits (ECTS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC94A]" />
                    <span>Interdisciplinary engineering &amp; business</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC94A]" />
                    <span>Local value generation &amp; enterprise creation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KEY COMPETENCES MODEL (Stahl / Hillmer) */}
        {activeSubTab === 'competences' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Pedagogical Framework
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-2">
                The 5-Dimension Competence Model (Stahl / Hillmer)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mb-8">
                Developed by academic leaders Prof. Dr.-Ing. Gerhard Hillmer (MCI) and pedagogical researchers to cultivate resilient, street-smart problem solvers capable of operating in complex intercultural environments.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Heuristic */}
                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-2xl bg-[#102B4E] text-white flex items-center justify-center font-bold text-xs mb-4">
                      1
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                      Heuristische Kompetenz
                    </h3>
                    <div className="text-[11px] font-bold text-[#159FE3] uppercase font-mono mb-2">
                      Fokus: Problemlösungsfähigkeit (überfachlich)
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Hier geht es um das „Gewusst wie“. Wenn ein reales Problem auftritt, für das es keine vorgefertigte Formel gibt, wissen sich die Studierenden zu helfen und handeln eigeninitiativ — &ldquo;street smart&rdquo;.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0E7F5] text-[10px] font-mono text-[#102B4E] font-bold">
                    Problem-Solving in Ambiguity
                  </div>
                </div>

                {/* 2. Intrapersonal */}
                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-2xl bg-[#159FE3] text-white flex items-center justify-center font-bold text-xs mb-4">
                      2
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                      Intrapersonale Kompetenz
                    </h3>
                    <div className="text-[11px] font-bold text-[#159FE3] uppercase font-mono mb-2">
                      Fokus: Selbstmanagement &amp; Selbst-Führung
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Erkennen der eigenen Stärken, Werte und Persönlichkeit. Was macht mich als Persönlichkeit wirksam? Reflexionsvermögen und Ausdauer bei unvorhergesehenen Rückschlägen.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0E7F5] text-[10px] font-mono text-[#102B4E] font-bold">
                    Self-Leadership &amp; Resilience
                  </div>
                </div>

                {/* 3. Interpersonal */}
                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-2xl bg-[#FFC94A] text-[#102B4E] flex items-center justify-center font-bold text-xs mb-4">
                      3
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                      Interpersonale Kompetenz
                    </h3>
                    <div className="text-[11px] font-bold text-[#159FE3] uppercase font-mono mb-2">
                      Fokus: Wirkungsvolle Interaktion mit anderen
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Interkulturelle Empathie und gelingende Teamdynamik zwischen europäischen und afrikanischen Studierenden sowie lokalen Kleinbauern und Industriepartnern.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0E7F5] text-[10px] font-mono text-[#102B4E] font-bold">
                    Intercultural Team Performance
                  </div>
                </div>

                {/* 4. Interpretative */}
                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-2xl bg-[#102B4E] text-white flex items-center justify-center font-bold text-xs mb-4">
                      4
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                      Interpretative Kompetenz
                    </h3>
                    <div className="text-[11px] font-bold text-[#159FE3] uppercase font-mono mb-2">
                      Fokus: Signal- und Datenverarbeitung
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      &ldquo;Aus dem Rauschen eine Musik machen.&rdquo; In der Daten- und Informationsflut das Wesentliche filtern, Annahmen im Feld empirisch überprüfen und belastbare Schlussfolgerungen ziehen.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0E7F5] text-[10px] font-mono text-[#102B4E] font-bold">
                    Noise Filtering &amp; Sensemaking
                  </div>
                </div>

                {/* 5. Inszenatorische */}
                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-2xl bg-[#159FE3] text-white flex items-center justify-center font-bold text-xs mb-4">
                      5
                    </div>
                    <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                      Inszenatorische Kompetenz
                    </h3>
                    <div className="text-[11px] font-bold text-[#159FE3] uppercase font-mono mb-2">
                      Fokus: Wirkungsvoll Anliegen rüberbringen
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Leitfrage: „Wie kann ich mir für meine Ideen Gehör verschaffen?“ Pitch-Fähigkeit, Körpersprache, visuelle Storytelling-Methoden und überzeugende Präsentation vor Vorständen und Investoren.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D0E7F5] text-[10px] font-mono text-[#102B4E] font-bold">
                    Executive Pitch &amp; Influence
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CORE TEAM */}
        {activeSubTab === 'team' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Consortium Leadership
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-2">
                Core Coordination &amp; Academic Board
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mb-8">
                Transformation Africa operates as an Austrian non-profit association (Verein) headquartered in Innsbruck, governed by senior university leaders across Austria, Uganda, South Africa, and Germany.
              </p>

              {/* Lead Coordinator Profile */}
              <div className="bg-[#102B4E] text-white rounded-3xl p-7 sm:p-9 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                <div className="space-y-2 max-w-xl">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFC94A] font-bold">
                    Executive Chair &amp; Academic Lead
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Prof. Dr.-Ing. Gerhard Hillmer MSc
                  </h3>
                  <p className="text-xs text-[#159FE3] font-semibold font-mono">
                    Head of Studies: Industrial Engineering &amp; Management (MSc) · MCI | The Entrepreneurial School®
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-2">
                    Pioneering international collaborative online learning (COIL) frameworks and applied field study trips connecting European engineers with East and Southern African enterprise challenges.
                  </p>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-xs space-y-2 shrink-0 font-mono text-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#FFC94A]" />
                    <span>Maximilianstrasse 2, 6020 Innsbruck, Austria</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#159FE3]" />
                    <span>+43 512 2070 -4110 / +43 664 2616321</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#159FE3]" />
                    <span>gerhard.hillmer@mci.edu</span>
                  </div>
                </div>
              </div>

              {/* University Hub Representatives */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Uganda Hub</div>
                  <h4 className="text-base font-bold text-[#102B4E]">Makerere University</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    College of Engineering, Design, Art and Technology (CEDAT) · Kampala. Leading rural telemetry and solar agro-processing.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">South Africa Hub</div>
                  <h4 className="text-base font-bold text-[#102B4E]">Stellenbosch University</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Faculty of AgriSciences &amp; Engineering · Western Cape. Hosting annual International Entrepreneurship &amp; Sustainability Summer Schools.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Germany Liaison</div>
                  <h4 className="text-base font-bold text-[#102B4E]">Munich Academic Network</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Technical University of Munich (TUM) cooperating departments · Dual-thesis co-supervision and enterprise sponsorship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: TESTIMONIALS */}
        {activeSubTab === 'testimonials' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Field Voice &amp; Immersion
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-2">
                Voices from Summer Schools &amp; COIL Cohorts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mb-8">
                Real student teams, faculty mentors, and community partners sharing the impact of on-the-ground co-creation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#159FE3] bg-white px-2.5 py-1 rounded-full border border-[#D0E7F5] inline-block mb-3">
                      Stellenbosch Summer School
                    </span>
                    <blockquote className="text-xs sm:text-sm text-[#102B4E] leading-relaxed italic mb-4">
                      &ldquo;Working side by side with South African engineering students changed how we analyze supply chains. We were not merely building software; we were designing for off-grid reality.&rdquo;
                    </blockquote>
                  </div>
                  <div className="pt-3 border-t border-[#D0E7F5] text-xs">
                    <strong className="text-[#102B4E] block">Lukas M.</strong>
                    <span className="text-slate-500 text-[11px]">Industrial Engineering MSc · MCI Innsbruck</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#159FE3] bg-white px-2.5 py-1 rounded-full border border-[#D0E7F5] inline-block mb-3">
                      Makerere Rural COIL
                    </span>
                    <blockquote className="text-xs sm:text-sm text-[#102B4E] leading-relaxed italic mb-4">
                      &ldquo;The ECTS credit recognition allowed our biomedical team to earn academic qualifications while solving an immediate cold chain failure for peri-urban dairy farmers.&rdquo;
                    </blockquote>
                  </div>
                  <div className="pt-3 border-t border-[#D0E7F5] text-xs">
                    <strong className="text-[#102B4E] block">Brenda N.</strong>
                    <span className="text-slate-500 text-[11px]">Biomedical Engineering · Makerere University</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#159FE3] bg-white px-2.5 py-1 rounded-full border border-[#D0E7F5] inline-block mb-3">
                      AgriSciences Field Partner
                    </span>
                    <blockquote className="text-xs sm:text-sm text-[#102B4E] leading-relaxed italic mb-4">
                      &ldquo;We offered our packinghouses as live pilot testbeds. The student team delivered a validated solar evaporative prototype that our cooperative now operates daily.&rdquo;
                    </blockquote>
                  </div>
                  <div className="pt-3 border-t border-[#D0E7F5] text-xs">
                    <strong className="text-[#102B4E] block">Dr. Sibusiso M.</strong>
                    <span className="text-slate-500 text-[11px]">Lead Project Sponsor · Western Cape Agricultural Cluster</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UN SDGS & AFRICA AGENDA 2063 */}
        {activeSubTab === 'sdgs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#D0E7F5]">
                <div>
                  <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-1">
                    Continental &amp; Global Frameworks
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#102B4E]">
                    UN SDGs Agenda 2030 &amp; AU Agenda 2063
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                    Transformation Africa projects explicitly map to the United Nations Sustainable Development Goals and African Union Agenda 2063 aspirations, ensuring verified socio-economic impact across both continents.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-2 rounded-xl bg-[#EAF6FC] text-[#102B4E] text-xs font-bold border border-[#D0E7F5]">
                    AU Agenda 2063
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-[#102B4E] text-[#FFC94A] text-xs font-bold">
                    UN SDGs 2030
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                <div className="p-6 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-bold flex items-center justify-center font-mono text-sm mb-3">
                    04
                  </div>
                  <div className="text-base font-bold text-[#102B4E]">Quality Education</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Dual-accredited COIL coursework, cross-border problem-based learning, and academic ECTS recognition.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center font-mono text-sm mb-3">
                    08
                  </div>
                  <div className="text-base font-bold text-[#102B4E]">Decent Work &amp; Growth</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Empowering African youth problem-solvers to incubate local enterprises and build sustainable supply chains.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center font-mono text-sm mb-3">
                    09
                  </div>
                  <div className="text-base font-bold text-[#102B4E]">Industry &amp; Innovation</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Open-hardware agri-processing, clean off-grid solar tech, and IoT telemetry tailored for rural infrastructure.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5]">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center font-mono text-sm mb-3">
                    17
                  </div>
                  <div className="text-base font-bold text-[#102B4E]">Partnerships for Goals</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Academic and industrial consortium uniting Austria, Uganda, South Africa, and Germany.
                  </p>
                </div>
              </div>

              {/* AU Agenda 2063 Strategic Aspiration Card */}
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">AU Agenda 2063 Alignment</div>
                <h3 className="text-xl font-bold text-[#102B4E] mb-2">A Prosperous Africa Based on Inclusive Growth &amp; Sustainable Development</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  We champion Aspiration 1 (prosperous continent driven by youth capability) and Aspiration 6 (an Africa whose development is people-driven, unleashing the potential of its women and youth).
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onNavigateToProjects}
                    className="px-5 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all"
                  >
                    View SDG-Mapped Projects
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 8: CONTACT */}
        {activeSubTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Consortium Governance &amp; Contact
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-2">
                Get in Touch with Consortium Leadership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mb-8">
                Connect directly with our academic coordinators and Austrian association leadership for curriculum partnerships, research collaboration, and student exchange.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Official Austrian HQ */}
                <div className="bg-[#F8F6F0] rounded-2xl p-6 border border-[#D0E7F5] space-y-4">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase">Consortium Head</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#102B4E]">Prof. Dr.-Ing. Gerhard Hillmer MSc</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Head of Studies: Industrial Engineering &amp; Management</p>
                    <p className="text-xs text-slate-600">MCI Management Center Innsbruck</p>
                  </div>
                  <div className="space-y-2 text-xs text-slate-700 font-mono pt-2 border-t border-[#D0E7F5]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#159FE3]" />
                      <span>Maximilianstraße 2, 6020 Innsbruck, Austria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#159FE3]" />
                      <a href="mailto:gerhard.hillmer@mci.edu" className="text-[#159FE3] hover:underline">gerhard.hillmer@mci.edu</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#159FE3]" />
                      <span>+43 512 2070 -4110 / +43 664 2616321</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Card */}
                <div className="bg-[#102B4E] rounded-2xl p-6 text-white flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#FFC94A] uppercase mb-2">Inquiries &amp; Challenge Intake</div>
                    <h3 className="text-xl font-bold mb-3">Have an Organisation Challenge or Research Proposal?</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      Submit your operational bottleneck or project proposal directly through our challenge intake portal. The Academic Consortium Board reviews and scopes all incoming initiatives.
                    </p>
                  </div>
                  <button
                    onClick={onNavigateToContact}
                    className="w-full py-3 px-4 rounded-full bg-[#FFC94A] hover:bg-[#F2BD3F] text-[#102B4E] text-xs font-bold transition-all text-center"
                  >
                    Open Challenge Intake &amp; Portal
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

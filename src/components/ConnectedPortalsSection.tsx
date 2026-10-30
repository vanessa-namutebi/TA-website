import React, { useState } from 'react';
import { PortalTab } from '../types';
import { STUDENT_ASSOCIATES_DATA } from '../data/mockData';
import { 
  GraduationCap, 
  Building2, 
  Rocket, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Award, 
  CheckCircle, 
  FileCheck, 
  Globe2,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const ConnectedPortalsSection: React.FC = () => {
  const [activePortal, setActivePortal] = useState<PortalTab>('student');

  const portals = [
    {
      id: 'student' as PortalTab,
      label: 'Student Associate Portal',
      icon: UserCheck,
      subtitle: 'Talent development & verified Skills Passports',
      desc: 'Enables African and European students to build dynamic international project portfolios, earn verified competency badges, and get matched to real enterprise opportunities.',
    },
    {
      id: 'university' as PortalTab,
      label: 'University Portal',
      icon: GraduationCap,
      subtitle: 'Academic collaboration & COIL management',
      desc: 'Facilitates international Collaborative Online International Learning (COIL) courses, cross-institutional grading rubrics, and faculty research partnerships.',
    },
    {
      id: 'business' as PortalTab,
      label: 'Business Portal',
      icon: Building2,
      subtitle: 'Industry challenge intake & talent scouting',
      desc: 'Gives European and African corporations direct access to top-tier vetted emerging engineering and business talent while resolving critical technical bottlenecks.',
    },
    {
      id: 'innovation' as PortalTab,
      label: 'Innovation Portal',
      icon: Rocket,
      subtitle: 'Venture incubation & startup acceleration',
      desc: 'Nurtures student projects into standalone commercial spin-offs through milestone-based progress tracking, IP guidance, and international mentor matching.',
    },
    {
      id: 'governance' as PortalTab,
      label: 'Governance Dashboard',
      icon: ShieldCheck,
      subtitle: 'Impact analytics & AI ethics oversight',
      desc: 'Centralized administration tracking UN SDG milestones, ecosystem health, cross-border equity, and enforcing the "Humans Decide, AI Supports" policy.',
    },
  ];

  return (
    <section id="portals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-100/70 border border-sky-200/60 px-3 py-1 rounded-full mb-3">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>Digital Architecture &amp; System Environments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            5 Connected Functional Environments
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg leading-relaxed">
            The Platform-as-a-Community unites five specialized environments into a single coherent workflow—bridging students, academics, enterprise, and policymakers.
          </p>
        </div>

        {/* Portal Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {portals.map((p) => {
            const Icon = p.icon;
            const isActive = activePortal === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePortal(p.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Portal Preview Canvas */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-inner">
          
          {/* Header of Active Portal */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <div>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                {portals.find((p) => p.id === activePortal)?.subtitle}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {portals.find((p) => p.id === activePortal)?.label}
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {portals.find((p) => p.id === activePortal)?.desc}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Phase 1 Functional Prototype</span>
            </div>
          </div>

          {/* Interactive Portal Views */}
          {activePortal === 'student' && (
            <div className="space-y-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Verified Student Associates Sample Directory (Skills Passport)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STUDENT_ASSOCIATES_DATA.slice(0, 3).map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-extrabold text-xs flex items-center justify-center">
                          {student.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {student.badge}
                        </span>
                      </div>
                      <div className="text-base font-bold text-slate-900">{student.name}</div>
                      <div className="text-xs text-sky-600 font-medium">{student.university}</div>
                      <div className="text-[11px] text-slate-400 mb-3">{student.country} · {student.program}</div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {student.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">
                        Verified Skills Passport:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePortal === 'university' && (
            <div className="space-y-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Collaborative Online International Learning (COIL) Curricular Grid
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>COIL Semester: Fall 2026</span>
                    <span className="text-sky-600 font-bold">6 ECTS Credits</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    Autonomous IoT Systems for Semi-Arid Agriculture
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Jointly taught by Stellenbosch Mechatronics &amp; MCI Environmental Engineering. Students form cross-continental pairs to calibrate and fabricate open-source IoT sensors.
                  </p>
                  <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span>Lecturers: Prof. Van Der Merwe &amp; Dr. Wieser</span>
                    <span className="text-emerald-600 font-semibold">Active (34 Students)</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>COIL Semester: Spring 2027</span>
                    <span className="text-sky-600 font-bold">5 ECTS Credits</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    Circular Materials &amp; Upcycling Bio-Economy
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Connecting Makerere Industrial Chemistry with Tyrolean Biomass Institute to develop non-toxic compostable packaging from East African agricultural residues.
                  </p>
                  <div className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span>Lecturers: Prof. Namubiru &amp; Prof. Schmid</span>
                    <span className="text-sky-600 font-semibold">Intake Open (28 Seats)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePortal === 'business' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Corporate Innovation &amp; Direct Talent Scouting Dashboard
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Post industrial challenges to tap vetted intercontinental talent pipelines without costly recruitment overheads.
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                  Recruitment Savings: ~72% vs traditional agencies
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 mb-1">Active Industry Challenges</div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums">14 Live</div>
                  <div className="text-[11px] text-slate-400 mt-1">Sponsored by Austrian &amp; African firms</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 mb-1">Vetted Candidates Scouted</div>
                  <div className="text-2xl font-extrabold text-sky-600 tabular-nums">86 Associates</div>
                  <div className="text-[11px] text-slate-400 mt-1">Direct interview invitations sent</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 mb-1">Commercial Conversion Rate</div>
                  <div className="text-2xl font-extrabold text-emerald-600 tabular-nums">68%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Projects integrated into enterprise R&amp;D</div>
                </div>
              </div>
            </div>
          )}

          {activePortal === 'innovation' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="mb-6">
                <h4 className="text-base font-bold text-slate-900">
                  Venture Intake &amp; Incubation Milestones
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supporting promising student project teams with formal business incorporation, IP licensing, and mentor matching.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Stage: Seed Prototyping</div>
                  <div className="text-sm font-bold text-slate-900">AgriLoRa Paarl Spin-Off</div>
                  <p className="text-xs text-slate-600 mt-1">Low-cost IoT soil node commercialization with 14 paying vineyard customers.</p>
                </div>
                <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-200">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">Stage: Clinical Trials</div>
                  <div className="text-sm font-bold text-slate-900">AeroHealth Logistics Uganda</div>
                  <p className="text-xs text-slate-600 mt-1">Autonomous drone blood dispatch system seeking Civil Aviation certification.</p>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Stage: Commercial Rollout</div>
                  <div className="text-sm font-bold text-slate-900">BioWrap Kampala</div>
                  <p className="text-xs text-slate-600 mt-1">Banana &amp; cassava peel bioplastic packaging scaling to 5 local supermarket chains.</p>
                </div>
              </div>
            </div>
          )}

          {activePortal === 'governance' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Governance, Impact Audit &amp; AI Ethics Policy
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    "Humans Decide. AI Supports." Real-world verified impact over superficial online metrics.
                  </p>
                </div>
                <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                  AI Ethics Certified (Strategic Policy July 2026)
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Total Students Engaged</div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums">200+</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Validated since 2024</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Completed Projects</div>
                  <div className="text-2xl font-extrabold text-slate-900 tabular-nums">20+</div>
                  <div className="text-[11px] text-slate-400">With full dossiers &amp; code</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Cross-Border Teams</div>
                  <div className="text-2xl font-extrabold text-sky-600 tabular-nums">100%</div>
                  <div className="text-[11px] text-slate-400">Africa-Europe parity</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500">Addressed UN SDGs</div>
                  <div className="text-2xl font-extrabold text-amber-600 tabular-nums">8 Goals</div>
                  <div className="text-[11px] text-slate-400">Independently audited</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">AI Governance Stance:</strong> AI serves strictly as an intelligence enabler for skills matching and portfolio analytics. All project approvals, grading, team selections, and ethical evaluations are made by human faculty and coordination directors.
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

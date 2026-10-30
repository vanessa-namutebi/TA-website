import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Globe2,
  Calendar,
  Building2,
  CheckCircle2,
  Send,
  Download
} from 'lucide-react';
import { ReplitProjectRepository } from './ReplitProjectRepository';
import { ReplitOpportunities } from './ReplitOpportunities';
import { ReplitResources } from './ReplitResources';
import { ReplitProject, ReplitOpportunity } from '../data/replitData';

export type ProjectsSubTab = 'approach' | 'types' | 'pipeline' | 'overview';

interface ReplitProjectsProps {
  onSelectProject: (project: ReplitProject) => void;
  opportunities: ReplitOpportunity[];
  onOpportunityUpdated: (updated: ReplitOpportunity[]) => void;
  onNavigateToContact: () => void;
  initialSubTab?: ProjectsSubTab | 'repository' | 'opportunities' | 'resources';
}

export const ReplitProjects: React.FC<ReplitProjectsProps> = ({
  onSelectProject,
  opportunities,
  onOpportunityUpdated,
  onNavigateToContact,
  initialSubTab = 'overview'
}) => {
  // Normalize initialSubTab to one of the 4 official tabs
  const normalizeTab = (t: string): ProjectsSubTab => {
    if (t === 'repository' || t === 'overview') return 'overview';
    if (t === 'opportunities' || t === 'pipeline') return 'pipeline';
    if (t === 'types') return 'types';
    if (t === 'approach') return 'approach';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<ProjectsSubTab>(normalizeTab(initialSubTab));

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveTab(normalizeTab(initialSubTab));
    }
  }, [initialSubTab]);

  const subTabs: { id: ProjectsSubTab; label: string; badge?: string }[] = [
    { id: 'approach', label: 'General Approach' },
    { id: 'types', label: 'Types' },
    {
      id: 'pipeline',
      label: 'Project pipeline',
      badge: `${opportunities.filter(o => o.status === 'Open for Applications').length} Active`
    },
    { id: 'overview', label: 'Overview' }
  ];

  return (
    <div className="bg-[#F8F6F0] min-h-screen">
      {/* Sub-header Navigation Bar */}
      <div className="bg-white border-b border-[#E2EEF5] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
            
            {/* Tab Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#102B4E] text-white shadow-sm'
                      : 'text-[#415D7E] hover:text-[#102B4E] hover:bg-[#EAF6FC]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                        activeTab === tab.id
                          ? 'bg-[#159FE3] text-white'
                          : 'bg-[#FFC94A] text-[#102B4E]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick action button */}
            <button
              onClick={onNavigateToContact}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-[#102B4E] hover:text-[#159FE3] bg-[#EAF6FC] hover:bg-[#D5EBF7] px-3.5 py-1.5 rounded-full border border-[#D0E7F5] transition-all"
            >
              <Send className="w-3 h-3 text-[#159FE3]" />
              <span>Propose an Organisation Challenge</span>
            </button>

          </div>
        </div>
      </div>

      {/* Main View Area based on activeTab */}
      <div>
        {activeTab === 'overview' && (
          <ReplitProjectRepository onSelectProject={onSelectProject} />
        )}

        {activeTab === 'approach' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
            <div className="mb-12">
              <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-2">
                Project Methodology &amp; Lifecycle
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
                General Approach: How We Turn Questions into Impact.
              </h1>
              <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                Transformation Africa bridges higher education and ground-level problem solving through a tested 4-stage lifecycle governed by reciprocal ownership, academic rigor, and demonstrable socio-economic outcomes.
              </p>
            </div>

            {/* 4 Phases */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] text-[#159FE3] font-mono font-black text-base flex items-center justify-center mb-5">
                    01
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Phase 1 · Intake &amp; Scoping
                  </div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                    Challenge Identification
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Local enterprises, farm cooperatives, or municipalities submit tangible bottlenecks. Academic consortium leads verify curricular alignment, ECTS feasibility, and community need.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2EEF5] text-[11px] font-mono text-[#415D7E] mt-4">
                  Output: Structured Brief &amp; Syllabus Match
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] text-[#102B4E] font-mono font-black text-base flex items-center justify-center mb-5">
                    02
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Phase 2 · Assembly
                  </div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                    Cross-Border Teaming
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Interdisciplinary student squads from Makerere, Stellenbosch, MCI, and TUM are paired with industry liaisons and faculty supervisors for synchronous and asynchronous collaboration.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2EEF5] text-[11px] font-mono text-[#415D7E] mt-4">
                  Output: Joint Charter &amp; Sprint Cadence
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] text-[#159FE3] font-mono font-black text-base flex items-center justify-center mb-5">
                    03
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Phase 3 · Execution
                  </div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                    Agile Co-Creation &amp; CAD
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Teams execute bi-weekly design iterations, thermodynamic simulations, hardware prototyping, and field test validation with local communities and farm pilot locations.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2EEF5] text-[11px] font-mono text-[#415D7E] mt-4">
                  Output: Working Prototype &amp; Manuals
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#102B4E] text-[#FFC94A] font-mono font-black text-base flex items-center justify-center mb-5">
                    04
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#FFC94A] uppercase tracking-wider mb-1">
                    Phase 4 · Delivery
                  </div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                    Evaluation &amp; Handover
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dual faculty examination, ECTS accreditation, student e-portfolio publishing, and open-hardware handover to local cooperative owners for sustained community operation.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E2EEF5] text-[11px] font-mono text-[#415D7E] mt-4">
                  Output: Open Repository &amp; Impact Cert
                </div>
              </div>
            </div>

            {/* Quick Action Strip */}
            <div className="bg-[#102B4E] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
              <div>
                <h3 className="text-2xl font-bold">Explore Our Live Pipeline of Opportunities</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Check open team calls sponsored by partner organizations across Uganda, South Africa, Austria, and Germany.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('pipeline')}
                className="px-6 py-3 rounded-full bg-[#FFC94A] hover:bg-[#F2BD3F] text-[#102B4E] text-xs font-bold transition-all shrink-0"
              >
                View Project Pipeline
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <ReplitOpportunities
            opportunities={opportunities}
            onOpportunityUpdated={onOpportunityUpdated}
            onNavigateToContact={onNavigateToContact}
          />
        )}

        {activeTab === 'types' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
              <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-2">
                Project Typology · How We Collaborate
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
                Structured formats for cross-continental engagement.
              </h1>
              <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                Transformation Africa organizes diverse project archetypes tailored to university curricula, corporate research needs, and community development priorities across Europe and Africa.
              </p>
            </div>

            {/* 5 Project Formats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              
              {/* Type 1: COIL */}
              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center text-[#159FE3] mb-5">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Virtual Exchange · 8-14 Weeks
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E] mb-2">
                    COIL (Collaborative Online International Learning)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Embedded directly into existing university semester courses. Intercultural student pairs work synchronously and asynchronously on live corporate or NGO challenges.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Co-taught by European and African faculty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Zero travel carbon footprint; fully scalable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Accredited ECTS credits awarded by both universities</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF6FC] hover:bg-[#D5EBF7] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View COIL Projects in Repository</span>
                  <ArrowRight className="w-3 h-3 text-[#159FE3]" />
                </button>
              </div>

              {/* Type 2: Study Tours & Field Research */}
              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center text-[#159FE3] mb-5">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    On-Site Immersive · 1-3 Weeks
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E] mb-2">
                    Study Tours &amp; Field Immersions
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Intensive on-the-ground study tours where European students travel to African partner institutions (Uganda, South Africa) or vice versa to validate prototypes in real field environments.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Community site visits &amp; stakeholder interviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Co-design workshops with local youth and cooperatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Strict adherence to reciprocal partnership protocols</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF6FC] hover:bg-[#D5EBF7] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Fieldwork Case Studies</span>
                  <ArrowRight className="w-3 h-3 text-[#159FE3]" />
                </button>
              </div>

              {/* Type 3: Bachelor & Master Theses */}
              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center text-[#159FE3] mb-5">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Academic Degree Project · 4-6 Months
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E] mb-2">
                    Applied Bachelor &amp; Master Theses
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Rigorous academic dissertations co-supervised by faculty from MCI, Makerere, or Stellenbosch, addressing an empirical question posed by an industrial partner.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Dual faculty advisory committees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Empirical data collection across regional hubs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Open-access publication in consortium repository</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onNavigateToContact}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF6FC] hover:bg-[#D5EBF7] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Propose a Thesis Topic</span>
                  <ArrowRight className="w-3 h-3 text-[#159FE3]" />
                </button>
              </div>

              {/* Type 4: Applied Industry Internships */}
              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center text-[#159FE3] mb-5">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Professional Placement · 3-6 Months
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E] mb-2">
                    Industry Internships &amp; Secondments
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Placements matching talented engineering, business, and computer science students with companies operating across the African continent or European green-tech firms.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Dedicated mentor assigned at the host company</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Integration with local incubator networks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Practical contribution to active business operations</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF6FC] hover:bg-[#D5EBF7] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Open Internships</span>
                  <ArrowRight className="w-3 h-3 text-[#159FE3]" />
                </button>
              </div>

              {/* Type 5: Hackathons & Rapid Prototyping Sprints */}
              <div className="bg-white rounded-3xl p-7 border border-[#D0E7F5] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] flex items-center justify-center text-[#159FE3] mb-5">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Sprint Event · 48 Hours to 1 Week
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E] mb-2">
                    Hackathons &amp; Innovation Sprints
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Fast-paced design sprints where mixed cross-border teams solve high-priority bottlenecks in renewable energy, cold chain storage, or maternal telemetry.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Live feedback from venture capitalists and engineers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Seed prototyping grants for top-performing teams</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Rapid path into the full project repository</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EAF6FC] hover:bg-[#D5EBF7] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Upcoming Challenges</span>
                  <ArrowRight className="w-3 h-3 text-[#159FE3]" />
                </button>
              </div>

              {/* Type 6: Custom Enterprise Sprints */}
              <div className="bg-[#102B4E] rounded-3xl p-7 text-white shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#159FE3] flex items-center justify-center text-white mb-5">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-[#FFC94A] uppercase tracking-wider mb-1">
                    Enterprise Co-Creation
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Custom Industry Challenge Track
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Are you a company or NGO with a specific technical challenge? Submit your problem statement to our academic consortium board to be staffed by a vetted student team.
                  </p>
                  <div className="bg-white/10 rounded-xl p-3 border border-white/10 mb-6 text-xs text-slate-200">
                    <div className="font-bold text-white mb-1">How it works:</div>
                    1. Submit challenge via intake form<br />
                    2. Academic board reviews &amp; scopes syllabus<br />
                    3. Team formed with faculty supervisor
                  </div>
                </div>
                <button
                  onClick={onNavigateToContact}
                  className="w-full py-3 px-4 rounded-full bg-[#FFC94A] hover:bg-[#F2BD3F] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Submit Your Organisation Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Official Assignment & Project Ideas Google Doc Link from Google Site */}
            <div className="bg-[#EAF6FC] border border-[#D0E7F5] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-1">
                  Living Consortium Document
                </div>
                <h3 className="text-2xl font-bold text-[#102B4E]">
                  Curated Project Ideas &amp; Term Assignments
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Access the live Google Doc repository of ongoing thesis proposals, cross-campus engineering prompts, and community challenge briefs curated by Prof. Dr.-Ing. Gerhard Hillmer and consortium leads.
                </p>
              </div>
              <a
                href="https://docs.google.com/document/d/1d6GDDBlwMQMTIdEEVmYSwMVzQwwI7jjxti6svFN--ao/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all shrink-0 shadow-sm"
              >
                <span>Open Google Doc Assignment Ideas</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#159FE3]" />
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

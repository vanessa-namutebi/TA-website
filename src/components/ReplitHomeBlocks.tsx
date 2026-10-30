import React from 'react';
import { ArrowRight, Lightbulb, ArrowUpRight, CheckCircle2, Target, Compass, ShieldCheck, Users, Layers, ExternalLink } from 'lucide-react';
import { REPLIT_PROJECTS, ReplitProject } from '../data/replitData';

interface ReplitHomeBlocksProps {
  onBrowseProjects: () => void;
  onExploreOpportunities: () => void;
  onSelectProject: (project: ReplitProject) => void;
}

export const ReplitCommunityBar: React.FC = () => {
  return (
    <div className="bg-[#EAF6FC] py-6 border-y border-[#D0E7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <span className="text-[11px] font-bold text-[#159FE3] uppercase tracking-[0.2em] font-mono">
          A growing community across
        </span>
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm font-bold text-[#102B4E]">
          <span>South Africa</span>
          <span>Uganda</span>
          <span>Austria</span>
          <span>Germany</span>
        </div>
      </div>
    </div>
  );
};

export const ReplitSequence: React.FC = () => {
  const steps = [
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
    <section className="py-20 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
              How change takes shape
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight leading-tight">
              A simple sequence.<br />A world of possibility.
            </h2>
          </div>
          <div className="lg:col-span-4 text-sm sm:text-base text-[#415D7E] leading-relaxed">
            We start with people. The right connections turn a shared question into something everyone can learn from.
          </div>
        </div>

        {/* 4 Steps Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#D0E7F5]">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-6 sm:p-8 flex flex-col justify-between ${
                idx < 3 ? 'lg:border-r border-[#D0E7F5]' : ''
              } ${idx % 2 === 0 ? 'md:border-r lg:border-r-0' : ''} border-b md:border-b-0 border-[#D0E7F5]`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#415D7E] font-mono">
                    The Sequence
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#EAF6FC] text-[#159FE3] font-bold text-xs flex items-center justify-center">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#102B4E] mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#415D7E] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export const ReplitMetricBanner: React.FC = () => {
  return (
    <section className="py-6 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102B4E] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#FFC94A] tracking-tight tabular-nums">
                  200+
                </div>
                <div className="text-xs text-slate-300 mt-2 font-medium">
                  students engaged since 2024
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#FFC94A] tracking-tight tabular-nums">
                  20+
                </div>
                <div className="text-xs text-slate-300 mt-2 font-medium">
                  completed projects
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#FFC94A] tracking-tight tabular-nums">
                  5+
                </div>
                <div className="text-xs text-slate-300 mt-2 font-medium">
                  universities in South Africa &amp; Uganda
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:border-l border-white/15 lg:pl-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Including Stellenbosch University and Makerere University. Partner institutions in Austria and Germany include MCI Innsbruck.
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export const ReplitHomeProjectsPreview: React.FC<ReplitHomeBlocksProps> = ({
  onBrowseProjects,
  onSelectProject,
}) => {
  const featured = REPLIT_PROJECTS.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-2 font-mono">
              A first look
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102B4E] tracking-tight">
              Projects start with a good question.
            </h2>
          </div>
          <button
            onClick={onBrowseProjects}
            className="self-start sm:self-auto px-6 py-2.5 rounded-full bg-white hover:bg-[#EAF6FC] text-[#102B4E] text-xs font-bold border border-[#159FE3]/30 shadow-xs transition-all flex items-center gap-2 group"
          >
            <span>Browse the repository</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159FE3] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Verified Ecosystem Banner */}
        <div className="bg-[#EAF6FC] border border-[#D0E7F5] rounded-2xl p-4 sm:p-5 flex items-start gap-3 mb-8">
          <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
          <div className="text-xs text-[#102B4E] leading-relaxed">
            <strong>Verified project archive.</strong> Real student engineering solutions, cross-border COIL coursework, and field pilots co-created with partner universities and communities across South Africa, Uganda, Kenya, Austria, and Germany.
          </div>
        </div>

        {/* 4 Featured Real Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featured.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-3xl overflow-hidden border border-[#D0E7F5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              {project.image && (
                <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#102B4E] font-mono shadow-sm">
                    {project.recordStatus}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#102B4E]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium">
                    {project.countries}
                  </div>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1 justify-between">
                <div>
                  {!project.image && (
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-[10px] font-bold text-[#159FE3] bg-[#EAF6FC] border border-[#D0E7F5] px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                        {project.recordStatus}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#159FE3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-[#102B4E] group-hover:text-[#159FE3] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#415D7E] leading-relaxed mb-5">
                    {project.lead}
                  </p>

                  {/* Impact preview */}
                  {project.impactMetrics && project.impactMetrics.length > 0 && (
                    <div className="bg-[#EAF6FC] rounded-xl p-3 border border-[#D0E7F5] mb-5 flex items-center justify-between">
                      <span className="text-xs text-[#415D7E] font-medium">
                        {project.impactMetrics[0].label}:
                      </span>
                      <span className="text-sm font-bold text-[#159FE3]">
                        {project.impactMetrics[0].value}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs bg-[#EAF6FC] text-[#102B4E] px-3 py-1 rounded-lg font-medium border border-[#D0E7F5]">
                      {project.focusArea}
                    </span>
                    <span className="text-xs bg-[#EAF6FC] text-[#102B4E] px-3 py-1 rounded-lg font-medium border border-[#D0E7F5]">
                      Class of {project.year}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2EEF5] flex items-center justify-between text-xs text-[#415D7E]">
                  <span className="font-mono text-[11px]">{project.projectType}</span>
                  <span className="font-bold text-[#159FE3] group-hover:text-[#0E80B8] flex items-center gap-1">
                    <span>Explore project dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-[#EAF6FC] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#D0E7F5]">
          <div>
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-1 font-mono">
              The ecosystem is growing
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E]">
              Bring your curiosity. Find your people.
            </h3>
            <p className="text-xs sm:text-sm text-[#415D7E] mt-1">
              See the kinds of opportunities we are exploring together.
            </p>
          </div>

          <button
            onClick={onBrowseProjects}
            className="px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2 shrink-0"
          >
            <span>View opportunity examples</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
          </button>
        </div>

      </div>
    </section>
  );
};

export const ReplitPillarsSection: React.FC<{
  onNavigateToPurpose: () => void;
  onNavigateToPeople: () => void;
  onNavigateToPartnership: () => void;
}> = ({ onNavigateToPurpose, onNavigateToPeople, onNavigateToPartnership }) => {
  return (
    <section className="py-20 bg-white border-y border-[#D0E7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-2">
            The Three Consortium Anchors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Purpose. Mission. Position.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Derived directly from our founding constitution across Austria, Germany, South Africa, and Uganda, our framework guarantees non-extractive, mutual knowledge exchange.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Purpose */}
          <div className="bg-[#F8F6F0] rounded-3xl p-8 border border-[#D0E7F5] flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] text-[#159FE3] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-2">
                Pillar 01 · Purpose
              </div>
              <h3 className="text-xl font-bold text-[#102B4E] mb-3 group-hover:text-[#159FE3] transition-colors">
                Build lasting bridges between continents.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect people, institutions, and ideas across Africa and Europe through rigorous, project-based collaboration that delivers practical outcomes rather than theoretical declarations.
              </p>
            </div>
            <button
              onClick={onNavigateToPurpose}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#102B4E] hover:text-[#159FE3] group/btn"
            >
              <span>Explore Purpose &amp; Scope</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#159FE3] group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Mission */}
          <div className="bg-[#EAF6FC] rounded-3xl p-8 border border-[#D0E7F5] flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#102B4E] flex items-center justify-center mb-6 shadow-2xs">
                <Compass className="w-6 h-6 text-[#159FE3]" />
              </div>
              <div className="text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-2">
                Pillar 02 · Mission
              </div>
              <h3 className="text-xl font-bold text-[#102B4E] mb-3 group-hover:text-[#159FE3] transition-colors">
                Enable students as Global Citizens.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empower African and European students, faculty, and industry partners to cultivate the 5 Stahl/Hillmer competences through real-world challenges addressing local community needs.
              </p>
            </div>
            <button
              onClick={onNavigateToPeople}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#102B4E] hover:text-[#159FE3] group/btn"
            >
              <span>Meet the People &amp; Learning Model</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#159FE3] group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Position */}
          <div className="bg-[#102B4E] rounded-3xl p-8 text-white flex flex-col justify-between shadow-sm group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#159FE3] text-white flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono font-bold text-[#FFC94A] uppercase tracking-wider mb-2">
                Pillar 03 · Position
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                A neutral non-profit orchestrator.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Operating as an Austrian non-profit association, we maintain academic rigor, transparent stewardship, and reciprocal value across universities, start-up hubs, and enterprise partners.
              </p>
            </div>
            <button
              onClick={onNavigateToPartnership}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#FFC94A] hover:text-white group/btn"
            >
              <span>View Governance &amp; Membership</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFC94A] group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

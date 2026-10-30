import React, { useState, useMemo } from 'react';
import { Opportunity, OpportunityPhase } from '../types';
import { filterOpportunities } from '../utils/filterAndStats';
import { 
  Briefcase, 
  Sparkles, 
  Clock, 
  Users, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  ArrowUpRight,
  Search,
  Building2,
  Calendar,
  Award,
  Filter,
  RotateCcw
} from 'lucide-react';

interface OpportunitiesSectionProps {
  opportunities: Opportunity[];
  onOpenSubmitProposalModal: () => void;
  onApplyForOpportunity: (opportunity: Opportunity) => void;
}

const THEMES = [
  'All',
  'AgriTech & Food Security',
  'CleanTech & Energy',
  'Circular Economy & Water',
  'Health & Life Sciences',
  'Digital Economy & FinTech',
  'Education & Social Impact',
];

const PHASES: (OpportunityPhase | 'All')[] = [
  'All',
  'Opportunity',
  'Assignment',
  'Template',
  'Idea',
];

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  opportunities,
  onOpenSubmitProposalModal,
  onApplyForOpportunity,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [selectedPhase, setSelectedPhase] = useState<OpportunityPhase | 'All'>('All');
  const [selectedOrgType, setSelectedOrgType] = useState<'All' | 'business' | 'university' | 'ngo'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpportunities = useMemo(() => {
    return filterOpportunities(opportunities, {
      theme: selectedTheme,
      phase: selectedPhase,
      orgType: selectedOrgType,
      searchQuery,
    });
  }, [opportunities, selectedTheme, selectedPhase, selectedOrgType, searchQuery]);

  const pipelineStages: { step: string; phase: OpportunityPhase; name: string; desc: string }[] = [
    { step: '01', phase: 'Idea', name: 'Idea', desc: 'Submitted by student, faculty, or enterprise challenge sponsor' },
    { step: '02', phase: 'Template', name: 'Template', desc: 'Framed into academic learning objectives & verified scope' },
    { step: '03', phase: 'Assignment', name: 'Assignment', desc: 'Integrated into cross-border COIL university coursework' },
    { step: '04', phase: 'Opportunity', name: 'Opportunity', desc: 'Published for student associates across Africa & Europe to apply' },
    { step: '05', phase: 'Active Project', name: 'Active Project', desc: 'Formed cross-border team with faculty & industry mentors' },
  ];

  const handleResetFilters = () => {
    setSelectedTheme('All');
    setSelectedPhase('All');
    setSelectedOrgType('All');
    setSearchQuery('');
  };

  const isFiltered = selectedTheme !== 'All' || selectedPhase !== 'All' || selectedOrgType !== 'All' || searchQuery.trim() !== '';

  return (
    <section id="opportunities" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-100/70 border border-sky-200/60 px-3 py-1 rounded-full mb-3">
              <Briefcase className="w-3.5 h-3.5 text-sky-600" />
              <span>Cross-Continental Project Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Real Opportunities &amp; Challenges
            </h2>
            <p className="text-slate-600 mt-2 text-base max-w-2xl leading-relaxed">
              Explore authentic cross-border challenge statements sponsored by universities, African enterprises, and European development partners. Apply as a student associate to form your team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSubmitProposalModal}
              className="px-5 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <PlusCircle className="w-4 h-4 text-sky-400" />
              <span>Propose a Challenge / Brief</span>
            </button>
          </div>
        </div>

        {/* 5-Step Opportunity-to-Project Lifecycle Visualizer with Interactive Filtering */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>The Proven Opportunity-to-Project Lifecycle (Click to filter)</span>
            </div>
            <span className="text-xs text-slate-500">
              Moving ideas into structured assignments, opportunities, and verified projects
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {pipelineStages.map((stage, idx) => {
              const isSelected = selectedPhase === stage.phase;
              return (
                <button
                  key={stage.step}
                  onClick={() => {
                    if (stage.phase === 'Active Project') {
                      // Scroll to projects section
                      const elem = document.getElementById('projects');
                      elem?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setSelectedPhase(selectedPhase === stage.phase ? 'All' : stage.phase);
                    }
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 shadow-sm shadow-sky-500/10 ring-2 ring-sky-500/20'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold tabular-nums ${isSelected ? 'text-sky-700' : 'text-sky-600'}`}>
                        Stage {stage.step}
                      </span>
                      {idx < 4 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden sm:block group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                      {stage.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug">
                      {stage.desc}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="mt-3 text-[10px] font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-sky-600" />
                      <span>Filtered View</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Theme Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {THEMES.map((theme) => {
              const isActive = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/20'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>

          {/* Search & Secondary Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search challenges by keyword, partner, or skills sought..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Lifecycle Phase Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value as OpportunityPhase | 'All')}
                className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="All">All Pipeline Stages</option>
                <option value="Opportunity">Stage 4: Opportunity (Open)</option>
                <option value="Assignment">Stage 3: Assignment (COIL)</option>
                <option value="Template">Stage 2: Template (Scoped)</option>
                <option value="Idea">Stage 1: Idea (Intake)</option>
              </select>
            </div>

            {/* Org Type Filter */}
            <div className="sm:col-span-2">
              <select
                value={selectedOrgType}
                onChange={(e) => setSelectedOrgType(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="All">All Partners</option>
                <option value="business">Enterprise &amp; Startups</option>
                <option value="university">Universities &amp; Labs</option>
                <option value="ngo">NGOs &amp; Development</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-1">
              <button
                onClick={handleResetFilters}
                disabled={!isFiltered}
                title="Reset all filters"
                className={`w-full py-2.5 flex items-center justify-center rounded-xl border transition-colors ${
                  isFiltered
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300'
                    : 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                }`}
                aria-label="Reset all opportunity filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Live Opportunities Cards Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold truncate">
                      <span>{opp.theme}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-500 font-normal truncate">{opp.country}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60">
                        {opp.phase}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        {opp.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug mb-2">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {opp.description}
                  </p>

                  {/* Sponsoring Org & Universities */}
                  <div className="text-xs text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4 space-y-1.5">
                    <div className="flex items-start gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700">Sponsor: </span>
                        <span>{opp.organization}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700">Target Hubs: </span>
                        <span>{opp.targetUniversities.join(', ')}</span>
                      </div>
                    </div>
                    {opp.stipendOrCredits && (
                      <div className="flex items-start gap-2 text-sky-800">
                        <Award className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Benefits: </span>
                          <span>{opp.stipendOrCredits}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Required Skills */}
                  <div className="mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Skills Sought:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Details and Apply Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Duration: <strong className="text-slate-700">{opp.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Team Size: <strong className="text-slate-700">{opp.teamSize} Associates</strong> ({opp.applicationsCount} applied)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Deadline: {opp.deadline}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyForOpportunity(opp)}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <span>Apply for Team</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-4 border border-slate-200">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No matching opportunities found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
              No challenges match your selected filters. Try clearing your search keyword or switching the pipeline stage.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-sm transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  GraduationCap, 
  PlusCircle, 
  X,
  AlertCircle,
  ArrowRight,
  Search,
  RotateCcw
} from 'lucide-react';
import { REPLIT_OPPORTUNITIES, ReplitOpportunity } from '../data/replitData';

interface ReplitOpportunitiesProps {
  opportunities?: ReplitOpportunity[];
  onNavigateToContact?: () => void;
  onOpportunityUpdated?: (updated: ReplitOpportunity[]) => void;
}

export const ReplitOpportunities: React.FC<ReplitOpportunitiesProps> = ({
  opportunities: propOpportunities,
  onNavigateToContact,
  onOpportunityUpdated
}) => {
  const [localOpportunities, setLocalOpportunities] = useState<ReplitOpportunity[]>(
    propOpportunities || REPLIT_OPPORTUNITIES
  );

  // Sync if prop changes
  React.useEffect(() => {
    if (propOpportunities) {
      setLocalOpportunities(propOpportunities);
    }
  }, [propOpportunities]);

  const opportunities = propOpportunities || localOpportunities;
  const setOpportunities = (updater: React.SetStateAction<ReplitOpportunity[]>) => {
    if (typeof updater === 'function') {
      const next = updater(opportunities);
      setLocalOpportunities(next);
      if (onOpportunityUpdated) onOpportunityUpdated(next);
    } else {
      setLocalOpportunities(updater);
      if (onOpportunityUpdated) onOpportunityUpdated(updater);
    }
  };

  const [selectedOpportunity, setSelectedOpportunity] = useState<ReplitOpportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Application form state
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    university: 'Stellenbosch University',
    country: 'South Africa',
    skills: '',
    motivation: '',
  });
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [appErrors, setAppErrors] = useState<Record<string, string>>({});

  // Proposal form state
  const [proposalForm, setProposalForm] = useState({
    title: '',
    organization: '',
    focusArea: 'Agribusiness',
    location: 'South Africa · Hybrid',
    description: '',
    contactEmail: '',
  });
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [proposalErrors, setProposalErrors] = useState<Record<string, string>>({});

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      if (selectedFocus !== 'All' && opp.focusArea !== selectedFocus) return false;
      if (selectedLocation !== 'All' && !opp.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = opp.title.toLowerCase().includes(q);
        const inDesc = opp.description.toLowerCase().includes(q);
        const inPartner = opp.partnerScope.toLowerCase().includes(q);
        const inSkills = opp.soughtSkills.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inPartner && !inSkills) return false;
      }
      return true;
    });
  }, [opportunities, selectedFocus, selectedLocation, searchQuery]);

  const handleOpenApply = (opp: ReplitOpportunity) => {
    setSelectedOpportunity(opp);
    setIsApplyModalOpen(true);
    setAppSubmitted(false);
    setAppErrors({});
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!appForm.name.trim()) errors.name = 'Full name is required';
    if (!appForm.email.trim() || !/^\S+@\S+\.\S+$/.test(appForm.email)) {
      errors.email = 'Valid email is required';
    }
    if (!appForm.motivation.trim() || appForm.motivation.length < 15) {
      errors.motivation = 'Please share your motivation (minimum 15 characters)';
    }

    if (Object.keys(errors).length > 0) {
      setAppErrors(errors);
      return;
    }

    setAppSubmitted(true);
    // Increment applicant count on the opportunity
    if (selectedOpportunity) {
      setOpportunities((prev) =>
        prev.map((o) =>
          o.id === selectedOpportunity.id
            ? { ...o, applicantsCount: o.applicantsCount + 1 }
            : o
        )
      );
    }
  };

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!proposalForm.title.trim()) errors.title = 'Title is required';
    if (!proposalForm.organization.trim()) errors.organization = 'Organization name is required';
    if (!proposalForm.contactEmail.trim() || !/^\S+@\S+\.\S+$/.test(proposalForm.contactEmail)) {
      errors.contactEmail = 'Valid contact email is required';
    }
    if (!proposalForm.description.trim() || proposalForm.description.length < 20) {
      errors.description = 'Please describe the challenge (minimum 20 characters)';
    }

    if (Object.keys(errors).length > 0) {
      setProposalErrors(errors);
      return;
    }

    // Add new opportunity
    const newOpp: ReplitOpportunity = {
      id: `opp-${Date.now()}`,
      slug: proposalForm.title.toLowerCase().replace(/\s+/g, '-'),
      title: proposalForm.title,
      description: proposalForm.description,
      focusArea: proposalForm.focusArea,
      location: proposalForm.location,
      communityType: 'Enterprise / Faculty Sponsored',
      status: 'Open for Applications',
      deadline: '2026-12-31',
      cohortDuration: '12 Weeks Cohort',
      creditsOrStipend: 'ECTS Credits + Mentorship',
      teamSize: '4 Student Associates',
      soughtSkills: ['Multidisciplinary COIL Team', 'Domain Engineering'],
      partnerScope: proposalForm.organization,
      expectedQuestion: proposalForm.description,
      applicantsCount: 0,
    };

    setOpportunities([newOpp, ...opportunities]);
    setProposalSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          <div className="md:col-span-8">
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
              Explore a shared possibility
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Opportunities begin with people.
            </h1>
            <p className="text-base sm:text-lg text-[#415D7E] max-w-2xl leading-relaxed">
              Real collaborative challenges sponsored by partner universities, businesses, and development organizations seeking cross-border student teams.
            </p>
          </div>

          {/* Right Action & Orbital Graphic */}
          <div className="md:col-span-4 flex flex-col items-end gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#159FE3]/50 p-2 flex items-center justify-center relative">
              <div className="w-full h-full rounded-full border border-dashed border-[#102B4E]" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FFC94A]" />
            </div>

            <div className="flex flex-col sm:flex-row items-end gap-2">
              <a
                href="#/contact"
                className="px-4 py-2.5 rounded-full border border-[#159FE3]/30 bg-white hover:bg-[#EAF6FC] text-[#102B4E] text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Submit via Intake Portal</span>
              </a>
              <button
                onClick={() => {
                  setIsProposeModalOpen(true);
                  setProposalSubmitted(false);
                  setProposalErrors({});
                }}
                className="px-5 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-[#FFC94A]" />
                <span>Quick Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="bg-[#EAF6FC]/60 p-3 sm:p-4 rounded-2xl border border-[#D0E7F5] mb-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#415D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search challenges by keyword, partner, or skills sought..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] placeholder-[#8EA5BC] focus:outline-none focus:ring-2 focus:ring-[#159FE3] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Focus Area Select */}
            <div className="sm:col-span-3">
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-[#D0E7F5] rounded-xl text-xs text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3] cursor-pointer"
              >
                <option value="All">All focus areas</option>
                <option value="Agribusiness">Agribusiness</option>
                <option value="Clean energy">Clean energy</option>
                <option value="Circular economy">Circular economy</option>
                <option value="Health systems">Health systems</option>
                <option value="Digital inclusion">Digital inclusion</option>
                <option value="Climate education">Climate education</option>
              </select>
            </div>

            {/* Country / Location Select */}
            <div className="sm:col-span-2">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-[#D0E7F5] rounded-xl text-xs text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3] cursor-pointer"
              >
                <option value="All">All locations</option>
                <option value="South Africa">South Africa</option>
                <option value="Uganda">Uganda</option>
                <option value="Kenya">Kenya</option>
                <option value="Austria">Austria</option>
                <option value="Tanzania">Tanzania</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-1">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFocus('All');
                  setSelectedLocation('All');
                }}
                disabled={!searchQuery && selectedFocus === 'All' && selectedLocation === 'All'}
                title="Reset filters"
                className="w-full py-2.5 flex items-center justify-center rounded-xl bg-white border border-[#D0E7F5] text-[#415D7E] hover:text-[#102B4E] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Sub-header info */}
        <div className="flex items-center justify-between text-xs text-[#415D7E] mb-6 font-mono">
          <span>{filteredOpportunities.length} open collaborative opportunities</span>
          <span>Intercontinental team selection active</span>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D0E7F5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] font-bold text-[#159FE3] bg-[#EAF6FC] border border-[#D0E7F5] px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                    {opp.status}
                  </span>
                  <span className="text-xs font-mono text-[#159FE3] font-bold">
                    {opp.applicantsCount} Applicants
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#102B4E] group-hover:text-[#159FE3] transition-colors mb-3">
                  {opp.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#415D7E] leading-relaxed mb-5">
                  {opp.description}
                </p>

                {/* Scope & Partner info */}
                <div className="bg-[#EAF6FC] p-3.5 rounded-2xl border border-[#D0E7F5] mb-5 space-y-1.5 text-xs text-[#102B4E]">
                  <div>
                    <span className="font-bold text-[#415D7E] uppercase text-[10px] font-mono mr-1">Partner / Sponsoring Hub:</span>
                    <span>{opp.partnerScope}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#415D7E] uppercase text-[10px] font-mono mr-1">Duration &amp; Credits:</span>
                    <span>{opp.cohortDuration} · {opp.creditsOrStipend}</span>
                  </div>
                </div>

                {/* Sought Skills */}
                <div className="mb-5">
                  <div className="text-[10px] font-bold text-[#415D7E] uppercase font-mono tracking-wider mb-2">
                    Skills Sought:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.soughtSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#EAF6FC] text-[#102B4E] px-2.5 py-0.5 rounded-md font-medium border border-[#D0E7F5]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Apply Action */}
              <div className="pt-4 border-t border-[#E2EEF5] flex items-center justify-between">
                <span className="text-xs text-[#415D7E] font-mono">
                  Deadline: {opp.deadline}
                </span>

                <button
                  onClick={() => handleOpenApply(opp)}
                  className="px-5 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Apply for Team</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Real interest banner */}
        <div className="bg-[#EAF6FC] rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-[#102B4E] mb-2">
              Real interest deserves a real conversation.
            </h3>
            <p className="text-xs sm:text-sm text-[#415D7E] leading-relaxed">
              If you are a student, faculty member, business partner, or development organization with a question worth working on together across Africa and Europe, join an active cohort.
            </p>
          </div>
          <button
            onClick={() => {
              setIsProposeModalOpen(true);
              setProposalSubmitted(false);
            }}
            className="px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shrink-0 shadow-sm transition-all"
          >
            Submit Challenge Statement
          </button>
        </div>

        {/* Apply for Team Modal */}
        {isApplyModalOpen && selectedOpportunity && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5DFD5] my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider font-mono mb-2 inline-block">
                Team Application
              </span>

              <h2 className="text-2xl font-bold text-[#173D40] mb-1">
                Apply for: {selectedOpportunity.title}
              </h2>
              <p className="text-xs text-[#4F6868] mb-6">
                Cohort Duration: {selectedOpportunity.cohortDuration} · Sponsoring Hub: {selectedOpportunity.partnerScope}
              </p>

              {appSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-950">
                    Application Successfully Submitted!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{appForm.name}</strong>. Your profile has been queued for faculty review. A confirmation has been sent to <strong>{appForm.email}</strong>.
                  </p>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#0D6E66] rounded-full mt-2"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vanessa Nakato"
                      value={appForm.name}
                      onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                    />
                    {appErrors.name && (
                      <p className="text-[11px] text-rose-500 mt-1">{appErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                        Academic / University Email *
                      </label>
                      <input
                        type="email"
                        placeholder="student@sun.ac.za"
                        value={appForm.email}
                        onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                      />
                      {appErrors.email && (
                        <p className="text-[11px] text-rose-500 mt-1">{appErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                        University Institution *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Stellenbosch, Makerere, MCI..."
                        value={appForm.university}
                        onChange={(e) => setAppForm({ ...appForm, university: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                      Relevant Skills &amp; Technical Capabilities
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Python, CAD, Embedded C++, Agronomy, GIS"
                      value={appForm.skills}
                      onChange={(e) => setAppForm({ ...appForm, skills: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                      Statement of Motivation *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Why are you eager to tackle this specific challenge with European and African peers?"
                      value={appForm.motivation}
                      onChange={(e) => setAppForm({ ...appForm, motivation: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                    />
                    {appErrors.motivation && (
                      <p className="text-[11px] text-rose-500 mt-1">{appErrors.motivation}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5DFD5]">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#4F6868]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-[#102B4E] hover:bg-[#0C223E] rounded-full shadow-sm"
                    >
                      Submit Team Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Propose a Challenge Modal */}
        {isProposeModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5DFD5] my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsProposeModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-bold text-[#7A4B02] bg-[#FEF3C7] px-2.5 py-1 rounded-md uppercase tracking-wider font-mono mb-2 inline-block">
                Ecosystem Intake
              </span>

              <h2 className="text-2xl font-bold text-[#173D40] mb-1">
                Propose an Industrial / Research Challenge
              </h2>
              <p className="text-xs text-[#4F6868] mb-6">
                Connect your organization's engineering or sustainability challenge with an intercontinental student team.
              </p>

              {proposalSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-950">
                    Challenge Added to Pipeline!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    Your challenge has been published to the active opportunity board. Transformation Africa university coordinators will review syllabus integration.
                  </p>
                  <button
                    onClick={() => setIsProposeModalOpen(false)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#0D6E66] rounded-full mt-2"
                  >
                    View in Pipeline
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProposeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                      Challenge Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Decentralized Solar Desalination in Rural Arid Zones"
                      value={proposalForm.title}
                      onChange={(e) => setProposalForm({ ...proposalForm, title: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                    />
                    {proposalErrors.title && (
                      <p className="text-[11px] text-rose-500 mt-1">{proposalErrors.title}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                        Sponsoring Entity / Faculty *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tyrolean Innovation Fund"
                        value={proposalForm.organization}
                        onChange={(e) => setProposalForm({ ...proposalForm, organization: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                      />
                      {proposalErrors.organization && (
                        <p className="text-[11px] text-rose-500 mt-1">{proposalErrors.organization}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                        Official Contact Email *
                      </label>
                      <input
                        type="email"
                        placeholder="contact@entity.org"
                        value={proposalForm.contactEmail}
                        onChange={(e) => setProposalForm({ ...proposalForm, contactEmail: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                      />
                      {proposalErrors.contactEmail && (
                        <p className="text-[11px] text-rose-500 mt-1">{proposalErrors.contactEmail}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                        Focus Domain
                      </label>
                      <select
                        value={proposalForm.focusArea}
                        onChange={(e) => setProposalForm({ ...proposalForm, focusArea: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                      >
                        <option value="Agribusiness">Agribusiness</option>
                        <option value="Health systems">Health systems</option>
                        <option value="Circular economy">Circular economy</option>
                        <option value="Clean energy">Clean energy</option>
                        <option value="Digital inclusion">Digital inclusion</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                        Target Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Uganda · Austria · Hybrid"
                        value={proposalForm.location}
                        onChange={(e) => setProposalForm({ ...proposalForm, location: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4F6868] uppercase font-mono mb-1">
                      Challenge Problem Statement *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the real-world operational bottleneck and why students can solve it..."
                      value={proposalForm.description}
                      onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-[#FBF8F4] border border-[#D5CDC2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D6E66]"
                    />
                    {proposalErrors.description && (
                      <p className="text-[11px] text-rose-500 mt-1">{proposalErrors.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5DFD5]">
                    <button
                      type="button"
                      onClick={() => setIsProposeModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#4F6868]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-[#102B4E] hover:bg-[#0C223E] rounded-full shadow-sm"
                    >
                      Publish Opportunity
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

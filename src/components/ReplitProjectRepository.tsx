import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, ArrowUpRight, ArrowRight, X, Award, MapPin } from 'lucide-react';
import { REPLIT_PROJECTS, ReplitProject } from '../data/replitData';

interface ReplitProjectRepositoryProps {
  onSelectProject: (project: ReplitProject) => void;
}

export const ReplitProjectRepository: React.FC<ReplitProjectRepositoryProps> = ({
  onSelectProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFocusArea, setSelectedFocusArea] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const focusAreas = [
    'All',
    'Agribusiness',
    'Health systems',
    'Circular economy',
    'Clean energy',
    'Digital inclusion',
    'Entrepreneurship',
    'Climate education',
  ];

  const locations = [
    'All',
    'South Africa',
    'Uganda',
    'Austria',
    'Germany',
    'Kenya',
  ];

  const filteredProjects = useMemo(() => {
    return REPLIT_PROJECTS.filter((proj) => {
      if (selectedFocusArea !== 'All' && proj.focusArea !== selectedFocusArea) {
        return false;
      }
      if (selectedLocation !== 'All') {
        const matchesCountry = proj.countries.toLowerCase().includes(selectedLocation.toLowerCase());
        if (!matchesCountry) return false;
      }
      if (selectedStatus !== 'All' && proj.recordStatus !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = proj.title.toLowerCase().includes(query);
        const inLead = proj.lead.toLowerCase().includes(query);
        const inFocus = proj.focusArea.toLowerCase().includes(query);
        const inLoc = proj.countries.toLowerCase().includes(query);
        const inNarrative = proj.narrative.toLowerCase().includes(query);
        const inUnis = proj.universities.some((u) => u.toLowerCase().includes(query));
        const inTeam = proj.teamMembers.some((t) => t.name.toLowerCase().includes(query) || t.role.toLowerCase().includes(query));
        if (!inTitle && !inLead && !inFocus && !inLoc && !inNarrative && !inUnis && !inTeam) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedFocusArea, selectedLocation, selectedStatus]);

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          <div className="md:col-span-8">
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
              Learning in motion
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Project repository
            </h1>
            <p className="text-base sm:text-lg text-[#415D7E] max-w-2xl leading-relaxed">
              Explore cross-border project records, the questions behind them, and the verified outcomes teams set out to create across Africa and Europe.
            </p>
          </div>

          {/* Right Orbital Graphic Decoration */}
          <div className="md:col-span-4 flex justify-end">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#159FE3]/50 p-2 flex items-center justify-center relative">
              <div className="w-full h-full rounded-full border border-dashed border-[#102B4E]" />
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#FFC94A] shadow-xs" />
            </div>
          </div>
        </div>

        {/* Real Ecosystem Notice Banner */}
        <div className="bg-[#EAF6FC] border border-[#D0E7F5] rounded-2xl p-4 sm:p-5 flex items-start gap-3 mb-8">
          <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
          <div className="text-xs text-[#102B4E] leading-relaxed">
            <strong>Real-world collaborative repository.</strong> Each project represents documented student engineering, COIL coursework, and field deployments facilitated by partner universities across South Africa, Uganda, Austria, and Germany.
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="bg-[#EAF6FC]/60 p-3 sm:p-4 rounded-2xl border border-[#D0E7F5] mb-8 space-y-3">
          
          {/* Top Row: Search + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Box */}
            <div className="sm:col-span-7 relative">
              <Search className="w-4 h-4 text-[#415D7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects, technologies, students, universities..."
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

            {/* Status Dropdown */}
            <div className="sm:col-span-5">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-[#D0E7F5] rounded-xl text-xs text-[#102B4E] font-semibold focus:outline-none focus:ring-2 focus:ring-[#159FE3] cursor-pointer"
              >
                <option value="All">All Project Statuses</option>
                <option value="Verified Case Study">Verified Case Studies (Completed)</option>
                <option value="Active Project">Active Student Projects</option>
                <option value="Pilot Phase">Pilot Sprints</option>
              </select>
            </div>

          </div>

          {/* Bottom Row: Focus Area + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Focus Area Dropdown */}
            <div className="sm:col-span-6">
              <select
                value={selectedFocusArea}
                onChange={(e) => setSelectedFocusArea(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-[#D0E7F5] rounded-xl text-xs text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3] cursor-pointer"
              >
                <option value="All">All focus areas</option>
                {focusAreas.filter((f) => f !== 'All').map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Locations Dropdown */}
            <div className="sm:col-span-6">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2.5 px-3 bg-white border border-[#D0E7F5] rounded-xl text-xs text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3] cursor-pointer"
              >
                <option value="All">All locations</option>
                {locations.filter((l) => l !== 'All').map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Counter Row */}
        <div className="flex items-center justify-between text-xs text-[#415D7E] mb-6 font-mono">
          <span>{filteredProjects.length} projects documented</span>
          <span>Validated cross-border teams</span>
        </div>

        {/* Cards Grid */}
        <div className="project-editorial-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white rounded-3xl border border-[#D0E7F5] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              {/* Optional Photo Header if project has image */}
              {project.image && (
                <div className="project-image-editorial relative w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-[#102B4E] shadow-sm uppercase font-mono">
                    {project.recordStatus}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#102B4E]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#FFC94A]" />
                    <span>{project.countries}</span>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {!project.image && (
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-[10px] font-bold text-[#159FE3] bg-[#EAF6FC] border border-[#D0E7F5] px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                        {project.recordStatus}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#159FE3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold text-[#102B4E] group-hover:text-[#159FE3] transition-colors mb-2.5 leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#415D7E] leading-relaxed mb-5">
                    {project.lead}
                  </p>

                  {/* Verified Impact Highlight */}
                  {project.impactMetrics && project.impactMetrics.length > 0 && (
                    <div className="bg-[#EAF6FC] rounded-2xl p-3.5 border border-[#D0E7F5] mb-5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#159FE3] font-mono">
                          {project.impactMetrics[0].label}
                        </div>
                        <div className="text-xs text-[#102B4E] font-medium line-clamp-1">
                          {project.impactMetrics[0].desc}
                        </div>
                      </div>
                      <div className="text-xl font-extrabold text-[#159FE3] tabular-nums shrink-0 ml-3">
                        {project.impactMetrics[0].value}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-[#EAF6FC] text-[#102B4E] px-3 py-1 rounded-lg font-medium border border-[#D0E7F5]">
                      {project.focusArea}
                    </span>
                    <span className="text-xs bg-[#EAF6FC] text-[#102B4E] px-3 py-1 rounded-lg font-medium border border-[#D0E7F5]">
                      {project.countries}
                    </span>
                    <span className="text-xs bg-[#EAF6FC] text-[#102B4E] px-3 py-1 rounded-lg font-medium border border-[#D0E7F5]">
                      {project.year}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2EEF5] flex items-center justify-between text-xs text-[#415D7E]">
                  <span className="font-mono text-[11px] truncate max-w-[60%]">
                    {project.universities.join(' & ')}
                  </span>
                  <span className="font-bold text-[#159FE3] group-hover:text-[#0E80B8] flex items-center gap-1 shrink-0">
                    <span>Explore dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

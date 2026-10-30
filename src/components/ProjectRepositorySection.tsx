import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory, ProjectStatus } from '../types';
import { filterProjects, ProjectFilterOptions } from '../utils/filterAndStats';
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  FolderGit2, 
  Layers, 
  CheckCircle2, 
  Users, 
  MapPin, 
  RotateCcw 
} from 'lucide-react';

interface ProjectRepositorySectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All',
  'AgriTech & Food Security',
  'CleanTech & Energy',
  'Health & Life Sciences',
  'Circular Economy & Water',
  'Digital Economy & FinTech',
  'Education & Social Impact',
];

export const ProjectRepositorySection: React.FC<ProjectRepositorySectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'All'>('All');
  const [selectedSdg, setSelectedSdg] = useState<number | 'All'>('All');

  // Filter options
  const filterOptions: ProjectFilterOptions = useMemo(
    () => ({
      category: selectedCategory,
      searchQuery,
      university: selectedUniversity,
      status: selectedStatus,
      sdg: selectedSdg,
    }),
    [selectedCategory, searchQuery, selectedUniversity, selectedStatus, selectedSdg]
  );

  const filteredProjects = useMemo(
    () => filterProjects(projects, filterOptions),
    [projects, filterOptions]
  );

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedUniversity('All');
    setSelectedStatus('All');
    setSelectedSdg('All');
  };

  const isFiltered =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    selectedUniversity !== 'All' ||
    selectedStatus !== 'All' ||
    selectedSdg !== 'All';

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-100/70 border border-sky-200/60 px-3 py-1 rounded-full mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Open-Access Student Innovation Repository</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Past &amp; Active Student Projects
            </h2>
            <p className="text-slate-600 mt-2 text-base max-w-2xl leading-relaxed">
              Explore documented engineering solutions, prototypes, and field research co-created by cross-border teams across Africa and Europe since 2024.
            </p>
          </div>

          <div className="text-sm text-slate-500 font-medium shrink-0">
            Showing <span className="font-bold text-slate-900 tabular-nums">{filteredProjects.length}</span> of{' '}
            <span className="font-bold text-slate-900 tabular-nums">{projects.length}</span> verified dossiers
          </div>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Category Tabs (Segmented Control per anti-slop guidelines) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input & Secondary Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by keywords, student name, university, or solution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* University Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">All Universities</option>
                <option value="Stellenbosch">Stellenbosch University (SA)</option>
                <option value="Makerere">Makerere University (Uganda)</option>
                <option value="MCI">MCI Innsbruck (Austria)</option>
                <option value="Munich">TU Munich (Germany)</option>
                <option value="Nairobi">University of Nairobi (Kenya)</option>
                <option value="Vienna">WU Vienna (Austria)</option>
                <option value="Cape Town">University of Cape Town (SA)</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="sm:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | 'All')}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pilot Phase">Pilot Phase</option>
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
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                }`}
                aria-label="Reset all search filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                {/* Card Thumbnail Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle top badge for Status */}
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 shadow-sm border border-white/60">
                    {project.status}
                  </div>

                  {/* University flags on bottom left */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>{project.countries.join(' · ')}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Quiet Metadata (zero-pill discipline) */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-slate-400 font-normal">Class of {project.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    {/* Primary Impact Highlight Stat Box */}
                    {project.impactMetrics.length > 0 && (
                      <div className="bg-sky-50/70 rounded-xl p-3 border border-sky-100 mb-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-400">
                            Verified Result
                          </div>
                          <div className="text-xs font-medium text-slate-700 line-clamp-1">
                            {project.impactMetrics[0].description}
                          </div>
                        </div>
                        <div className="text-base font-extrabold text-sky-700 tabular-nums shrink-0 ml-2">
                          {project.impactMetrics[0].value}
                        </div>
                      </div>
                    )}

                    {/* Universities and Student Team Row */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 truncate max-w-[65%]">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{project.team.length} Student Associates</span>
                      </div>

                      <div className="flex items-center gap-1 font-semibold text-sky-600 group-hover:text-sky-700 transition-colors shrink-0">
                        <span>View Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 mx-auto mb-4 border border-slate-200">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No matching projects found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
              We couldn't find any projects matching your current filter criteria. Try clearing your search keywords or resetting category filters.
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

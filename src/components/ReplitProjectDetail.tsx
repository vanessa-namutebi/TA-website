import React from 'react';
import { ArrowLeft, CheckCircle2, FileText, Users, GraduationCap, Award, MapPin } from 'lucide-react';
import { ReplitProject } from '../data/replitData';

interface ReplitProjectDetailProps {
  project: ReplitProject;
  onBack: () => void;
}

export const ReplitProjectDetail: React.FC<ReplitProjectDetailProps> = ({
  project,
  onBack,
}) => {
  const sequenceStages: ('Technology' | 'Relationships' | 'Projects' | 'Opportunities' | 'Impact')[] = [
    'Technology',
    'Relationships',
    'Projects',
    'Opportunities',
    'Impact',
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#159FE3] hover:text-[#0E80B8] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>All project records</span>
        </button>

        {/* Optional Project Hero Banner Image */}
        {project.image && (
          <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden mb-10 shadow-lg border border-[#D0E7F5]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102B4E]/95 via-[#102B4E]/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 font-mono text-[#FFC94A]">
                <span>{project.recordStatus}</span>
                <span>·</span>
                <span>{project.countries}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {project.title}
              </h2>
            </div>
          </div>
        )}

        {/* 2-Column Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Header info (if no image) */}
            {!project.image && (
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono mb-4 inline-block bg-[#EAF6FC] text-[#159FE3] border border-[#D0E7F5]">
                  {project.recordStatus}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
                  {project.title}
                </h1>

                <p className="text-base sm:text-lg text-[#415D7E] leading-relaxed max-w-2xl">
                  {project.lead}
                </p>
              </div>
            )}

            {/* Impact Metrics Grid */}
            {project.impactMetrics && project.impactMetrics.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#415D7E] font-mono mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#159FE3]" />
                  <span>Verified Quantitative Outcomes</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.impactMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 border border-[#D0E7F5] shadow-xs flex flex-col justify-between"
                    >
                      <div className="text-[10px] uppercase font-bold text-[#415D7E] font-mono mb-1">
                        {metric.label}
                      </div>
                      <div className="text-2xl font-extrabold text-[#159FE3] tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-[11px] text-[#415D7E] mt-1 leading-snug">
                        {metric.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Question & Narrative */}
            <div className="space-y-4">
              <div className="bg-[#EAF6FC] p-5 rounded-2xl border border-[#D0E7F5]">
                <span className="block text-[10px] font-bold text-[#159FE3] uppercase font-mono tracking-wider mb-1">
                  Central Inquiry Question:
                </span>
                <p className="text-base font-bold text-[#102B4E] leading-snug">
                  "{project.question}"
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[#102B4E] pt-2">
                Project Background &amp; Engineering Solution
              </h2>
              <p className="text-sm text-[#415D7E] leading-relaxed">
                {project.narrative}
              </p>
            </div>

            {/* Illustrative Outcome Section with 5 stages */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#102B4E]">
                Measurable Impact &amp; Results
              </h2>
              <p className="text-sm text-[#415D7E] leading-relaxed">
                {project.illustrativeOutcome}
              </p>

              {/* 5-Stage Sequence Pill Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 rounded-xl border border-[#D0E7F5] overflow-hidden text-xs text-center font-medium">
                {sequenceStages.map((stage) => {
                  const isActive = project.activeStage === stage;
                  return (
                    <div
                      key={stage}
                      className={`py-3 px-2 border-r border-[#D0E7F5] last:border-r-0 ${
                        isActive
                          ? 'bg-[#102B4E] text-white font-bold'
                          : 'bg-[#EAF6FC] text-[#102B4E]'
                      }`}
                    >
                      {stage}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cross-Continental Student Team */}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E2EEF5]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#415D7E] font-mono flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#159FE3]" />
                  <span>Student Associates Roster</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.teamMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white rounded-xl border border-[#D0E7F5] flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#102B4E] text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#102B4E] truncate">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-[#159FE3] font-medium truncate">
                          {member.role}
                        </div>
                        <div className="text-[10px] text-[#415D7E] truncate">
                          {member.university} ({member.country})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic & Industry Mentors */}
            {project.mentors && project.mentors.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#102B4E] uppercase tracking-wider font-mono block">
                  Faculty &amp; Industry Mentors:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.mentors.map((m, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 text-xs text-[#102B4E] bg-white border border-[#D0E7F5] px-3.5 py-2 rounded-xl shadow-2xs"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-[#159FE3]" />
                      <span className="font-bold">{m.name}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[#415D7E]">{m.role} ({m.organization})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables & Records */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E2EEF5]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#415D7E] font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#159FE3]" />
                  <span>Project Deliverables &amp; Records</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-white border border-[#D0E7F5] rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#102B4E] mb-1">
                          {del.name}
                        </div>
                        <div className="text-[10px] uppercase font-mono text-[#159FE3]">
                          {del.type}
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] font-medium text-[#415D7E] pt-2 border-t border-[#E2EEF5]">
                        {del.format}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: At a Glance Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#EAF6FC] rounded-3xl p-6 sm:p-8 border border-[#D0E7F5] sticky top-28 space-y-6">
              <h3 className="text-xl font-bold text-[#102B4E]">
                At a glance
              </h3>

              <div className="space-y-5 divide-y divide-[#D0E7F5] text-xs">
                
                <div className="pt-2 first:pt-0">
                  <span className="block text-[10px] font-bold text-[#415D7E] uppercase tracking-widest font-mono mb-1">
                    Focus Area
                  </span>
                  <span className="text-sm font-bold text-[#102B4E]">
                    {project.focusArea}
                  </span>
                </div>

                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-[#415D7E] uppercase tracking-widest font-mono mb-1">
                    Countries
                  </span>
                  <span className="text-sm font-bold text-[#102B4E]">
                    {project.countries}
                  </span>
                </div>

                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-[#415D7E] uppercase tracking-widest font-mono mb-1">
                    Year
                  </span>
                  <span className="text-sm font-bold text-[#102B4E]">
                    {project.year}
                  </span>
                </div>

                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-[#415D7E] uppercase tracking-widest font-mono mb-1">
                    Project Type
                  </span>
                  <span className="text-sm font-bold text-[#102B4E]">
                    {project.projectType}
                  </span>
                </div>

                <div className="pt-4">
                  <span className="block text-[10px] font-bold text-[#415D7E] uppercase tracking-widest font-mono mb-1">
                    Record Status
                  </span>
                  <span className="text-sm font-bold text-[#102B4E]">
                    {project.recordStatus}
                  </span>
                </div>

                {project.sdgs && project.sdgs.length > 0 && (
                  <div className="pt-4">
                    <span className="block text-[10px] font-bold text-[#415D7E] uppercase tracking-widest font-mono mb-2">
                      UN SDGs Addressed
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.sdgs.map((sdg) => (
                        <span
                          key={sdg}
                          className="px-2 py-0.5 rounded bg-white text-[#102B4E] font-bold text-[10px] border border-[#D0E7F5]"
                        >
                          SDG {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className="pt-4">
                <button
                  onClick={onBack}
                  className="w-full py-2.5 px-4 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-xs transition-all"
                >
                  Back to repository
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

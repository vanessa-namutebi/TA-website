import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  FileText, 
  Award,
  Globe,
  Share2,
  Check
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!project) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadDossier = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title & Tags */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-sky-200 font-semibold mb-2">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Year {project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300 font-bold">{project.status}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Key Impact Metrics Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-500" />
              <span>Verified Real-World Impact &amp; UN SDGs</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.impactMetrics.map((impact, idx) => (
                <div
                  key={idx}
                  className="bg-sky-50/60 rounded-2xl p-4 border border-sky-100 flex flex-col justify-between"
                >
                  <div className="text-xs font-semibold text-slate-600 mb-1">{impact.metric}</div>
                  <div className="text-2xl font-extrabold text-sky-700 tabular-nums">{impact.value}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">{impact.description}</div>
                </div>
              ))}
            </div>

            {/* UN SDGs */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Addressed SDGs:</span>
              {project.sdgs.map((sdg) => (
                <span
                  key={sdg.number}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>SDG {sdg.number}: {sdg.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>The Challenge Statement</span>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Engineered Solution</span>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Methodology & COIL International Collaboration */}
          <div className="border-t border-slate-100 pt-6">
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              Cross-Border Collaborative Methodology (COIL)
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {project.methodology}
            </p>
            <div className="mt-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <span className="font-semibold text-slate-700">Participating Universities: </span>
              {project.universities.join(' & ')} ({project.countries.join(', ')})
            </div>
          </div>

          {/* Team Composition & Mentors */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-500" />
              <span>Cross-Continental Student Team</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.team.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="truncate">{member.name}</span>
                      {member.isLead && (
                        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                          Team Lead
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{member.role}</div>
                    <div className="text-[11px] text-slate-400 truncate">{member.university} ({member.country})</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic & Industry Mentors */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-700 block mb-2">Faculty &amp; Industry Mentors:</span>
              <div className="flex flex-wrap gap-3">
                {project.mentors.map((m, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 text-xs text-slate-700 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{m.role} ({m.organization})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Deliverables & Artifacts */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-500" />
              <span>Project Deliverables &amp; Verified Artifacts</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((del, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 group hover:border-sky-300 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {del.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{del.description}</div>
                    {del.sizeOrLink && (
                      <div className="text-[11px] font-medium text-sky-600 mt-1">
                        Format: {del.sizeOrLink}
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-0.5 rounded bg-white border border-slate-200 shrink-0">
                    {del.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          {project.testimonials && project.testimonials.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <div className="bg-sky-50/70 rounded-2xl p-5 border border-sky-100">
                <p className="text-sm italic text-slate-700 leading-relaxed mb-3">
                  "{project.testimonials[0].quote}"
                </p>
                <div className="text-xs font-bold text-slate-900">
                  {project.testimonials[0].author}
                </div>
                <div className="text-xs text-slate-500">
                  {project.testimonials[0].role} · {project.testimonials[0].universityOrOrg}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Project'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadDossier}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Dossier Package Ready</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Project Dossier (PDF)</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-200/80 hover:bg-slate-300 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

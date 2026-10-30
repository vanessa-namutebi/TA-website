import React, { useState, useEffect } from 'react';
import { Opportunity } from '../types';
import { validateAssociateApplication, AssociateApplicationForm } from '../utils/filterAndStats';
import { X, CheckCircle2, AlertCircle, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

interface AssociateModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetOpportunity?: Opportunity | null;
}

export const AssociateModal: React.FC<AssociateModalProps> = ({
  isOpen,
  onClose,
  targetOpportunity,
}) => {
  const [formData, setFormData] = useState<Partial<AssociateApplicationForm>>({
    fullName: '',
    email: '',
    university: 'Stellenbosch University',
    country: 'South Africa',
    fieldOfStudy: '',
    skills: '',
    motivation: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAssociateApplication(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-associate-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 bg-slate-900 text-white flex items-start justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Student Associate Network</span>
            </div>
            <h2 id="modal-associate-title" className="text-xl sm:text-2xl font-extrabold text-white">
              {targetOpportunity ? 'Apply for Project Team' : 'Join Transformation Africa as Associate'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {targetOpportunity 
                ? `Applying for: ${targetOpportunity.title}` 
                : 'Connect with 200+ students across Africa & Europe on verified, high-impact projects.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Application Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Welcome to the Transformation Africa community, <strong className="text-slate-900">{formData.fullName}</strong>. A verification confirmation has been sent to <strong className="text-slate-800">{formData.email}</strong>. Our university coordinator will match your profile with upcoming COIL teams.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-all shadow-sm"
              >
                Close &amp; Explore Projects
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4 overflow-y-auto flex-1">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Vanessa Nakato"
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.fullName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Email & University */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Academic / Personal Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@university.ac.za"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  University / Hub *
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="e.g. Makerere University"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Country & Field of study */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Country *
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g. Uganda, South Africa, Austria, Germany..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Degree / Field of Study
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  placeholder="e.g. BSc Mechatronics, MBA, Public Health"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Core Skills &amp; Competencies
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g. Python, CAD, Solar PV, Agribusiness, UI/UX"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Motivation &amp; Relevant Experience *
              </label>
              <textarea
                rows={3}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="Why do you want to collaborate with international teams on real-world projects? Mention any past technical or community experience..."
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.motivation ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                }`}
              />
              {errors.motivation && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.motivation}</span>
                </p>
              )}
            </div>

            {/* Submit buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 rounded-xl shadow-md shadow-sky-500/25 transition-all flex items-center gap-2"
              >
                <span>Submit Associate Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

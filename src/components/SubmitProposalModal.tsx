import React, { useState } from 'react';
import { validateProjectSubmission, ProjectProposalForm } from '../utils/filterAndStats';
import { X, CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';

interface SubmitProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (proposal: ProjectProposalForm) => void;
}

export const SubmitProposalModal: React.FC<SubmitProposalModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<ProjectProposalForm>>({
    title: '',
    organization: '',
    orgType: 'business',
    contactEmail: '',
    theme: 'AgriTech & Food Security',
    targetUniversities: ['Stellenbosch University', 'MCI Innsbruck'],
    challengeDescription: '',
    expectedOutcomes: '',
    skillsNeeded: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateProjectSubmission(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    onSubmitSuccess(formData as ProjectProposalForm);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-proposal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Transformation Africa Project Intake</span>
            </div>
            <h2 id="modal-proposal-title" className="text-xl sm:text-2xl font-extrabold text-white">
              Propose a Project or Industrial Challenge
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-lg">
              Submit your challenge to mobilize a multidisciplinary student team across partner universities in Africa and Europe.
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
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Proposal Successfully Submitted!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for initiating this opportunity. The Transformation Africa academic coordination board will review your scope against current COIL curricula and contact you at <strong className="text-slate-800">{formData.contactEmail}</strong> within 3 business days.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-all shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Project / Challenge Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AI-Assisted Cold-Chain Monitoring for Rural Vaccine Clinics"
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.title ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            {/* Org Name & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Initiator / Organization Name *
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Tyrolean Energy Corp or Makerere Faculty"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.organization ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                  }`}
                />
                {errors.organization && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.organization}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Organization Type
                </label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value as any })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                >
                  <option value="business">Corporate / Business Enterprise</option>
                  <option value="university">University Faculty / Research Group</option>
                  <option value="ngo">NGO / Development Partner</option>
                </select>
              </div>
            </div>

            {/* Contact Email & Theme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Official Contact Email *
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@enterprise.com"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.contactEmail ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                  }`}
                />
                {errors.contactEmail && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.contactEmail}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Focus Domain Theme *
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                >
                  <option value="AgriTech & Food Security">AgriTech &amp; Food Security</option>
                  <option value="CleanTech & Energy">CleanTech &amp; Energy</option>
                  <option value="Health & Life Sciences">Health &amp; Life Sciences</option>
                  <option value="Circular Economy & Water">Circular Economy &amp; Water</option>
                  <option value="Digital Economy & FinTech">Digital Economy &amp; FinTech</option>
                  <option value="Education & Social Impact">Education &amp; Social Impact</option>
                </select>
              </div>
            </div>

            {/* Challenge Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Challenge Statement &amp; Context *
              </label>
              <textarea
                rows={3}
                value={formData.challengeDescription}
                onChange={(e) => setFormData({ ...formData, challengeDescription: e.target.value })}
                placeholder="Describe the real-world problem, current bottlenecks, and why a cross-border African-European student team is best suited to tackle it..."
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.challengeDescription ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-sky-500'
                }`}
              />
              {errors.challengeDescription && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.challengeDescription}</span>
                </p>
              )}
            </div>

            {/* Expected Outcomes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Desired Deliverables &amp; Outcomes
              </label>
              <input
                type="text"
                value={formData.expectedOutcomes}
                onChange={(e) => setFormData({ ...formData, expectedOutcomes: e.target.value })}
                placeholder="e.g. Working hardware prototype, CAD drawings, field pilot trial data"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
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
                <Send className="w-3.5 h-3.5" />
                <span>Submit Opportunity</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

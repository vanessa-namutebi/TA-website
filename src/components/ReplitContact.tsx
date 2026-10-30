import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Sparkles,
  RefreshCw,
  FileText,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { OrganizationProposal, convertProposalToOpportunity } from '../data/proposalData';
import { ReplitOpportunity } from '../data/replitData';

interface ReplitContactProps {
  proposals: OrganizationProposal[];
  onAddProposal: (newProposal: OrganizationProposal) => void;
  onApproveProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string, reason?: string) => void;
  onNavigateToOpportunities: () => void;
  initialMode?: 'intake' | 'admin' | 'general';
}

export const ReplitContact: React.FC<ReplitContactProps> = ({
  proposals,
  onAddProposal,
  onApproveProposal,
  onDeclineProposal,
  onNavigateToOpportunities,
  initialMode = 'intake'
}) => {
  const [activeTab, setActiveTab] = useState<'intake' | 'admin' | 'general'>(initialMode);
  const [adminStatusFilter, setAdminStatusFilter] = useState<'All' | 'Pending Review' | 'Approved' | 'Declined'>('All');

  // Organization Challenge Intake Form State
  const [form, setForm] = useState({
    organizationName: '',
    organizationType: 'Enterprise / Industry' as OrganizationProposal['organizationType'],
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    country: 'Uganda',
    focusArea: 'Agribusiness',
    challengeTitle: '',
    problemStatement: '',
    desiredOutcome: '',
    soughtSkills: 'IoT Sensors, Cloud Telemetry, Solar Sizing',
    estimatedCohortDuration: '12 Weeks Academic Cohort',
    resourceSupport: 'Cooperative provides field deployment sites, local testing crop batch, and mentorship access.'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // General Inquiry Form State
  const [generalForm, setGeneralForm] = useState({
    name: '',
    email: '',
    subject: 'Academic Co-creation Inquiry',
    institution: '',
    message: ''
  });
  const [generalSubmitted, setGeneralSubmitted] = useState(false);
  const [generalErrors, setGeneralErrors] = useState<Record<string, string>>({});

  // Toast notification for admin action
  const [adminToast, setAdminToast] = useState<{ message: string; showLink?: boolean } | null>(null);

  const pendingCount = proposals.filter((p) => p.status === 'Pending Review').length;
  const approvedCount = proposals.filter((p) => p.status === 'Approved').length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!form.organizationName.trim()) errors.organizationName = 'Organization name is required';
    if (!form.contactName.trim()) errors.contactName = 'Contact person is required';
    if (!form.contactEmail.trim() || !/^\S+@\S+\.\S+$/.test(form.contactEmail)) {
      errors.contactEmail = 'Valid official email address is required';
    }
    if (!form.challengeTitle.trim() || form.challengeTitle.length < 5) {
      errors.challengeTitle = 'Please provide a clear title for the challenge';
    }
    if (!form.problemStatement.trim() || form.problemStatement.length < 25) {
      errors.problemStatement = 'Please describe the problem in detail (minimum 25 characters)';
    }
    if (!form.desiredOutcome.trim() || form.desiredOutcome.length < 15) {
      errors.desiredOutcome = 'Please describe what deliverable or prototype you expect (min 15 chars)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const newId = `prop-${Date.now()}`;
    const newProposal: OrganizationProposal = {
      id: newId,
      submittedAt: new Date().toISOString(),
      organizationName: form.organizationName,
      organizationType: form.organizationType,
      contactName: form.contactName,
      contactRole: form.contactRole || 'Project Sponsor',
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      country: form.country,
      focusArea: form.focusArea,
      challengeTitle: form.challengeTitle,
      problemStatement: form.problemStatement,
      desiredOutcome: form.desiredOutcome,
      soughtSkills: form.soughtSkills.split(',').map((s) => s.trim()).filter(Boolean),
      estimatedCohortDuration: form.estimatedCohortDuration,
      resourceSupport: form.resourceSupport,
      status: 'Pending Review'
    };

    onAddProposal(newProposal);
    setSubmittedRefId(newId.replace('prop-', 'TA-'));
    setFormSubmitted(true);
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!generalForm.name.trim()) errors.name = 'Name is required';
    if (!generalForm.email.trim() || !/^\S+@\S+\.\S+$/.test(generalForm.email)) {
      errors.email = 'Valid email is required';
    }
    if (!generalForm.message.trim() || generalForm.message.length < 15) {
      errors.message = 'Please provide message details (minimum 15 characters)';
    }

    if (Object.keys(errors).length > 0) {
      setGeneralErrors(errors);
      return;
    }

    setGeneralSubmitted(true);
  };

  const triggerAdminApprove = (proposalId: string) => {
    onApproveProposal(proposalId);
    setAdminToast({
      message: 'Challenge approved and published to the Live Opportunities Board!',
      showLink: true
    });
    setTimeout(() => {
      setAdminToast(null);
    }, 6000);
  };

  const triggerAdminDecline = (proposalId: string) => {
    onDeclineProposal(proposalId, 'Does not meet current semester COIL syllabus criteria.');
    setAdminToast({
      message: 'Proposal status updated to Declined / Archived.',
      showLink: false
    });
    setTimeout(() => {
      setAdminToast(null);
    }, 4500);
  };

  const filteredProposals = proposals.filter((p) => {
    if (adminStatusFilter === 'All') return true;
    return p.status === adminStatusFilter;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Admin Toast */}
        {adminToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#102B4E] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#159FE3]/40 animate-in fade-in slide-in-from-bottom-2 max-w-md">
            <CheckCircle2 className="w-5 h-5 text-[#FFC94A] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">{adminToast.message}</p>
              {adminToast.showLink && (
                <button
                  onClick={onNavigateToOpportunities}
                  className="mt-1.5 text-[#159FE3] hover:text-white underline font-semibold flex items-center gap-1"
                >
                  <span>View on Live Opportunities Board</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => setAdminToast(null)}
              className="ml-auto text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
          <div className="md:col-span-8">
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
              Consortium Intake &amp; Coordination
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Reach out. Build together.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              When an organization has a real challenge or community opportunity, reach out through this intake portal. The Academic Consortium Board reviews each submission to match student cohorts and publish them to our live opportunities board.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3">
            <div className="inline-flex p-1.5 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5]">
              <button
                onClick={() => setActiveTab('intake')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'intake'
                    ? 'bg-[#102B4E] text-white shadow-xs'
                    : 'text-[#102B4E]/70 hover:text-[#102B4E]'
                }`}
              >
                Propose Challenge
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'admin'
                    ? 'bg-[#102B4E] text-white shadow-xs'
                    : 'text-[#102B4E]/70 hover:text-[#102B4E]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC94A]" />
                <span>Admin Review</span>
                {pendingCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#FFC94A] text-[#102B4E] text-[10px] font-mono flex items-center justify-center font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'general'
                    ? 'bg-[#102B4E] text-white shadow-xs'
                    : 'text-[#102B4E]/70 hover:text-[#102B4E]'
                }`}
              >
                Offices
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              Consortium Hubs: Uganda · South Africa · Austria · Germany
            </div>
          </div>
        </div>

        {/* WORKFLOW EXPLAINER BANNER (Shows how it works) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D0E7F5] shadow-xs mb-10">
          <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-3">
            How Organization Challenges Become Live Opportunities:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#102B4E] text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#102B4E] mb-1">
                  1. Organization Submits Challenge
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enterprises, municipalities, or farm cooperatives submit operational problems needing student engineering co-creation.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFC94A] text-[#102B4E] flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#102B4E] mb-1">
                  2. Consortium Admin Review
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Faculty leads from Makerere, Stellenbosch, and MCI verify credit alignment, student prerequisites, and ethical parameters.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#159FE3] text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#102B4E] mb-1">
                  3. Live Opportunity Published
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Approved challenges immediately appear on the Opportunities Board for European and African students to form teams.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* TAB 1: ORGANISATION CHALLENGE INTAKE */}
        {activeTab === 'intake' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Left Info Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#102B4E] text-white p-7 rounded-3xl shadow-sm space-y-4">
                <span className="text-[10px] font-bold text-[#FFC94A] uppercase tracking-wider font-mono">
                  Why Partner with Us?
                </span>
                <h3 className="text-2xl font-bold text-white leading-snug">
                  Get dedicated student engineering minds on your toughest problems.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Each selected challenge is matched with 4-5 accredited senior engineering, agribusiness, and design students supervised by senior professors across Europe and Africa.
                </p>
                <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3]" />
                    <span>Double-accredited ECTS university courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3]" />
                    <span>Open-source IP or shared licensing clarity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3]" />
                    <span>Physical field pilot deployments</span>
                  </div>
                </div>
              </div>

              {/* Fast-track test note for reviewers */}
              <div className="bg-[#EAF6FC] border border-[#D0E7F5] p-5 rounded-3xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#102B4E] mb-2 font-mono">
                  <Sparkles className="w-4 h-4 text-[#159FE3]" />
                  <span>Interactive Testing Guide:</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  1. Fill out and submit your challenge below.
                  <br />
                  2. Switch to <strong>Admin Review</strong> at the top to inspect and click <strong>"Approve &amp; Add to Opportunities Board"</strong>.
                  <br />
                  3. Verify it is live on the Opportunities page!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className="text-xs font-bold text-[#159FE3] hover:text-[#102B4E] underline flex items-center gap-1"
                >
                  <span>Open Admin Review Inbox ({pendingCount} pending)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Challenge Submission Form */}
            <div className="lg:col-span-8 bg-white p-7 sm:p-9 rounded-3xl border border-[#D0E7F5] shadow-xs">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#EAF6FC] text-[#159FE3] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="text-[11px] font-bold text-[#102B4E] bg-[#EAF6FC] px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                    Submission Queued · Ref: {submittedRefId}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E]">
                    Thank you, {form.contactName}!
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Your challenge <strong>"{form.challengeTitle}"</strong> for <strong>{form.organizationName}</strong> has been received by the Transformation Africa Consortium Admin Review Board.
                  </p>

                  <div className="bg-[#EAF6FC] p-5 rounded-2xl border border-[#D0E7F5] max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="text-[10px] font-mono uppercase text-[#102B4E] font-bold">
                      Intake Summary:
                    </div>
                    <div className="text-[#102B4E]">
                      <strong>Organization:</strong> {form.organizationName} ({form.country})
                    </div>
                    <div className="text-[#102B4E]">
                      <strong>Domain:</strong> {form.focusArea}
                    </div>
                    <div className="text-[#102B4E]">
                      <strong>Contact:</strong> {form.contactEmail}
                    </div>
                    <div className="text-[#159FE3] font-semibold pt-1">
                      Status: Pending Faculty Admin Evaluation
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button
                      onClick={() => setActiveTab('admin')}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#FFC94A]" />
                      <span>Review in Admin Inbox Now</span>
                    </button>

                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setForm({
                          organizationName: '',
                          organizationType: 'Enterprise / Industry',
                          contactName: '',
                          contactRole: '',
                          contactEmail: '',
                          contactPhone: '',
                          country: 'Uganda',
                          focusArea: 'Agribusiness',
                          challengeTitle: '',
                          problemStatement: '',
                          desiredOutcome: '',
                          soughtSkills: 'Embedded Firmware, Solar Sizing',
                          estimatedCohortDuration: '12 Weeks Academic Cohort',
                          resourceSupport: ''
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D0E7F5] text-[#102B4E] hover:bg-[#EAF6FC] text-xs font-bold transition-all"
                    >
                      Submit Another Challenge
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#159FE3] uppercase tracking-wider font-mono">
                      Step 1 of 2
                    </span>
                    <h2 className="text-2xl font-bold text-[#102B4E]">
                      Organization &amp; Partner Details
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      Who is bringing this challenge to the Euro-African student engineering network?
                    </p>
                  </div>

                  {/* Org Name & Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Organization / Enterprise Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kilimo Salama Solar Tech"
                        value={form.organizationName}
                        onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                      {formErrors.organizationName && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.organizationName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Organization Type
                      </label>
                      <select
                        value={form.organizationType}
                        onChange={(e) => setForm({ ...form, organizationType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      >
                        <option value="Enterprise / Industry">Enterprise / Industry</option>
                        <option value="Agricultural Cooperative">Agricultural Cooperative</option>
                        <option value="NGO / Development">NGO / Development</option>
                        <option value="Public Sector / Municipality">Public Sector / Municipality</option>
                        <option value="Research Institute">Research Institute</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Person & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Contact Person &amp; Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Janet Achieng (Head of R&D)"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                      {formErrors.contactName && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.contactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Official Work Email *
                      </label>
                      <input
                        type="email"
                        placeholder="janet@kilimosalama.org"
                        value={form.contactEmail}
                        onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                      {formErrors.contactEmail && (
                        <p className="text-[11px] text-rose-500 mt-1">{formErrors.contactEmail}</p>
                      )}
                    </div>
                  </div>

                  {/* Country & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Country / Primary Field Base *
                      </label>
                      <select
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      >
                        <option value="Uganda">Uganda</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Austria">Austria</option>
                        <option value="Germany">Germany</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Ghana">Ghana</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="+256 700 123 456"
                        value={form.contactPhone}
                        onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D0E7F5]">
                    <span className="text-[10px] font-bold text-[#159FE3] uppercase tracking-wider font-mono">
                      Step 2 of 2
                    </span>
                    <h2 className="text-2xl font-bold text-[#102B4E]">
                      Challenge Profile &amp; Desired Outcomes
                    </h2>
                    <p className="text-xs text-slate-600 mt-1">
                      What problem do you want our multidisciplinary student team to tackle?
                    </p>
                  </div>

                  {/* Focus Area & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Focus Domain *
                      </label>
                      <select
                        value={form.focusArea}
                        onChange={(e) => setForm({ ...form, focusArea: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      >
                        <option value="Agribusiness">Agribusiness &amp; Food Systems</option>
                        <option value="Clean energy">Clean energy &amp; Off-Grid Power</option>
                        <option value="Circular economy">Circular economy &amp; Waste Upcycling</option>
                        <option value="Health systems">Health systems &amp; Medical Devices</option>
                        <option value="Digital inclusion">Digital inclusion &amp; IoT Telemetry</option>
                        <option value="Climate education">Climate education &amp; Resilient Planning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Estimated Cohort Duration
                      </label>
                      <select
                        value={form.estimatedCohortDuration}
                        onChange={(e) => setForm({ ...form, estimatedCohortDuration: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] font-medium focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      >
                        <option value="12 Weeks Academic Cohort">12 Weeks (Full Semester COIL)</option>
                        <option value="8 Weeks Intensive Sprint">8 Weeks (Intensive Prototype Sprint)</option>
                        <option value="2-Week Field Intensive">2 Weeks (On-Site Field Pilot Intensive)</option>
                      </select>
                    </div>
                  </div>

                  {/* Challenge Title */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Challenge Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Decentralized Solar Evaporative Cooling for Peri-Urban Tomato Vendors"
                      value={form.challengeTitle}
                      onChange={(e) => setForm({ ...form, challengeTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                    {formErrors.challengeTitle && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.challengeTitle}</p>
                    )}
                  </div>

                  {/* Problem Statement */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Problem Statement &amp; Real-world Bottleneck *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Explain what is failing, who is affected, and why commercial off-the-shelf solutions are unviable or unaffordable in this context..."
                      value={form.problemStatement}
                      onChange={(e) => setForm({ ...form, problemStatement: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                    {formErrors.problemStatement && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.problemStatement}</p>
                    )}
                  </div>

                  {/* Desired Outcome */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Desired Prototype / Deliverable Outcome *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Physical bench prototype, open-source CAD drawings, validated chemical test data, or deployment manual..."
                      value={form.desiredOutcome}
                      onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                    {formErrors.desiredOutcome && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.desiredOutcome}</p>
                    )}
                  </div>

                  {/* Sought Skills */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Desired Student Skills (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mechatronics, Solar Sizing, Embedded C++, Agro-Processing, Business Modeling"
                      value={form.soughtSkills}
                      onChange={(e) => setForm({ ...form, soughtSkills: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                  </div>

                  {/* Resource Support / Stipend Offered */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Support Provided by Organization (Field access, materials, prototype stipend)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Access to local packinghouse, testing samples, and €1,500 prototyping materials fund"
                      value={form.resourceSupport}
                      onChange={(e) => setForm({ ...form, resourceSupport: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D0E7F5]">
                    <div className="text-xs text-slate-500">
                      Your submission will be routed directly to the Academic Review Inbox.
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Challenge for Admin Review</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ADMIN REVIEW & INTAKE DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="space-y-8 mb-16">
            
            {/* Admin Header & Stats */}
            <div className="bg-[#102B4E] text-white p-7 sm:p-9 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#159FE3]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FFC94A] uppercase tracking-wider font-mono mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Consortium Academic Board Review Panel</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white">
                    Organization Intake Review Inbox
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Review incoming organizational challenges. When approved, challenges are instantly published to the Live Opportunities Board for student cohort formation.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onNavigateToOpportunities}
                    className="px-5 py-2.5 rounded-full bg-[#159FE3] hover:bg-[#0E88C5] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>View Live Opportunities Board</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 relative z-10">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-300">Total Submissions</div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mt-1">{proposals.length}</div>
                </div>

                <div className="bg-[#FFC94A]/10 p-4 rounded-2xl border border-[#FFC94A]/30">
                  <div className="text-[10px] font-mono uppercase text-[#FFC94A] font-bold flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Pending Review</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#FFC94A] mt-1">{pendingCount}</div>
                </div>

                <div className="bg-[#159FE3]/15 p-4 rounded-2xl border border-[#159FE3]/30">
                  <div className="text-[10px] font-mono uppercase text-[#159FE3] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Approved &amp; Live</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#159FE3] mt-1">{approvedCount}</div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-300">Active Reviewers</div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mt-1">4 Hubs</div>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto text-xs">
                {(['All', 'Pending Review', 'Approved', 'Declined'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setAdminStatusFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                      adminStatusFilter === filter
                        ? 'bg-[#102B4E] text-white shadow-xs'
                        : 'bg-white border border-[#D0E7F5] text-[#102B4E]/80 hover:text-[#102B4E]'
                    }`}
                  >
                    <span>{filter}</span>
                    <span className="ml-1.5 opacity-70 font-mono">
                      ({filter === 'All' ? proposals.length : proposals.filter((p) => p.status === filter).length})
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-mono">
                Showing {filteredProposals.length} organization submissions
              </div>
            </div>

            {/* Proposals List */}
            <div className="space-y-6">
              {filteredProposals.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#D0E7F5]">
                  <p className="text-sm text-slate-500">No proposals match the selected filter.</p>
                </div>
              ) : (
                filteredProposals.map((prop) => (
                  <div
                    key={prop.id}
                    className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-xs transition-all ${
                      prop.status === 'Pending Review'
                        ? 'border-[#FFC94A] ring-2 ring-[#FFC94A]/25'
                        : prop.status === 'Approved'
                        ? 'border-[#159FE3]'
                        : 'border-[#D0E7F5] opacity-80'
                    }`}
                  >
                    {/* Header Strip */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {prop.status === 'Pending Review' && (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#FFC94A]/20 text-[#102B4E] uppercase tracking-wider font-mono flex items-center gap-1 border border-[#FFC94A]/50">
                            <Clock className="w-3 h-3 text-[#102B4E]" />
                            <span>Action Required: Pending Review</span>
                          </span>
                        )}
                        {prop.status === 'Approved' && (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#EAF6FC] text-[#102B4E] uppercase tracking-wider font-mono flex items-center gap-1 border border-[#159FE3]/30">
                            <CheckCircle2 className="w-3 h-3 text-[#159FE3]" />
                            <span>Approved &amp; Published to Opportunities</span>
                          </span>
                        )}
                        {prop.status === 'Declined' && (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-rose-100 text-rose-900 uppercase tracking-wider font-mono">
                            Declined / Archived
                          </span>
                        )}

                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#EAF6FC] text-[#102B4E] uppercase tracking-wider font-mono">
                          {prop.focusArea}
                        </span>

                        <span className="text-xs text-slate-500 font-mono">
                          {prop.country} · {prop.organizationType}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-slate-500">
                        Submitted {new Date(prop.submittedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Challenge Title & Organization */}
                    <h3 className="text-2xl font-bold text-[#102B4E] mb-1">
                      {prop.challengeTitle}
                    </h3>
                    <div className="text-xs text-[#159FE3] font-semibold mb-4">
                      Sponsor: {prop.organizationName} · Contact: {prop.contactName} ({prop.contactEmail})
                    </div>

                    {/* Problem Statement & Desired Outcome Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#EAF6FC] p-4 sm:p-5 rounded-2xl border border-[#D0E7F5] mb-5 text-xs">
                      <div>
                        <div className="font-bold text-[10px] uppercase font-mono text-[#102B4E] mb-1">
                          Problem Statement / Bottleneck:
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {prop.problemStatement}
                        </p>
                      </div>

                      <div>
                        <div className="font-bold text-[10px] uppercase font-mono text-[#102B4E] mb-1">
                          Desired Student Deliverable:
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {prop.desiredOutcome}
                        </p>
                      </div>
                    </div>

                    {/* Additional Metadata Strip */}
                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-600 font-mono mb-5 pb-5 border-b border-[#EAF6FC]">
                      <div>
                        <span className="font-bold text-[#102B4E]">Sought Skills: </span>
                        <span>{prop.soughtSkills.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#102B4E]">Duration: </span>
                        <span>{prop.estimatedCohortDuration}</span>
                      </div>
                      {prop.resourceSupport && (
                        <div>
                          <span className="font-bold text-[#102B4E]">Support Offered: </span>
                          <span>{prop.resourceSupport}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {prop.adminNotes && (
                        <div className="text-xs text-slate-500 italic">
                          <strong>Admin Note:</strong> {prop.adminNotes}
                        </div>
                      )}

                      <div className="flex items-center gap-3 ml-auto">
                        {prop.status === 'Pending Review' && (
                          <>
                            <button
                              onClick={() => triggerAdminDecline(prop.id)}
                              className="px-4 py-2.5 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-all flex items-center gap-1.5"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Decline</span>
                            </button>

                            <button
                              onClick={() => triggerAdminApprove(prop.id)}
                              className="px-6 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                            >
                              <Check className="w-4 h-4 text-[#FFC94A]" />
                              <span>Approve &amp; Add to Opportunities Board</span>
                            </button>
                          </>
                        )}

                        {prop.status === 'Approved' && (
                          <button
                            onClick={onNavigateToOpportunities}
                            className="px-5 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all flex items-center gap-2"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#FFC94A]" />
                            <span>View on Live Opportunities Board</span>
                          </button>
                        )}

                        {prop.status === 'Declined' && (
                          <button
                            onClick={() => triggerAdminApprove(prop.id)}
                            className="px-4 py-2 rounded-full border border-[#D0E7F5] text-slate-600 hover:text-[#102B4E] text-xs font-medium"
                          >
                            Re-consider &amp; Approve
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 3: CONSORTIUM REGIONAL OFFICES & HUBS */}
        {activeTab === 'general' && (
          <div className="space-y-12 mb-16">
            
            {/* Hubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Makerere */}
              <div className="bg-white p-6 rounded-3xl border border-[#D0E7F5] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF6FC] text-[#159FE3] flex items-center justify-center font-bold">
                  UG
                </div>
                <h3 className="text-lg font-bold text-[#102B4E]">Makerere University Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  College of Engineering, Design, Art and Technology (CEDAT) · Makerere Main Campus, Kampala.
                </p>
                <div className="text-xs space-y-1 text-[#102B4E] font-mono pt-2 border-t border-[#EAF6FC]">
                  <div>kampala@transformation-africa.org</div>
                  <div>+256 414 531 280</div>
                </div>
              </div>

              {/* Stellenbosch */}
              <div className="bg-white p-6 rounded-3xl border border-[#D0E7F5] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF6FC] text-[#102B4E] flex items-center justify-center font-bold">
                  ZA
                </div>
                <h3 className="text-lg font-bold text-[#102B4E]">Stellenbosch Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Faculty of AgriSciences &amp; Engineering · Victoria Street, Stellenbosch, Western Cape.
                </p>
                <div className="text-xs space-y-1 text-[#102B4E] font-mono pt-2 border-t border-[#EAF6FC]">
                  <div>stellenbosch@transformation-africa.org</div>
                  <div>+27 21 808 9111</div>
                </div>
              </div>

              {/* MCI Innsbruck */}
              <div className="bg-white p-6 rounded-3xl border border-[#D0E7F5] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF6FC] text-[#159FE3] flex items-center justify-center font-bold">
                  AT
                </div>
                <h3 className="text-lg font-bold text-[#102B4E]">MCI Innsbruck Hub</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  MCI | The Entrepreneurial School® · Universitätsstraße 15, Innsbruck, Austria.
                </p>
                <div className="text-xs space-y-1 text-[#102B4E] font-mono pt-2 border-t border-[#EAF6FC]">
                  <div>innsbruck@transformation-africa.org</div>
                  <div>+43 512 2070 0</div>
                </div>
              </div>

              {/* Munich Liaison */}
              <div className="bg-white p-6 rounded-3xl border border-[#D0E7F5] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF6FC] text-[#102B4E] flex items-center justify-center font-bold">
                  DE
                </div>
                <h3 className="text-lg font-bold text-[#102B4E]">Munich Liaison</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Technical University of Munich (TUM) · Arcisstraße 21, Munich, Germany.
                </p>
                <div className="text-xs space-y-1 text-[#102B4E] font-mono pt-2 border-t border-[#EAF6FC]">
                  <div>munich@transformation-africa.org</div>
                  <div>+49 89 289 01</div>
                </div>
              </div>

            </div>

            {/* General Inquiry Form */}
            <div className="max-w-2xl mx-auto bg-white p-7 sm:p-9 rounded-3xl border border-[#D0E7F5] shadow-xs">
              <h3 className="text-2xl font-bold text-[#102B4E] mb-2">
                Send a General Academic or Press Inquiry
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Have questions about student enrollment, credit recognition, research publications, or consortium membership?
              </p>

              {generalSubmitted ? (
                <div className="p-6 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5] text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#159FE3] mx-auto" />
                  <h4 className="text-base font-bold text-[#102B4E]">Inquiry Sent Successfully</h4>
                  <p className="text-xs text-slate-600">
                    Thank you. A consortium university coordinator will reply to {generalForm.email} within 2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setGeneralSubmitted(false);
                      setGeneralForm({ name: '', email: '', subject: 'Academic Co-creation Inquiry', institution: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#102B4E] hover:bg-[#0C223E] rounded-full mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Markus Lindner"
                        value={generalForm.name}
                        onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                      {generalErrors.name && (
                        <p className="text-[11px] text-rose-500 mt-1">{generalErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="markus.lindner@tu-graz.ac.at"
                        value={generalForm.email}
                        onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                      {generalErrors.email && (
                        <p className="text-[11px] text-rose-500 mt-1">{generalErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Inquiring about joining the 2026/2027 COIL consortium"
                      value={generalForm.subject}
                      onChange={(e) => setGeneralForm({ ...generalForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#102B4E] uppercase font-mono mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your inquiry..."
                      value={generalForm.message}
                      onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                    {generalErrors.message && (
                      <p className="text-[11px] text-rose-500 mt-1">{generalErrors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-xs transition-all"
                    >
                      Send Message
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

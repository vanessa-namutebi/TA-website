import React, { useState } from 'react';
import {
  UserCheck,
  Building2,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Lock,
  GraduationCap,
  FileText,
  KeyRound,
  Layers,
  School
} from 'lucide-react';
import { OrganizationProposal } from '../data/proposalData';
import { ReplitOpportunity } from '../data/replitData';

export type PortalTab = 'intake' | 'admin' | 'registration' | 'signin' | 'office';

interface ReplitPortalProps {
  proposals: OrganizationProposal[];
  onAddProposal: (newProposal: OrganizationProposal) => void;
  onApproveProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string, reason?: string) => void;
  onNavigateToOpportunities: () => void;
  initialTab?: PortalTab;
}

export const ReplitPortal: React.FC<ReplitPortalProps> = ({
  proposals,
  onAddProposal,
  onApproveProposal,
  onDeclineProposal,
  onNavigateToOpportunities,
  initialTab = 'intake'
}) => {
  const [activeTab, setActiveTab] = useState<PortalTab>(
    initialTab === 'registration' ? 'registration' : 'intake'
  );

  React.useEffect(() => {
    setActiveTab(initialTab === 'registration' ? 'registration' : 'intake');
  }, [initialTab]);

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
    soughtSkills: 'IoT Sensors, Solar Sizing, Mobile UX',
    estimatedCohortDuration: '12 Weeks Academic Cohort',
    resourceSupport: 'Cooperative provides field deployment sites, mentorship, and testing facility.'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Simulated SSO Login State
  const [ssoUniversity, setSsoUniversity] = useState('MCI Innsbruck (Austria)');
  const [ssoRole, setSsoRole] = useState('Student / Associate');
  const [ssoEmail, setSsoEmail] = useState('');
  const [ssoLoggedInUser, setSsoLoggedInUser] = useState<string | null>(null);

  // General Office Inquiry Form State
  const [officeForm, setOfficeForm] = useState({
    name: '',
    email: '',
    subject: 'Academic Co-creation Inquiry',
    institution: '',
    message: ''
  });
  const [officeSubmitted, setOfficeSubmitted] = useState(false);

  // Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.organizationName.trim()) errs.organizationName = 'Organisation name is required.';
    if (!form.contactName.trim()) errs.contactName = 'Lead contact name is required.';
    if (!form.contactEmail.trim() || !form.contactEmail.includes('@')) {
      errs.contactEmail = 'A valid business or institutional email is required.';
    }
    if (!form.challengeTitle.trim() || form.challengeTitle.length < 5) {
      errs.challengeTitle = 'Please specify a descriptive challenge title.';
    }
    if (!form.problemStatement.trim() || form.problemStatement.length < 20) {
      errs.problemStatement = 'Please provide at least 20 characters describing the problem.';
    }
    if (!form.desiredOutcome.trim() || form.desiredOutcome.length < 15) {
      errs.desiredOutcome = 'Please outline the tangible deliverable or prototype expected.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refId = `PROP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProp: OrganizationProposal = {
      id: `prop-${Date.now()}`,
      referenceNumber: refId,
      organizationName: form.organizationName,
      organizationType: form.organizationType,
      contactName: form.contactName,
      contactRole: form.contactRole,
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
      status: 'Pending Review',
      submittedAt: new Date().toISOString()
    };

    onAddProposal(newProp);
    setSubmittedRefId(refId);
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
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
      soughtSkills: 'IoT Sensors, Solar Sizing, Mobile UX',
      estimatedCohortDuration: '12 Weeks Academic Cohort',
      resourceSupport: 'Cooperative provides field deployment sites, mentorship, and testing facility.'
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  const handleSsoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ssoEmail.trim()) {
      setSsoLoggedInUser(`${ssoEmail} (${ssoUniversity} · ${ssoRole})`);
    }
  };

  const filteredProposals = proposals.filter((p) => {
    if (adminStatusFilter === 'All') return true;
    return p.status === adminStatusFilter;
  });

  const pendingCount = proposals.filter((p) => p.status === 'Pending Review').length;

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-3">
          <span>Transformation Africa</span>
          <span>·</span>
          <span>Personal Portal &amp; Opportunity Governance</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Personal Portal &amp; Challenge Intake
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              When an organisation faces a technical, business, or community bottleneck, they reach out here. Our Academic Consortium Board reviews the challenge, verifies curricular alignment, and approves it to live status.
            </p>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#D0E7F5] shadow-xs mb-10">
          <button
            onClick={() => setActiveTab('intake')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'intake'
                ? 'bg-[#102B4E] text-white shadow-xs'
                : 'text-[#415D7E] hover:text-[#102B4E] hover:bg-[#EAF6FC]'
            }`}
          >
            <Send className="w-4 h-4 text-[#159FE3]" />
            <span>Submit Organisation Challenge</span>
          </button>

          <button
            onClick={() => setActiveTab('registration')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'registration'
                ? 'bg-[#102B4E] text-white shadow-xs'
                : 'text-[#415D7E] hover:text-[#102B4E] hover:bg-[#EAF6FC]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#159FE3]" />
            <span>Student &amp; Associate Registration</span>
          </button>

        </div>

        {/* Tab 1: Challenge Intake Form */}
        {activeTab === 'intake' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Intake Form */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-7 sm:p-10 border border-[#D0E7F5] shadow-xs">
              {formSubmitted ? (
                <div className="py-12 px-4 text-center max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-full bg-[#EAF6FC] border border-[#D0E7F5] flex items-center justify-center text-[#159FE3] mx-auto mb-6 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#102B4E] mb-2">
                    Challenge Proposal Submitted!
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#159FE3] mb-4">
                    Reference ID: {submittedRefId}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-full bg-white hover:bg-[#EAF6FC] text-[#102B4E] text-xs font-bold border border-[#D0E7F5] transition-all"
                    >
                      <span>Submit Another Challenge</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#102B4E] mb-1">
                      Organization Challenge Intake
                    </h3>
                    <p className="text-xs text-slate-600">
                      Fill out the fields below. Vetted challenges are matched with cross-border student teams co-supervised by consortium faculty.
                    </p>
                  </div>

                  {/* Section 1: Organization Details */}
                  <div className="pt-4 border-t border-[#E2EEF5]">
                    <h4 className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-4">
                      01. Organization Credentials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Organisation Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Busoga Farm Forestry Cooperative"
                          value={form.organizationName}
                          onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                        {formErrors.organizationName && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.organizationName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Organisation Category *
                        </label>
                        <select
                          value={form.organizationType}
                          onChange={(e) => setForm({ ...form, organizationType: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        >
                          <option value="Enterprise / Industry">Enterprise / Industry</option>
                          <option value="Non-Profit / NGO">Non-Profit / NGO</option>
                          <option value="Start-Up / Impact Hub">Start-Up / Impact Hub</option>
                          <option value="Community Cooperative">Community Cooperative</option>
                          <option value="Government / Agency">Government / Agency</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Primary Country *
                        </label>
                        <select
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        >
                          <option value="Uganda">Uganda</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Austria">Austria</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Rwanda">Rwanda</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Focus Area *
                        </label>
                        <select
                          value={form.focusArea}
                          onChange={(e) => setForm({ ...form, focusArea: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        >
                          <option value="Agribusiness">Agribusiness &amp; Food Systems</option>
                          <option value="Clean Energy">Clean Energy &amp; Off-grid</option>
                          <option value="Health Systems">Health Systems &amp; Medical Devices</option>
                          <option value="Circular Economy">Circular Economy &amp; Waste Upcycling</option>
                          <option value="Digital Inclusion">Digital Inclusion &amp; FinTech</option>
                          <option value="Climate Resilience">Climate Resilience &amp; Water</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Contact Person */}
                  <div className="pt-4 border-t border-[#E2EEF5]">
                    <h4 className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-4">
                      02. Lead Contact Person
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sarah Namubiru"
                          value={form.contactName}
                          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                        {formErrors.contactName && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.contactName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Title / Role
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Operations Director"
                          value={form.contactRole}
                          onChange={(e) => setForm({ ...form, contactRole: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          placeholder="s.namubiru@busogafarm.org"
                          value={form.contactEmail}
                          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                        {formErrors.contactEmail && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.contactEmail}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="text"
                          placeholder="+256 701 555 123"
                          value={form.contactPhone}
                          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Challenge Details */}
                  <div className="pt-4 border-t border-[#E2EEF5]">
                    <h4 className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-4">
                      03. Challenge Scope &amp; Deliverables
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Challenge Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Decentralized Solar Mango Dehydration and Quality Telemetry"
                          value={form.challengeTitle}
                          onChange={(e) => setForm({ ...form, challengeTitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                        {formErrors.challengeTitle && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.challengeTitle}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Problem Statement (What is the bottleneck?) *
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Describe the real-world operational friction, technical constraint, or market obstacle your community/organisation is facing..."
                          value={form.problemStatement}
                          onChange={(e) => setForm({ ...form, problemStatement: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                        {formErrors.problemStatement && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.problemStatement}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Desired Tangible Outcome / Deliverable *
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Working hardware prototype CAD, thermodynamic model, bills of materials, and farmer field manual in Luganda and English."
                          value={form.desiredOutcome}
                          onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                        {formErrors.desiredOutcome && (
                          <p className="text-[11px] text-rose-500 mt-1">{formErrors.desiredOutcome}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#102B4E] mb-1">
                            Skills Sought (comma separated)
                          </label>
                          <input
                            type="text"
                            placeholder="IoT, CAD, Python, Solar Sizing"
                            value={form.soughtSkills}
                            onChange={(e) => setForm({ ...form, soughtSkills: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#102B4E] mb-1">
                            Cohort Duration
                          </label>
                          <select
                            value={form.estimatedCohortDuration}
                            onChange={(e) => setForm({ ...form, estimatedCohortDuration: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                          >
                            <option value="8 Weeks Rapid Sprint">8 Weeks Rapid Sprint</option>
                            <option value="12 Weeks Academic Cohort">12 Weeks Academic Cohort</option>
                            <option value="6 Months Master Thesis">6 Months Master Thesis</option>
                            <option value="Full Academic Year">Full Academic Year</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#102B4E] mb-1">
                          Organisation In-Kind Support / Access Provided
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Test farm access, local mentor, raw ingredients for prototype testing"
                          value={form.resourceSupport}
                          onChange={(e) => setForm({ ...form, resourceSupport: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E2EEF5] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      Submissions undergo academic feasibility check within 3 business days.
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>Submit Challenge for Review</span>
                      <Send className="w-3.5 h-3.5 text-[#159FE3]" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Workflow Explanation & Criteria */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-[#EAF6FC] border border-[#D0E7F5] rounded-3xl p-6">
                <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-2">
                  How The Admin Review Works
                </div>
                <h4 className="text-base font-bold text-[#102B4E] mb-3">
                  From Submission to Active Project
                </h4>
                <ol className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#102B4E] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span><strong>Intake Receipt:</strong> The proposal is safely stored in our consortium database with status <em>Pending Review</em>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#102B4E] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span><strong>Consortium Scoping:</strong> Academic leads at MCI, Makerere, and Stellenbosch evaluate curricular fit and student learning outcomes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#159FE3] text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span><strong>Board Decision:</strong> The administrator clicks <strong>Approve</strong>, which automatically publishes it as a live Opportunity on the public board.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFC94A] text-[#102B4E] font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <span><strong>Team Assembly:</strong> Cross-border students apply, and the challenge cohort commences with faculty co-supervision.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-white border border-[#D0E7F5] rounded-3xl p-6 shadow-xs">
                <h4 className="text-sm font-bold text-[#102B4E] mb-3">
                  Review Criteria Checked
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                    <span>Tangible local problem with demonstrable community benefit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                    <span>Feasible technical scope for a 8-14 week student team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                    <span>Willingness to provide student mentorship &amp; field testing access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                    <span>Alignment with UN SDGs or AU Agenda 2063</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Admin Review Board */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            
            {/* Admin Header & Stats */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D0E7F5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFC94A]/20 text-[#102B4E] text-[11px] font-mono font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#102B4E]" />
                  <span>Consortium Governance Queue</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E]">
                  Opportunity Review &amp; Publishing Portal
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Evaluate incoming organization challenge submissions. Approving a proposal instantly registers it as a live Opportunity on the public board.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {(['All', 'Pending Review', 'Approved', 'Declined'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setAdminStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      adminStatusFilter === st
                        ? 'bg-[#102B4E] text-white shadow-xs'
                        : 'bg-[#F8F6F0] text-[#415D7E] hover:bg-[#EAF6FC]'
                    }`}
                  >
                    {st}
                    {st === 'Pending Review' && pendingCount > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-[#FFC94A] text-[#102B4E] text-[10px] font-mono font-bold">
                        {pendingCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Proposals List */}
            {filteredProposals.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#D0E7F5]">
                <Clock className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-[#102B4E]">No Proposals in this View</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {adminStatusFilter === 'Pending Review'
                    ? 'All incoming challenges have been reviewed!'
                    : 'Switch filter or submit a new challenge in the Intake tab.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredProposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D0E7F5] shadow-xs flex flex-col lg:flex-row lg:items-start justify-between gap-6 hover:border-[#159FE3]/40 transition-all"
                  >
                    <div className="space-y-4 max-w-3xl">
                      
                      {/* Meta badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-md uppercase tracking-wider ${
                            prop.status === 'Pending Review'
                              ? 'bg-[#FFC94A]/25 text-[#102B4E] border border-[#FFC94A]'
                              : prop.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {prop.status}
                        </span>

                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          Ref: {prop.referenceNumber}
                        </span>

                        <span className="text-[10px] font-mono text-slate-500">
                          Submitted: {new Date(prop.submittedAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <div>
                        <h3 className="text-xl font-bold text-[#102B4E]">
                          {prop.challengeTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                          <span className="font-semibold text-[#159FE3]">{prop.organizationName}</span>
                          <span>·</span>
                          <span>{prop.organizationType}</span>
                          <span>·</span>
                          <span>{prop.country}</span>
                          <span>·</span>
                          <span className="font-medium text-[#102B4E]">{prop.focusArea}</span>
                        </div>
                      </div>

                      {/* Problem Statement */}
                      <div className="bg-[#F8F6F0] rounded-2xl p-4 border border-[#E2EEF5] text-xs text-slate-700 leading-relaxed">
                        <div className="font-bold text-[#102B4E] mb-1">Problem Statement:</div>
                        <p>{prop.problemStatement}</p>
                      </div>

                      {/* Desired Outcome */}
                      <div className="text-xs text-slate-600 space-y-1">
                        <div>
                          <strong className="text-[#102B4E]">Tangible Expected Outcome:</strong> {prop.desiredOutcome}
                        </div>
                        <div>
                          <strong className="text-[#102B4E]">Support &amp; Facilities Provided:</strong> {prop.resourceSupport}
                        </div>
                      </div>

                      {/* Skills sought tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-mono text-slate-400 mr-1">Skills:</span>
                        {prop.soughtSkills.map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-[#EAF6FC] text-[#102B4E] px-2.5 py-0.5 rounded-md border border-[#D0E7F5]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                      {/* Review details if reviewed */}
                      {prop.reviewedAt && (
                        <div className="text-xs text-slate-500 italic pt-2 border-t border-[#E2EEF5]">
                          Reviewed on {new Date(prop.reviewedAt).toLocaleDateString()} by {prop.adminReviewer || 'Consortium Board'}.
                          {prop.adminNotes && <span className="block mt-0.5 text-rose-600 font-medium">{prop.adminNotes}</span>}
                        </div>
                      )}
                    </div>

                    {/* Right Action Column */}
                    <div className="lg:w-64 flex flex-col justify-between gap-4 pt-4 lg:pt-0 lg:border-l border-[#E2EEF5] lg:pl-6 shrink-0">
                      <div className="text-xs space-y-2 text-slate-600">
                        <div className="font-bold text-[#102B4E]">Contact Lead:</div>
                        <div>{prop.contactName}</div>
                        <div className="font-mono text-[11px] text-[#159FE3]">{prop.contactEmail}</div>
                        {prop.contactPhone && <div className="font-mono text-[11px]">{prop.contactPhone}</div>}
                      </div>

                      {/* Action buttons based on status */}
                      <div className="space-y-2">
                        {prop.status === 'Pending Review' ? (
                          <>
                            <button
                              onClick={() => onApproveProposal(prop.id)}
                              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve &amp; Add Opportunity</span>
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Specify review feedback or reason for declining (optional):');
                                onDeclineProposal(prop.id, reason || undefined);
                              }}
                              className="w-full py-2 px-4 rounded-xl bg-white hover:bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 transition-all flex items-center justify-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Decline Challenge</span>
                            </button>
                          </>
                        ) : prop.status === 'Approved' ? (
                          <div className="space-y-2">
                            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Live on Opportunities Board</span>
                            </div>
                            <button
                              onClick={onNavigateToOpportunities}
                              className="w-full py-2 px-3 rounded-xl bg-[#EAF6FC] hover:bg-[#D5EBF7] text-[#102B4E] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <span>View on Opportunities Board</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-700 font-medium">
                            Proposal declined. Notified submitter.
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Official Registration Google Form from Google Site */}
        {activeTab === 'registration' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D0E7F5] shadow-xs">
            <div className="max-w-3xl">
              <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-2">
                Official Consortium Registration
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102B4E] tracking-tight mb-4">
                Join Transformation Africa as a Student, Associate, or Institution.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                To participate in upcoming COIL cohorts, study tours, or bachelor/master thesis pairings, all students and academic mentors must complete our official registration form.
              </p>

              {/* Direct Link Banner to the Google Site's Google Form */}
              <div className="bg-[#EAF6FC] border border-[#D0E7F5] rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-1">
                    Google Form Registration Portal
                  </div>
                  <h3 className="text-xl font-bold text-[#102B4E]">
                    Transformation Africa Membership Application
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Directly linked to the consortium&apos;s intake database hosted on Google Forms.
                  </p>
                </div>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdAkhggVB6KZUNfevk9_GCfXuVlz5zdDBIvl3HU01etOMtugQ/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shrink-0 shadow-sm transition-all"
                >
                  <span>Open Official Google Form</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#159FE3]" />
                </a>
              </div>

              {/* Eligibility & Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E2EEF5]">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#102B4E]">Who Can Register?</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Enrolled students at Makerere, Stellenbosch, MCI, TUM, or partner universities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Post-graduates seeking co-supervised Master or PhD thesis research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Early-stage tech founders seeking university engineering sprint matches</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#102B4E]">Required Information</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Current university enrollment certificate &amp; major</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Top 3 focus areas of interest (e.g. Clean Energy, Agribusiness)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3] shrink-0 mt-0.5" />
                      <span>Commitment of 4-8 hours weekly during semester term</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Member Sign-in & Simulated SSO */}
        {activeTab === 'signin' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF6FC] text-[#159FE3] flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#102B4E]">
                Consortium Member Sign-In
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Access your active project e-portfolios, milestone submissions, and peer evaluations.
              </p>
            </div>

            {ssoLoggedInUser ? (
              <div className="p-6 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5] text-center space-y-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#102B4E]">Signed In Successfully</h4>
                  <p className="text-xs font-mono text-[#159FE3] mt-1">{ssoLoggedInUser}</p>
                </div>
                <div className="text-xs text-slate-600 bg-white p-4 rounded-xl border border-[#D0E7F5] text-left space-y-2">
                  <div className="font-bold text-[#102B4E]">Active Portal Permissions:</div>
                  <div>✓ View ongoing COIL sprint workspaces</div>
                  <div>✓ Download assessment rubrics &amp; ECTS forms</div>
                  <div>✓ Access internal Slack / Zulip community server</div>
                </div>
                <button
                  onClick={() => setSsoLoggedInUser(null)}
                  className="px-5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white rounded-full border border-rose-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSsoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#102B4E] mb-1">
                    Affiliated Institution
                  </label>
                  <select
                    value={ssoUniversity}
                    onChange={(e) => setSsoUniversity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                  >
                    <option value="MCI Innsbruck (Austria)">MCI Management Center Innsbruck (Austria)</option>
                    <option value="Makerere University (Uganda)">Makerere University (Uganda)</option>
                    <option value="Stellenbosch University (South Africa)">Stellenbosch University (South Africa)</option>
                    <option value="TU Munich (Germany)">Technical University of Munich (Germany)</option>
                    <option value="External Partner / Enterprise">External Partner / Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B4E] mb-1">
                    Role Category
                  </label>
                  <select
                    value={ssoRole}
                    onChange={(e) => setSsoRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                  >
                    <option value="Student / Associate">Student / Associate</option>
                    <option value="Faculty Supervisor / Co-Instructor">Faculty Supervisor / Co-Instructor</option>
                    <option value="Enterprise Challenge Sponsor">Enterprise Challenge Sponsor</option>
                    <option value="NGO Partner Lead">NGO Partner Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B4E] mb-1">
                    Institutional Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@mci4me.at or associate@mak.ac.ug"
                    value={ssoEmail}
                    onChange={(e) => setSsoEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B4E] mb-1">
                    Password / Access Key
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue="demoPassword123"
                    className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#159FE3]" />
                    <span>Sign In via Academic SSO</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* Tab 5: Consortium Offices & Inquiries */}
        {activeTab === 'office' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Headquarters Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-2">
                  Consortium Headquarters
                </div>
                <h3 className="text-2xl font-bold text-[#102B4E]">
                  Transformation Africa Association
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Registered Austrian non-profit educational and development association.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#102B4E]">Consortium Leadership:</div>
                    <div>Prof. Dr.-Ing. Gerhard Hillmer MSc</div>
                    <div>Head of Studies: Industrial Engineering &amp; Management</div>
                    <div>MCI Management Center Innsbruck</div>
                    <div>Maximilianstraße 2, 6020 Innsbruck, Austria</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#102B4E]">Direct Email:</div>
                    <a href="mailto:gerhard.hillmer@mci.edu" className="text-[#159FE3] hover:underline font-mono">
                      gerhard.hillmer@mci.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#102B4E]">Telephone:</div>
                    <div className="font-mono text-slate-700">+43 512 2070 -4110</div>
                    <div className="font-mono text-slate-700">+43 664 2616321</div>
                  </div>
                </div>
              </div>

              {/* Regional Hubs Row */}
              <div className="pt-4 border-t border-[#E2EEF5]">
                <h4 className="text-xs font-mono font-bold text-[#159FE3] uppercase tracking-wider mb-3">
                  Regional University Hubs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#D0E7F5]">
                    <div className="font-bold text-[#102B4E]">East Africa Hub</div>
                    <div className="text-slate-600">Makerere University, Kampala, Uganda</div>
                  </div>
                  <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#D0E7F5]">
                    <div className="font-bold text-[#102B4E]">Southern Africa Hub</div>
                    <div className="text-slate-600">Stellenbosch University, South Africa</div>
                  </div>
                </div>
              </div>

            </div>

            {/* General Inquiry Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-[#D0E7F5] shadow-xs">
              <h3 className="text-2xl font-bold text-[#102B4E] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Have questions regarding institutional membership, grant cooperation, or curriculum integration?
              </p>

              {officeSubmitted ? (
                <div className="p-6 bg-[#EAF6FC] rounded-2xl border border-[#D0E7F5] text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#159FE3] mx-auto" />
                  <h4 className="text-base font-bold text-[#102B4E]">Message Sent Successfully</h4>
                  <p className="text-xs text-slate-600">
                    Thank you. Prof. Hillmer or a consortium university coordinator will reply within 2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setOfficeSubmitted(false);
                      setOfficeForm({ name: '', email: '', subject: 'Academic Co-creation Inquiry', institution: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#102B4E] rounded-full mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (officeForm.name && officeForm.email && officeForm.message) {
                      setOfficeSubmitted(true);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#102B4E] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Markus Lindner"
                        value={officeForm.name}
                        onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#102B4E] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="markus.lindner@tu-graz.ac.at"
                        value={officeForm.email}
                        onChange={(e) => setOfficeForm({ ...officeForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102B4E] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2026/2027 COIL consortium expansion"
                      value={officeForm.subject}
                      onChange={(e) => setOfficeForm({ ...officeForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#102B4E] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your inquiry or institutional background..."
                      value={officeForm.message}
                      onChange={(e) => setOfficeForm({ ...officeForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F0] border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] focus:outline-none focus:ring-2 focus:ring-[#159FE3]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-xs transition-all"
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

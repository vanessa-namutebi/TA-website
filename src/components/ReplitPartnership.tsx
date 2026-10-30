import React, { useState } from 'react';
import {
  Handshake,
  Landmark,
  Coins,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export type PartnershipSubTab = 'membership' | 'sponsorship' | 'events' | 'financials' | 'contact';

interface ReplitPartnershipProps {
  onNavigateToContact?: () => void;
  onNavigateToProjects?: () => void;
  initialSubTab?: PartnershipSubTab;
}

export const ReplitPartnership: React.FC<ReplitPartnershipProps> = ({
  onNavigateToContact,
  onNavigateToProjects,
  initialSubTab = 'membership'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PartnershipSubTab>(initialSubTab);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const subTabs: { id: PartnershipSubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'membership', label: 'Institutional Membership', icon: <Landmark className="w-3.5 h-3.5" /> },
    { id: 'sponsorship', label: 'Sponsorship & Grants', icon: <Coins className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Events & Conferences', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'financials', label: 'Financial Framework', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Consortium Contacts', icon: <Mail className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-3">
          <span>Consortium Engagement</span>
          <span>·</span>
          <span>Partnership &amp; Governance</span>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Partner with Transformation Africa.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              We operate as an Austrian non-profit association connecting universities, corporate sponsors, and funding agencies under transparent governance, shared academic standards, and demonstrable socio-economic impact.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#102B4E] text-white p-6 rounded-3xl shadow-sm space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#FFC94A] font-bold">
              Institutional Status
            </div>
            <h3 className="text-xl font-bold text-white">Austrian Nonprofit Association</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Recognized under Austrian law (Vereinsgesetz) with headquarters in Innsbruck, governed by senior academic coordinators across Africa and Europe.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-[#159FE3] font-mono">
              Registration Ref: ZVR 198420188
            </div>
          </div>
        </div>

        {/* Sub-tab Pill Navigation */}
        <div className="bg-[#EAF6FC]/70 p-1.5 rounded-2xl border border-[#D0E7F5] mb-10 flex items-center gap-1.5 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-[#102B4E] text-white shadow-xs'
                  : 'bg-white/80 text-[#102B4E]/75 hover:bg-white hover:text-[#102B4E] border border-[#D0E7F5]/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* SUBTAB 1: MEMBERSHIP */}
        {activeSubTab === 'membership' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                University &amp; Institutional Tiers
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Consortium Membership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Higher education institutions join Transformation Africa to internationalize their engineering, business, and sustainability curricula. Member universities gain access to vetted challenge intake, dual ECTS recognition protocols, and mixed student cohort matchmaking.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Academic Core Members</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Full voting board seat, guaranteed student cohort placements, and mutual faculty development workshops.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#102B4E]">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> MCI The Entrepreneurial School</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> Makerere University (CEDAT)</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> Stellenbosch University</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Associate University Hubs</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Participating departments integrating specific COIL modules and co-supervising bachelor/master theses.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#102B4E]">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> TU Munich Academic Network</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> Cooperating Austrian Fachhochschulen</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> East African Regional Hubs</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Affiliate Innovation Hubs</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Community maker spaces and research clusters providing field deployment facilities and local testing.
                  </p>
                  <ul className="text-xs space-y-1.5 text-[#102B4E]">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> Kampala Fab Lab Network</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> Western Cape Agri Hub</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#159FE3]" /> Clean Energy Mini-Grid Testbeds</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAF6FC] flex justify-end">
                <button
                  onClick={onNavigateToContact}
                  className="px-6 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>Apply for Consortium Membership</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: SPONSORSHIP */}
        {activeSubTab === 'sponsorship' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Industry &amp; Foundation Support
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Sponsorship &amp; Materials Prototyping Funds
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Corporate sponsors and charitable foundations support student teams by funding physical prototype components, local testing travel, and open-hardware documentation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Tier 1 · €2,500</div>
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Project Sprint Sponsor</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Funds raw materials, microcontroller sensors, solar cells, and fabrication costs for one 12-week student team.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Tier 2 · €7,500</div>
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Field Pilot Immersion</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sponsors in-person field testing travel, community focus groups, and on-site hardware deployment in Uganda or South Africa.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Tier 3 · Custom</div>
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Enterprise Lab Partner</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Multi-year partnership sponsoring an entire domain cluster (e.g. Clean Energy Telemetry or Post-Harvest Cold Chain).
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  All sponsorship funds are audited and administered through the Austrian nonprofit association with tax deduction receipts.
                </div>
                <button
                  onClick={onNavigateToContact}
                  className="px-5 py-2 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shrink-0"
                >
                  Inquire About Sponsorship
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: EVENTS & CONFERENCES */}
        {activeSubTab === 'events' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Conferences &amp; Academic Summits
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Events, Conferences &amp; Summer Schools
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Transformation Africa convenes researchers, practitioners, and student cohorts annually through physical summer schools and virtual symposiums.
              </p>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#159FE3] bg-white px-2.5 py-0.5 rounded-full border border-[#D0E7F5]">
                      Annual Summer Flagship
                    </span>
                    <h3 className="text-lg font-bold text-[#102B4E] mt-2">
                      International Entrepreneurship &amp; Sustainability Summer School
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Stellenbosch University, Western Cape, South Africa. Interdisciplinary cohort working on agricultural and clean energy field implementations.
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#102B4E] shrink-0">
                    Annual Cohort · July
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#159FE3] bg-white px-2.5 py-0.5 rounded-full border border-[#D0E7F5]">
                      Virtual Summit
                    </span>
                    <h3 className="text-lg font-bold text-[#102B4E] mt-2">
                      Euro-African COIL Academic Showcase
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Broadcast live across Innsbruck, Kampala, and Stellenbosch. Student teams present final working prototypes to industry panels.
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#102B4E] shrink-0">
                    Biannual · Jan &amp; June
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: FINANCIALS */}
        {activeSubTab === 'financials' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Transparency &amp; Governance
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Financial Aspects &amp; Nonprofit Model
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Transformation Africa operates under a strict non-profit model. All membership contributions, grants, and sponsorship funds are reinvested directly into student project materials, field testing logistics, and open-access knowledge commons.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Cost-Free for Public University Students</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Enrolled students in participating degree courses incur zero platform fees. Prototyping stipends and software licenses are fully funded by consortium grants and enterprise sponsors.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Open-Source &amp; Shared IP Principles</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Blueprints and syllabi are released under Creative Commons or CERN Open Hardware licenses to prevent monopolization and maximize community replication across the continent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: CONTACT */}
        {activeSubTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Consortium Directorate
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Consortium Leadership &amp; Hub Contacts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Reach out to discuss institutional partnerships, COIL integration into your university, or corporate challenge sponsorship.
              </p>

              <div className="bg-[#102B4E] text-white p-7 sm:p-8 rounded-3xl mb-8">
                <div className="text-xs font-bold text-[#FFC94A] uppercase font-mono tracking-wider mb-2">
                  Principal Executive Contact
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Prof. Dr.-Ing. Gerhard Hillmer MSc
                </h3>
                <p className="text-xs text-[#159FE3] font-mono mb-4">
                  Head of Studies: Industrial Engineering &amp; Management (MSc) · MCI Innsbruck, Austria
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs font-mono text-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Office Address:</span>
                    <span>Maximilianstrasse 2, 6020 Innsbruck, Austria</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Direct Telephone / WhatsApp:</span>
                    <span>+43 512 2070 -4110 / +43 664 2616321</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Academic Email:</span>
                    <a href="mailto:gerhard.hillmer@mci.edu" className="text-[#159FE3] hover:underline">
                      gerhard.hillmer@mci.edu
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={onNavigateToContact}
                  className="px-8 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <span>Open Interactive Contact &amp; Challenge Intake Portal</span>
                  <ArrowRight className="w-4 h-4 text-[#FFC94A]" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

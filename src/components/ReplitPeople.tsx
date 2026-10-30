import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Layers,
  ExternalLink
} from 'lucide-react';

export type PeopleSubTab =
  | 'students'
  | 'universities'
  | 'industry'
  | 'hubs'
  | 'ngos'
  | 'outcomes'
  | 'training';

interface ReplitPeopleProps {
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
  initialSubTab?: PeopleSubTab;
}

export const ReplitPeople: React.FC<ReplitPeopleProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
  initialSubTab = 'students'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PeopleSubTab>(initialSubTab);

  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const subTabs: { id: PeopleSubTab; label: string }[] = [
    { id: 'students', label: 'Students / Associates' },
    { id: 'universities', label: 'Higher Education Systems' },
    { id: 'industry', label: 'Industry & Businesses' },
    { id: 'hubs', label: 'Start-Up & Impact Hubs' },
    { id: 'ngos', label: 'Non-Profit Organisations' },
    { id: 'outcomes', label: 'Learning Outcomes' },
    { id: 'training', label: 'Training & Development' }
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#159FE3] uppercase tracking-[0.2em] mb-3">
          <span>Consortium Network</span>
          <span>·</span>
          <span>People &amp; Stakeholder Ecosystem</span>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Real people. Complementary capabilities.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              We connect students, university professors, enterprise leaders, start-up hubs, and community organizations to build ecosystems where every partner contributes, learns, and shares in the outcome.
            </p>
          </div>

          {/* Quick Registration CTA */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#D0E7F5] shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#159FE3] font-bold mb-1">
                Individual Portal
              </div>
              <h3 className="text-lg font-bold text-[#102B4E] mb-2">
                Join as Student or Mentor
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Register to join the upcoming semester cohort, access COIL projects, or mentor a cross-border engineering team.
              </p>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdAkhggVB6KZUNfevk9_GCfXuVlz5zdDBIvl3HU01etOMtugQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Individual Registration Form</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#159FE3]" />
            </a>
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
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* SUBTAB 1: STUDENTS / ASSOCIATES */}
        {activeSubTab === 'students' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Future Problem Solvers
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Students &amp; Pilot Associates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Students from universities in Austria, Uganda, South Africa, and Germany team up in cross-continental multidisciplinary cohorts. They work directly on real operational bottlenecks, earn recognized university credits (ECTS), and graduate with demonstrable proof of capability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">
                    Applied Problem Solving
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Move beyond simulated case studies to work on real physical hardware, agricultural supply chains, off-grid telemetry, and community health devices.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">
                    Double-Accredited ECTS
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Projects are integrated into existing bachelor and master degree syllabi with official ECTS recognition at both European and African universities.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">
                    Global Career Advantage
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Graduates present validated e-portfolios to international employers, exhibiting hands-on intercultural execution and technical dexterity.
                  </p>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-6 border-t border-[#EAF6FC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 font-mono">
                  Over 200 students engaged since 2024 across 4 regional university hubs.
                </div>
                <button
                  onClick={onNavigateToProjects}
                  className="px-6 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>Browse Student Projects &amp; Repositories</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: HIGHER EDUCATION SYSTEMS */}
        {activeSubTab === 'universities' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Academic Partner Institutions
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Higher Education Systems &amp; Faculty
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Transformation Africa connects academic departments across Europe and Africa through shared curriculum syllabi, dual thesis co-supervision, and faculty development in Collaborative Online International Learning (COIL).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">MCI Innsbruck · Austria</div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">MCI | The Entrepreneurial School®</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lead coordinating institution under Prof. Dr.-Ing. Gerhard Hillmer. Department of Industrial Engineering &amp; Management contributing mechatronics, systems engineering, and technology transfer frameworks.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Makerere University · Uganda</div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">CEDAT Kampala</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    College of Engineering, Design, Art and Technology. Pioneering rural telemetry, biomedical instrumentation, and decentralized solar food drying.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">Stellenbosch University · South Africa</div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">Faculty of AgriSciences &amp; Engineering</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Western Cape. Co-hosting annual Summer Schools in International Entrepreneurship &amp; Sustainability, testing field prototypes in regional agricultural packinghouses.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-1">German University Network</div>
                  <h3 className="text-lg font-bold text-[#102B4E] mb-2">Technical University of Munich (TUM) Liaison</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cooperating engineering and management faculties providing thesis co-evaluators, dual-degree exchange pathways, and enterprise sponsorship links.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-[#102B4E]">Interested in Institutional Consortium Membership?</h4>
                  <p className="text-xs text-slate-600">Universities can embed Transformation Africa modules into their degree programs.</p>
                </div>
                <button
                  onClick={onNavigateToContact}
                  className="px-5 py-2 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all"
                >
                  Contact Consortium Board
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: INDUSTRY & BUSINESSES */}
        {activeSubTab === 'industry' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Enterprise Co-Creation
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Industry &amp; Commercial Businesses
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Companies operating in or expanding to Africa bring operational bottlenecks, testing sites, and industry mentors. In return, they receive dedicated student engineering cohorts who prototype viable, low-cost solutions under faculty supervision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-2">Challenge Submission</div>
                  <h3 className="text-base font-bold text-[#102B4E] mb-1.5">Bring Real Bottlenecks</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Submit engineering, agro-processing, or logistics challenges through our intake portal.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-2">Supervised Teams</div>
                  <h3 className="text-base font-bold text-[#102B4E] mb-1.5">Academic Rigor</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Senior professors oversee design reviews, component selection, safety standards, and IP compliance.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <div className="text-xs font-mono font-bold text-[#159FE3] uppercase mb-2">Direct Recruitment</div>
                  <h3 className="text-base font-bold text-[#102B4E] mb-1.5">Top-Tier Talent</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Observe high-performing student engineers in action over a 12-week sprint before hiring.
                  </p>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onNavigateToContact}
                  className="px-8 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Submit an Industry Challenge for Academic Matching</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFC94A]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: HUBS & NGOS */}
        {(activeSubTab === 'hubs' || activeSubTab === 'ngos') && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Grassroots &amp; Innovation Infrastructure
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                {activeSubTab === 'hubs' ? 'Start-Up & Impact Hubs' : 'Non-Profit & Community Organisations'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                {activeSubTab === 'hubs'
                  ? 'Local fab labs, tech incubators, and maker spaces provide physical prototype fabrication facilities, component sourcing knowledge, and mentorship on African market dynamics.'
                  : 'Agricultural cooperatives, rural health clinics, and grassroots non-profits ensure projects originate from genuine community needs and retain local ownership over deployment.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Local Fab Labs &amp; Prototyping Sites</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Providing 3D printing, laser cutting, welding, and PCB testing facilities in Kampala, Nairobi, and Cape Town so digital schematics become physical reality.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5]">
                  <h3 className="text-base font-bold text-[#102B4E] mb-2">Community Ownership &amp; Maintenance</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Equipping local technician cooperatives with repair manuals, open-source BOMs, and replacement part supply chains for sustainable operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: LEARNING OUTCOMES */}
        {activeSubTab === 'outcomes' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Accredited Curriculum Standards
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-3">
                Explicit Learning Outcomes &amp; E-Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-8">
                Students participating in Transformation Africa COILs and study tours systematically develop and demonstrate verifiable competencies grounded in UN PRiME Principles and the Stahl/Hillmer Key Competences Model.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  'Familiarity with PRiME Principles & related UN SDGs / AU Agenda 2063',
                  'Ability to identify social and economic bottlenecks as viable business opportunities',
                  'Deep understanding of sustainability principles and social entrepreneurship models',
                  'Mastery of business model design (value creation and value capturing logic)',
                  'Development of entrepreneurial thinking and recognition of key global emerging markets',
                  'Application of the 5-Dimension Competence Model (Heuristic, Intrapersonal, Interpersonal, Interpretative, Inscenatoric)',
                  'Critical discussion of investment criteria driving seed and venture funding in Africa',
                  'Advanced digital literacy through continuous creation of an accredited student e-portfolio'
                ].map((outcome, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#159FE3] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#102B4E] font-medium leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#102B4E] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">Student E-Portfolio Standard</h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Every graduate receives an authenticated digital dossier containing open-hardware CAD repos, supervisor feedback, ECTS transcripts, and stakeholder testimonials.
                  </p>
                </div>
                <a
                  href="#/resources"
                  className="px-6 py-2.5 rounded-full bg-[#FFC94A] hover:bg-[#F5BF3F] text-[#102B4E] text-xs font-bold transition-all shrink-0"
                >
                  View Sample Curricula &amp; Syllabi
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: TRAINING & DEVELOPMENT */}
        {activeSubTab === 'training' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#D0E7F5] shadow-xs">
              <div className="text-xs font-bold text-[#159FE3] uppercase tracking-wider font-mono mb-2">
                Faculty &amp; Student Capability Building
              </div>
              <h2 className="text-3xl font-extrabold text-[#102B4E] mb-2">
                Training &amp; Professional Development
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mb-8">
                Structured pedagogical modules, cross-cultural team coaching, and technological certifications preparing participants for high-velocity international collaboration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#102B4E] text-[#FFC94A] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-base font-bold text-[#102B4E]">COIL Faculty Co-Teaching Academy</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pedagogical certification for university professors and lecturers on co-designing shared syllabus modules, asynchronous grading rubrics, and intercultural student facilitation.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#159FE3] text-white flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-base font-bold text-[#102B4E]">Intercultural Agile Sprints</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Hands-on masterclasses for student teams navigating time zones, bandwidth-constrained telemetry, remote prototyping sprints, and mutual peer review.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#102B4E] text-[#159FE3] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-base font-bold text-[#102B4E]">Field Research Ethics &amp; Safety</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mandatory preparatory training for study tour cohorts covering ethical community engagement, data sovereignty, participatory design, and local ownership.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-[#F8F6F0] border border-[#D0E7F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-[#102B4E]">Interested in running a training workshop at your university?</h5>
                  <p className="text-xs text-slate-600">Our consortium mentors conduct train-the-trainer workshops across partner campuses.</p>
                </div>
                <button
                  onClick={onNavigateToContact}
                  className="px-5 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-bold transition-all shrink-0"
                >
                  Contact Training Coordinators
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

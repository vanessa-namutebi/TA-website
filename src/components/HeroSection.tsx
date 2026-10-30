import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Layers, Award, Users, Star } from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenAssociateModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onOpenAssociateModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-sky-50/50 via-white to-white">
      {/* Decorative soft pastel ambient glow */}
      <div
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-sky-200/35 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-10 -z-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Quiet Kicker (Zero-pill text styling) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-100/70 border border-sky-200/60 px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Platform-as-a-Community · Africa &amp; Europe</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6 max-w-2xl text-balance">
              Where <span className="text-sky-600">Real People</span> Meet on <span className="text-sky-600">Real Projects</span> That Create Real Impact
            </h1>

            {/* Subtext description */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              An international initiative connecting students, universities, businesses, and communities across Africa and Europe through Collaborative Online International Learning (COIL), entrepreneurship, and hands-on verified projects.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreProjects}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 shadow-md shadow-sky-500/20 rounded-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <span>Explore Project Repository</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenAssociateModal}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <span>Join Student Network</span>
              </button>
            </div>

            {/* Social Proof Avatar Strip */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-row items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <div className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">KM</div>
                <div className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white bg-sky-500 text-white font-bold text-xs flex items-center justify-center">EN</div>
                <div className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white bg-amber-500 text-white font-bold text-xs flex items-center justify-center">FH</div>
                <div className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">SH</div>
                <div className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white bg-slate-800 text-white font-bold text-[11px] flex items-center justify-center">+200</div>
              </div>
              <div className="text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span>200+ Students &amp; Associates</span>
                </div>
                <p className="text-slate-500 mt-0.5 text-[11px]">
                  Engaged across South Africa, Uganda, Austria, and Germany
                </p>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src="/src/assets/images/hero_collaboration_lab_1792567152591.jpg"
                  alt="Transformation Africa students collaborating in open innovation laboratory"
                  className="w-full h-[400px] sm:h-[460px] object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Gradient Scrim for readable badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Bottom Card Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Verified Project Archive</div>
                        <div className="text-xs text-slate-500">Open-access student engineering dossiers</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Top Right Stat Card */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white rounded-2xl p-4 border border-slate-200 shadow-xl hidden sm:flex items-center gap-3 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-slate-900 tabular-nums">20+ Projects</div>
                  <div className="text-xs text-slate-500">Completed &amp; Documented</div>
                </div>
              </div>

              {/* Floating Bottom Left Stat Card */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl p-4 border border-slate-200 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cross-Border Teams</div>
                  <div className="text-xs text-slate-500">100% Intercontinental</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

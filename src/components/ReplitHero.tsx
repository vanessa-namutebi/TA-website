import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ReplitHeroProps {
  onDiscoverMission: () => void;
  onBrowseRepository: () => void;
}

export const ReplitHero: React.FC<ReplitHeroProps> = ({
  onDiscoverMission,
  onBrowseRepository,
}) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Nelson Mandela Quote Banner from Google Site */}
            <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#EAF6FC] border border-[#D0E7F5] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FFC94A] shrink-0" />
              <p className="text-xs text-[#102B4E] font-medium italic">
                &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
                <span className="font-bold text-[#159FE3] not-italic ml-1 font-mono text-[11px]">— Nelson Mandela</span>
              </p>
            </div>

            {/* Display Heading with curved underline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold text-[#102B4E] leading-[1.1] tracking-tight mb-5">
              Building bridges between{' '}
              <span className="relative inline-block text-[#159FE3]">
                Africa &amp; Europe
                {/* Hand-drawn organic underline brush SVG in golden yellow */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-[#FFC94A] pointer-events-none"
                  viewBox="0 0 240 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14C50 4 150 2 237 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              through project collaboration.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3B5472] font-normal leading-relaxed mb-8 max-w-xl">
              We connect students, universities, enterprise leaders, and community innovators to co-create practical engineering, business, and sustainability solutions across borders.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={onDiscoverMission}
                className="px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-sm font-semibold shadow-sm transition-all flex items-center gap-2 group"
              >
                <span>Explore Purpose &amp; Competences</span>
                <ArrowRight className="w-4 h-4 text-[#159FE3] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onBrowseRepository}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#EAF6FC] text-[#102B4E] text-sm font-semibold border border-[#159FE3]/30 shadow-xs transition-all flex items-center gap-2 group"
              >
                <span>Browse Projects Repository</span>
                <ArrowUpRight className="w-4 h-4 text-[#159FE3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Hero Graphic Illustration (Brand Palette) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[540px] aspect-[1.15/1]">
              
              {/* Pale Blue Container */}
              <div 
                className="absolute inset-0 bg-[#EAF6FC] rounded-[48px] sm:rounded-[64px] overflow-hidden flex items-center justify-center border border-[#D5EBF7] shadow-inner"
              >
                {/* Concentric Dashed Orbit Circles */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 540 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="380"
                    cy="210"
                    r="160"
                    stroke="#159FE3"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    strokeOpacity="0.4"
                  />
                  <circle
                    cx="380"
                    cy="210"
                    r="90"
                    stroke="#FFC94A"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    strokeOpacity="0.5"
                  />
                  {/* Subtle golden yellow & sky blue accent dots */}
                  <circle cx="230" cy="120" r="5" fill="#FFC94A" />
                  <circle cx="450" cy="240" r="4" fill="#159FE3" />
                </svg>

                {/* Golden Yellow Sun Sphere (used sparingly) */}
                <div className="absolute top-14 right-14 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFC94A] shadow-sm opacity-90" />

                {/* Abstract Two Collaborators Meeting */}
                <div className="relative flex items-end justify-center gap-3 sm:gap-4 z-10 pt-16">
                  
                  {/* Left Collaborator (Bright Sky Blue) */}
                  <div className="relative flex flex-col items-center">
                    {/* Head */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#102B4E] mb-1 z-10 shadow-sm" />
                    {/* Body */}
                    <div className="w-28 sm:w-36 h-48 sm:h-60 bg-[#159FE3] rounded-t-[50px] rounded-b-[20px] shadow-sm" />

                    {/* Floating Label: Fresh perspectives */}
                    <div className="absolute -top-6 -left-8 sm:-left-12 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-[#D5EBF7] z-20 whitespace-nowrap text-left">
                      <div className="text-[11px] font-bold text-[#102B4E] leading-tight">Fresh perspectives</div>
                      <div className="text-[9px] text-[#415D7E] font-medium leading-tight">in every direction</div>
                    </div>

                    {/* Floating Label: One shared project */}
                    <div className="absolute bottom-10 -left-6 sm:-left-10 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md border border-[#D5EBF7] z-20 whitespace-nowrap">
                      <div className="text-[10px] font-semibold text-[#102B4E]">One shared project</div>
                    </div>
                  </div>

                  {/* Right Collaborator (Deep Navy Blue) */}
                  <div className="relative flex flex-col items-center">
                    {/* Head */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#159FE3] mb-1 z-10 shadow-sm" />
                    {/* Body */}
                    <div className="w-32 sm:w-40 h-56 sm:h-68 bg-[#102B4E] rounded-t-[60px] rounded-b-[24px] shadow-md" />

                    {/* Floating Label: Across borders */}
                    <div className="absolute top-12 -right-4 sm:-right-8 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-[#D5EBF7] z-20 whitespace-nowrap text-left">
                      <div className="text-[11px] font-bold text-[#102B4E] leading-tight">Across borders</div>
                      <div className="text-[9px] text-[#415D7E] font-medium leading-tight">and disciplines</div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Github, Linkedin, Mail, MapPin, Briefcase, Calendar } from 'lucide-react';

const InfoHeroSection = ({ personal, contact, experience }) => {
  const currentJob = experience?.[0];

  return (
    <div className="flex flex-col items-center lg:items-start">

      <div className="relative flex flex-col items-center">
        {/* Two parallel wires */}
        <div className="flex gap-[140px] md:gap-[200px]">
          <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-toast-300 to-toast-400 rounded-full" />
          <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-toast-300 to-toast-400 rounded-full" />
        </div>

        {/* Lanyard clip connectors */}
        <div className="flex gap-[124px] md:gap-[184px] -mt-1">
          <div className="w-4 h-4 rounded-full border-2 border-toast-400 bg-cream-200" />
          <div className="w-4 h-4 rounded-full border-2 border-toast-400 bg-cream-200" />
        </div>

        {/* The ID Badge Card — swings in */}
        <div className="id-card-swing mt-1">
          <div className="relative w-[320px] md:w-[360px] bg-white rounded-2xl border border-cream-200 shadow-xl shadow-toast-300/30 overflow-hidden">

            {/* Top colored band */}
            <div className="h-2 bg-gradient-to-r from-coral-500 via-coral-400 to-amber-500" />

            {/* Lanyard hole */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-8 h-5 rounded-full border-2 border-cream-300 bg-cream-50" />
            </div>

            {/* Card content */}
            <div className="px-5 pb-5 pt-1">

              {/* Avatar with initials */}
              <div className="flex justify-center mb-3">
                <div className="w-18 h-18 rounded-full bg-gradient-to-br from-coral-500 to-amber-500 flex items-center justify-center shadow-lg shadow-coral-400/30">
                  <span className="text-2xl font-extrabold text-white">
                    {personal.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-4">
                <h2 className="text-lg font-extrabold text-toast-900 tracking-tight">{personal.name}</h2>
                <p className="text-xs font-bold text-coral-500 mt-0.5">{personal.title}</p>
              </div>

              <div className="h-px bg-cream-200 mb-3" />

              {/* Info rows */}
              <div className="space-y-2.5">
                {currentJob && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cream-200 flex items-center justify-center shrink-0">
                      <Briefcase size={12} className="text-coral-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-toast-400 font-semibold leading-none mb-0.5">Current</p>
                      <p className="text-xs font-bold text-toast-800">{currentJob.role} @ {currentJob.company}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cream-200 flex items-center justify-center shrink-0">
                    <Calendar size={12} className="text-coral-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-toast-400 font-semibold leading-none mb-0.5">Experience</p>
                    <p className="text-xs font-bold text-toast-800">4+ Years</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cream-200 flex items-center justify-center shrink-0">
                    <MapPin size={12} className="text-coral-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-toast-400 font-semibold leading-none mb-0.5">Location</p>
                    <p className="text-xs font-bold text-toast-800">India</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cream-200 flex items-center justify-center shrink-0">
                    <Mail size={12} className="text-coral-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-toast-400 font-semibold leading-none mb-0.5">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-xs font-bold text-toast-800 hover:text-coral-500 transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="h-px bg-cream-200 my-3" />

              {/* Social links */}
              <div className="flex items-center justify-center gap-2">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-toast-900 text-white text-[10px] font-bold rounded-full hover:bg-coral-500 transition-colors"
                >
                  <Github size={12} /> GitHub
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Linkedin size={12} /> LinkedIn
                </a>
              </div>

              {/* Status badge */}
              <div className="flex justify-center mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700">{contact.cta}</span>
                </span>
              </div>
            </div>

            <div className="h-1.5 bg-gradient-to-r from-coral-500 via-coral-400 to-amber-500" />
          </div>
        </div>
      </div>

      {/* Swing animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes swingIn {
          0% { transform: rotate(-12deg) translateY(-30px); opacity: 0; }
          20% { opacity: 1; }
          40% { transform: rotate(8deg) translateY(0); }
          60% { transform: rotate(-5deg); }
          75% { transform: rotate(3deg); }
          85% { transform: rotate(-1.5deg); }
          100% { transform: rotate(0deg); }
        }
        .id-card-swing {
          transform-origin: top center;
          animation: swingIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}} />
    </div>
  );
};

export default InfoHeroSection;
